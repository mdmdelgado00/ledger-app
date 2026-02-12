import type { TransactionFilterState } from "./types";

export function monthKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function monthKeyToDate(monthKey: string) {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, 1);
}

function toISODate(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function startOfWeek(d: Date) {
  const x = new Date(d);
  const day = x.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  x.setDate(x.getDate() + diff);
  return x;
}

function endOfWeek(d: Date) {
  const s = startOfWeek(d);
  const e = new Date(s);
  e.setDate(e.getDate() + 6);
  return e;
}

export function getTransactionsDateRange(
  filters: Pick<TransactionFilterState, "range" | "month">,
) {
  const now = new Date();

  if (filters.range === "day") {
    const today = toISODate(now);
    return { start: today, end: today };
  }

  if (filters.range === "week") {
    return {
      start: toISODate(startOfWeek(now)),
      end: toISODate(endOfWeek(now)),
    };
  }

  if (filters.range === "past7") {
    const end = new Date(now);
    const start = new Date(now);
    start.setDate(start.getDate() - 6);
    return { start: toISODate(start), end: toISODate(end) };
  }

  const base = monthKeyToDate(filters.month);
  const start = new Date(base.getFullYear(), base.getMonth(), 1);
  const end = new Date(base.getFullYear(), base.getMonth() + 1, 0);
  return { start: toISODate(start), end: toISODate(end) };
}
