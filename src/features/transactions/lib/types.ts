export type Category = {
  id: string;
  name: string;
  kind: "income" | "expense";
  isFavorite?: boolean;
  color?: string;
  icon?: string;
};

type range = "month" | "week" | "day" | "past7";

export type TransactionFilterState = {
  month: string;
  categoryIds: string[];
  searchQuery?: string;
  showIncome?: boolean;
  showExpenses?: boolean;
  range?: range;
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  categoryId: string;
  amount: number;
  currency: string;
};
