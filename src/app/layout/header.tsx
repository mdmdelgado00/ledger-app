import { Bell } from "lucide-react";
import { AddButton } from "./components/addButton";
import { ProfileButton } from "./components/profileButton";

export function Header() {
  return (
    <header className="h-16 flex justify-between items-center px-6 bg-surface border-b border-border sticky top-0 z-40 backdrop-blur bg-surface/95">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Ledger
          </h1>
        </div>
      </div>
      <div className="flex">
        <AddButton />
        <div className="flex items-center bg-surface-hover rounded-full">
          <Bell className="size-6 stroke-[1.5] text-muted-foreground hover:text-primary hover:cursor-pointer mr-6 transition-colors" />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
