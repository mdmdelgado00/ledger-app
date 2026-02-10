import type { TransactionFilterState } from "@features/transactions/lib/types";
import { useState } from "react";
import { DataTable } from "../../../components/ui/data-table";
import { transactionColumns } from "../lib/columns";
import { monthKey } from "../lib/utils";
import {
  TransactionBottomFilters,
  TransactionTopFilters,
} from "./components/transactionsFilters";

import { dummyTransactions } from "../mock/transactions";

export default function TransactionPage() {
  const [filters, setFilters] = useState<TransactionFilterState>({
    month: monthKey(new Date()),
    categoryIds: [],
    searchQuery: "",
    showIncome: true,
    showExpenses: true,
    range: "month",
  });
  const [currentRows, setCurrentRows] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  return (
    <>
      <div className="p-4 mr-10 flex flex-col gap-4 max-w-7xl mx-auto">
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
        <TransactionBottomFilters
          filters={filters}
          setFilters={setFilters}
          filtered={currentRows}
          total={totalRows}
        />
        <DataTable
          columns={transactionColumns}
          data={dummyTransactions}
          setCurrentRows={setCurrentRows}
          setTotalRows={setTotalRows}
        />
      </div>
    </>
  );
}
