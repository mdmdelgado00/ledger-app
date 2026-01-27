import { Button } from "@components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMemo } from "react";

export function monthKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function monthKeyToDate(monthKey: string) {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, 1);
}

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  d.setDate(1);
  return d;
}

const MONTHS = Array.from({ length: 12 }, (_, i) => i);

type Props = {
  selectedMonth: string;
  onMonthChange: (next: string) => void;
  yearRange?: { from: number; to: number };
};

export function MonthPicker({
  selectedMonth,
  onMonthChange,
  yearRange = {
    from: new Date().getFullYear() - 10,
    to: new Date().getFullYear(),
  },
}: Props) {
  const selectedMonthDate = useMemo(
    () => monthKeyToDate(selectedMonth),
    [selectedMonth],
  );
  const years = useMemo(() => {
    const out: number[] = [];
    for (let y = yearRange.from; y <= yearRange.to; y++) out.push(y);
    return out;
  }, [yearRange.from, yearRange.to]);

  const setMonthYear = (month: number, year: number) => {
    onMonthChange(monthKey(new Date(year, month, 1)));
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() =>
          onMonthChange(monthKey(addMonths(selectedMonthDate, -1)))
        }
        aria-label="Previous Month"
        className="cursor-pointer"
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="min-w-30 justify-start gap-2 cursor-pointer"
          >
            <CalendarIcon className="size-4 text-muted-foreground" />
            {selectedMonthDate.toLocaleDateString("default", {
              year: "numeric",
              month: "long",
            })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="center">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <select
                value={selectedMonthDate.getMonth()}
                onChange={(e) =>
                  setMonthYear(
                    Number(e.target.value),
                    selectedMonthDate.getFullYear(),
                  )
                }
                className="h-9 w-full border border-input bg-background rounded px-2 py-2 text-sm outline-none"
              >
                {MONTHS.map((month) => (
                  <option key={month} value={month}>
                    {new Date(0, month).toLocaleDateString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedMonthDate.getFullYear()}
                onChange={(e) =>
                  setMonthYear(
                    selectedMonthDate.getMonth(),
                    Number(e.target.value),
                  )
                }
                className="h-9 w-full border border-input bg-background rounded px-2 py-2 text-sm outline-none"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() =>
          onMonthChange(monthKey(addMonths(selectedMonthDate, +1)))
        }
        aria-label="Next Month"
        className="cursor-pointer"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
