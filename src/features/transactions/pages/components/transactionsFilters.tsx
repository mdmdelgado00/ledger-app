import { useState } from "react";
import { MonthPicker, monthKey } from "./monthPicker";
export function TransactionTopFilters() {
  const [selected, setSelected] = useState(monthKey(new Date()));
  return (
    <div className="flex gap-2">
      <MonthPicker selectedMonth={selected} onMonthChange={setSelected} />
    </div>
  );
}
