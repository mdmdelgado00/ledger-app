import {
  BanknoteArrowUp,
  Folder,
  LayoutDashboard,
  PiggyBank,
  ClipboardPen,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-54 bg-surface border-r border-border p-4">
      <nav>
        <ul>
          <li className="mb-4 hover:text-primary cursor-pointer transition-colors transform transition hover:scale-105">
            <LayoutDashboard className="inline-block mr-2" />
            Dashboard
          </li>
          <li className="mb-4 hover:text-primary cursor-pointer transition-colors transform transition hover:scale-105">
            <BanknoteArrowUp className="inline-block mr-2" />
            Transactions
          </li>
          <li className="mb-4 hover:text-primary cursor-pointer transition-colors transform transition hover:scale-105">
            <Folder className="inline-block mr-2" />
            Category
          </li>
          <li className="mb-4 hover:text-primary cursor-pointer transition-colors transform transition hover:scale-105">
            <PiggyBank className="inline-block mr-2" />
            Budgets
          </li>
          <li className="mb-4 hover:text-primary cursor-pointer transition-colors transform transition hover:scale-105">
            <ClipboardPen className="inline-block mr-2" />
            Reports
          </li>
        </ul>
      </nav>
    </aside>
  );
}
