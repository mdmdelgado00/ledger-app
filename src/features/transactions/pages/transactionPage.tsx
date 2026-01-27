import type { TransactionFilterState } from "@features/transactions/types";
import { useState } from "react";
import { monthKey } from "./components/monthPicker";
import { TransactionTopFilters } from "./components/transactionsFilters";

export default function TransactionPage() {
  const [filters, setFilters] = useState<TransactionFilterState>({
    month: monthKey(new Date()),
    categoryIds: [],
    searchQuery: "",
  });
  return (
    <>
      <div className="p-4 mr-10 flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Transactions</h1>
        {/*Filter top row */}
        <TransactionTopFilters filters={filters} setFilters={setFilters} />
        {/*Transaction Summary */}
        <div className="flex w-full gap-2">
          <div className="w-1/3 p-4 bg-gray-200 rounded">
            <h2 className="font-medium">Total Income</h2>
            <p className="text-lg font-semibold text-green-600">$5,000.00</p>
          </div>
          <div className="w-1/3 p-4 bg-gray-200 rounded">
            <h2 className="font-medium">Total Expenses</h2>
            <p className="text-lg font-semibold text-red-600">$3,200.00</p>
          </div>
          <div className="w-1/3 p-4 bg-gray-200 rounded">
            <h2 className="font-medium">Net Total</h2>
            <p className="text-lg font-semibold text-blue-600">$1,800.00</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          {filters.categoryIds.length > 0 ? (
            <div>
              <h3 className="font-medium">Filtered Categories:</h3>
              <ul className="list-disc list-inside">
                {filters.categoryIds.map((catId) => (
                  <li key={catId}>{catId}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No category filter applied.</p>
          )}
        </div>
        {filters.month}
        {filters.searchQuery}
      </div>
    </>
  );
}
