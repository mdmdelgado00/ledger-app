import type { TransactionFilterState } from "@features/transactions/types";
import { dummyCategories } from "@features/transactions/types";
import CategoriesFilter from "./categoriesFilter";
import { MonthPicker } from "./monthPicker";
import SearchFilter from "./searchFilter";

export function TransactionTopFilters({
  filters,
  setFilters,
}: {
  filters: TransactionFilterState;
  setFilters: (filters: TransactionFilterState) => void;
}) {
  return (
    <div className="flex gap-2">
      <MonthPicker
        selectedMonth={filters.month}
        onMonthChange={(month) => setFilters((prev) => ({ ...prev, month }))}
      />
      <CategoriesFilter
        categorieIds={filters.categoryIds}
        onChange={(categoryIds) =>
          setFilters((prev) => ({ ...prev, categoryIds }))
        }
        categories={dummyCategories}
      />
      <SearchFilter
        value={filters.searchQuery || ""}
        onChange={(value) => {
          setFilters((prev) => ({ ...prev, searchQuery: value }));
        }}
      />
    </div>
  );
}
