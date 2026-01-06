import {
  ClipboardPen,
  CreditCard,
  Folder,
  LayoutDashboard,
  PiggyBank,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-54 bg-surface border-r border-border p-4">
      <nav>
        <ul>
          <li className="flex items-center mb-4 hover:text-foreground cursor-pointer transition-colors transform transition hover:scale-105">
            <LayoutDashboard className="mr-2 text-foreground" />
            Dashboard
          </li>
          <li className="flex items-center mb-4 hover:text-foreground cursor-pointer transition-colors transform transition hover:scale-105">
            <CreditCard className="mr-2 text-foreground" />
            Transactions
          </li>
          <li className="flex items-center mb-4 hover:text-foreground cursor-pointer transition-colors transform transition hover:scale-105">
            <Folder className="mr-2 text-foreground" />
            Category
          </li>
          <li className="flex items-center mb-4 hover:text-foreground cursor-pointer transition-colors transform transition hover:scale-105">
            <PiggyBank className="mr-2 text-foreground" />
            Budgets
          </li>
          <li className="flex items-center mb-4 hover:text-foreground cursor-pointer transition-colors transform transition hover:scale-105">
            <ClipboardPen className="mr-2 text-foreground" />
            Reports
          </li>
        </ul>
      </nav>
    </aside>
  );
}
