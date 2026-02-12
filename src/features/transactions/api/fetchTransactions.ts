import { supabase } from "@lib/dbConnection";
import type { Transaction, TransactionFilterState } from "../lib/types";
import { getTransactionsDateRange } from "../lib/utils";

type EntryRow = {
  id: string;
  ocurred_on: string;
  description: string | null;
  kind: "income" | "expense";
  amount_minor: number | string;
  category_id: string | null;
  account: { currency: string | null } | null;
};

export type FetchTransactionArgs = {
  spaceId: string;
  filters: TransactionFilterState;
  pageIndex: number;
  pageSize: number;
};

function toNumberBigInt(v: number | string) {
  const n = typeof v === "string" ? Number(v) : v;
  return Number.isFinite(n) ? n : 0;
}

export async function fetchTransactions({
  spaceId,
  filters,
  pageIndex,
  pageSize,
}: FetchTransactionArgs): Promise<{ rows: Transaction[]; total: number }> {
  if (!filters.showIncome && !filters.showExpenses) {
    return { rows: [], total: 0 };
  }

  const { start, end } = getTransactionsDateRange(filters);

  const from = pageIndex * pageSize;
  const to = from + pageSize + 1;
  let query = supabase
    .from("entries")
    .select(
      "id, ocurred_on, description, kind, amount_minor, category_id, account:accounts!entries_account_id_fkey(currency)",
      { count: "exact" },
    )
    .eq("space_id", spaceId)
    .gte("ocurred_on", start)
    .lte("ocurred_on", end)
    .order("occured_on", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (filters.categoryIds.length > 0) {
    query = query.in("category_id", filters.categoryIds);
  }

  const s = filters.searchQuery.trim();
  if (s) {
    query = query.or(`description.ilike.%${s}%,notes.ilike.%${s}%`);
  }

  if (filters.showIncome && !filters.showExpenses) {
    query = query.eq("kind", "income");
  } else if (!filters.showIncome && filters.showExpenses) {
    query = query.eq("kind", "expense");
  }

  const { data, count, error } = await query;
  if (error) throw error;

  const rows = (data ?? ([] as EntryRow[])).map((r): Transaction => {
    const minor = toNumberBigInt(r.amount_minor);
    const signedMinor = r.kind === "expense" ? -minor : minor;

    return {
      id: r.id,
      date: r.ocurred_on,
      description: r.description ?? "",
      categoryId: r.category_id ?? "",
      amount: signedMinor / 100,
      currency: r.account?.[0].currency ?? "USD",
    };
  });

  return { rows, total: count ?? 0 };
}
