import {
  ClipboardPen,
  CreditCard,
  LayoutDashboard,
  PiggyBank,
  Tag,
} from "lucide-react";

export const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transactions", href: "/transactions", icon: CreditCard },
  { label: "Categories", href: "/categories", icon: Tag },
  { label: "Budgets", href: "/budgets", icon: PiggyBank },
  { label: "Reports", href: "/reports", icon: ClipboardPen },
];
