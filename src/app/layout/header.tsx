import { Bell } from "lucide-react";
import { AddButton } from "./components/addButton";
import { ProfileButton } from "./components/profileButton";

export function Header() {
  return (
    <header className="h-16 flex justify-between items-center px-6 bg-surface border-b border-border sticky top-0 z-40 backdrop-blur bg-surface/95">
      <h1 className="font-semibold text-lg text-foreground">Ledger</h1>
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
