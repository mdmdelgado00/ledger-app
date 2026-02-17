import { Button } from "@components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@components/ui/toggle-group";
import type { TransactionFilterState } from "@features/transactions/lib/types";
import { ArrowDownRight, ArrowUpRight, RefreshCcw } from "lucide-react";
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
        disabled={filters.range !== "month"}
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

export function TransactionBottomFilters({
  filters,
  setFilters,
  filtered = 0,
  total = 0,
}: {
  filters: TransactionFilterState;
  setFilters: Dispatch<SetStateAction<TransactionFilterState>>;
  filtered?: number;
  total?: number;
}) {
  const visibilityValue = [
    filters.showIncome ? "income" : null,
    filters.showExpenses ? "expenses" : null,
  ].filter(Boolean) as string[];

  return (
    <div className="flex justify-between gap-2">
      <ToggleGroup
        type="multiple"
        value={visibilityValue}
        onValueChange={(value) => {
          const set = new Set(value);
          setFilters((prev) => ({
            ...prev,
            showIncome: set.has("income"),
            showExpenses: set.has("expenses"),
          }));
        }}
        className="flex"
        spacing={2}
      >
        <ToggleGroupItem
          value="income"
          variant="outline"
          className="px-4 rounded-full hover:bg-primary/10 cursor-pointer  data-[state=on]:bg-primary/15 data-[state=on]:text-primary"
        >
          <ArrowDownRight className="size-4" />
          Income
        </ToggleGroupItem>
        <ToggleGroupItem
          value="expenses"
          variant="outline"
          className="px-4 rounded-full hover:bg-danger/10 cursor-pointer data-[state=on]:bg-danger/15 data-[state=on]:text-danger"
        >
          <ArrowUpRight className="size-4" />
          Expenses
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        type="single"
        variant="outline"
        defaultValue="month"
        value={filters.range}
        onValueChange={(value) => {
          if (!value) return;
          setFilters((prev) => ({
            ...prev,
            range: value as TransactionFilterState["range"],
          }));
        }}
        className="rounded-full"
      >
        <ToggleGroupItem
          value="month"
          className="px-4 rounded-full cursor-pointer w-25"
        >
          Month
        </ToggleGroupItem>
        <ToggleGroupItem
          value="week"
          className="px-4 rounded-full cursor-pointer w-25"
        >
          Week
        </ToggleGroupItem>
        <ToggleGroupItem
          value="day"
          className="px-4 rounded-full cursor-pointer w-25"
        >
          Today
        </ToggleGroupItem>
        <ToggleGroupItem
          value="past7"
          className="px-4 rounded-full cursor-pointer w-25"
        >
          Past 7 Days
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="flex items-center gap-4 ml-auto">
        <Button
          variant="outline"
          className="rounded-full cursor-pointer"
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              categoryIds: [],
              searchQuery: "",
              showIncome: true,
              showExpenses: true,
              range: "month",
            }))
          }
        >
          <RefreshCcw className="size-4" />
          Reset Filters
        </Button>
        <span className="text-sm">
          Showing {filtered} of {total} records
        </span>
      </div>
    </div>
  );
}
