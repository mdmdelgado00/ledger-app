import {
  ClipboardPen,
  CreditCard,
  Folder,
  LayoutDashboard,
  PiggyBank,
  Settings,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-45 bg-surface border-r border-border p-4">
      <nav>
        <ul>
          <li className="flex items-center mb-4 hover:text-foreground cursor-pointer transition-colors transform transition hover:scale-115 hover:translate-x-5">
            <LayoutDashboard className="mr-2 text-foreground" />
            Dashboard
          </li>
          <li className="flex items-center mb-4 hover:text-foreground cursor-pointer transition-colors transform transition hover:scale-115 hover:translate-x-5">
            <CreditCard className="mr-2 text-foreground" />
            Transactions
          </li>
          <li className="flex items-center mb-4 hover:text-foreground cursor-pointer transition-colors transform transition hover:scale-115 hover:translate-x-5">
            <Folder className="mr-2 text-foreground" />
            Category
          </li>
          <li className="flex items-center mb-4 hover:text-foreground cursor-pointer transition-colors transform transition hover:scale-115 hover:translate-x-5">
            <PiggyBank className="mr-2 text-foreground" />
            Budgets
          </li>
          <li className="flex items-center mb-4 hover:text-foreground cursor-pointer transition-colors transform transition hover:scale-115 hover:translate-x-5">
            <ClipboardPen className="mr-2 text-foreground" />
            Reports
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-4 w-45">
        <li className="flex items-center self-end mb-4 hover:text-foreground cursor-pointer transition-colors transform transition hover:scale-115 hover:translate-x-5">
          <Settings className="mr-2 text-foreground" />
          Settings
        </li>
      </div>
    </aside>
  );
}
