import type { TransactionFilterState } from "@features/transactions/types";
import type { Dispatch, SetStateAction } from "react";
import CategoriesFilter from "./categoriesFilter";
import { MonthPicker } from "./monthPicker";
import SearchFilter from "./searchFilter";

export function TransactionTopFilters({
  filters,
  setFilters,
}: {
  filters: TransactionFilterState;
  setFilters: Dispatch<SetStateAction<TransactionFilterState>>;
}) {
  return (
    <div className="flex gap-2">
      <MonthPicker
        selectedMonth={filters.month}
        onMonthChange={(month) => setFilters((prev) => ({ ...prev, month }))}
      />
      <CategoriesFilter
        categoryIds={filters.categoryIds}
        onChange={(categoryIds) =>
          setFilters((prev) => ({ ...prev, categoryIds }))
        }
        categories={[]}
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
