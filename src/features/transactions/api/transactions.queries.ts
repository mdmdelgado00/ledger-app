import { useQuery } from "@tanstack/react-query";
import type { TransactionFilterState } from "../lib/types";
import { fetchTransactions } from "./fetchTransactions";

export function useTransactionsQuery(args: {
  spaceId: string;
  filters: TransactionFilterState;
  pageIndex: number;
  pageSize: number;
}) {
  const { spaceId, filters, pageIndex, pageSize } = args;

  return useQuery({
    queryKey: [
      "transactions",
      spaceId,
      filters.month,
      filters.range,
      filters.searchQuery,
      filters.showIncome,
      filters.showExpenses,
      filters.categoryIds, // OK
      pageIndex,
      pageSize,
    ],
    queryFn: () => fetchTransactions({ spaceId, filters, pageIndex, pageSize }),
    staleTime: 10_000,
  });
}
