export type Category = {
  id: string;
  name: string;
  kind: "income" | "expense";
  isFavorite?: boolean;
  color?: string;
  icon?: string;
};

export type TransactionFilterState = {
  month: string;
  categoryIds: string[];
  searchQuery?: string;
};
