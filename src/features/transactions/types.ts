export type Category = {
  id: string;
  name: string;
  kind: "income" | "expense";
  isFavorite?: boolean;
  color?: string;
  icon?: string;
};

export const dummyCategories: Category[] = [
  // Favorites (mix)
  { id: "cat-rent", name: "Rent", kind: "expense", isFavorite: true, color: "#EF4444" },
  { id: "cat-groceries", name: "Groceries", kind: "expense", isFavorite: true, color: "#22C55E" },
  { id: "cat-salary", name: "Salary", kind: "income", isFavorite: true, color: "#3B82F6" },

  // Income
  { id: "cat-freelance", name: "Freelance", kind: "income", color: "#60A5FA" },
  { id: "cat-investments", name: "Investments", kind: "income", color: "#A78BFA" },
  { id: "cat-gifts-in", name: "Gifts", kind: "income", color: "#F59E0B" },
  { id: "cat-refunds", name: "Refunds", kind: "income", color: "#34D399" },

  // Expense
  { id: "cat-utilities", name: "Utilities", kind: "expense", color: "#F97316" },
  { id: "cat-transport", name: "Transport", kind: "expense", color: "#06B6D4" },
  { id: "cat-dining", name: "Dining Out", kind: "expense", color: "#FB7185" },
  { id: "cat-subscriptions", name: "Subscriptions", kind: "expense", color: "#94A3B8" },
  { id: "cat-entertainment", name: "Entertainment", kind: "expense", color: "#8B5CF6" },
  { id: "cat-health", name: "Health", kind: "expense", color: "#22C55E" },
  { id: "cat-shopping", name: "Shopping", kind: "expense", color: "#EC4899" },
  { id: "cat-travel", name: "Travel", kind: "expense", color: "#14B8A6" },
  { id: "cat-coffee", name: "Coffee", kind: "expense", color: "#A16207" },
];

export type TransactionFilterState = {
  month: string; // Format: 'YYYY-MM'
  categoryIds: string[]; // Array of selected category IDs
};
