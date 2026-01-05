import { Bell, User } from "lucide-react";
import { AddButton } from "./components/addButton";

export function Header() {
  return (
    <header className="h-16 flex justify-between items-center px-6 bg-surface border-b border-border sticky top-0 z-40 backdrop-blur bg-surface/95">
      <h1 className="font-semibold text-lg text-text">Ledger</h1>
      <div className="flex">
        <AddButton />
        <div className="flex items-center bg-surface-hover rounded-full">
          <Bell className="size-6 stroke-[1.5] text-text-muted hover:text-primary hover:cursor-pointer mr-6 transition-colors" />
          <User className="size-6 stroke-[1.5] text-text-muted hover:text-primary hover:cursor-pointer transition-colors" />
        </div>
      </div>
    </header>
  );
}
