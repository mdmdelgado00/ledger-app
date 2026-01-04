import { User, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 flex justify-between items-center px-6 bg-surface border-b border-border sticky top-0 z-40 backdrop-blur bg-surface/95">
      <h1 className="font-semibold text-lg text-text">Ledger</h1>
      <div className="flex">
        <Bell className="size-6 stroke-[1.5] text-text-muted hover:text-primary hover:cursor-pointer mr-6 transition-colors" />
        <User className="size-6 stroke-[1.5] text-text-muted hover:text-primary hover:cursor-pointer transition-colors" />
      </div>
    </header>
  );
}
