import {
  ClipboardPen,
  CreditCard,
  Folder,
  LayoutDashboard,
  PiggyBank,
} from "lucide-react";

export const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transactions", href: "/transactions", icon: CreditCard },
  { label: "Category", href: "/categories", icon: Folder },
  { label: "Budgets", href: "/budgets", icon: PiggyBank },
  { label: "Reports", href: "/reports", icon: ClipboardPen },
];
