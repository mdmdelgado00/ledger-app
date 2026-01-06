import { navItems } from "@lib/nav";
import { cn } from "@lib/utils";
import { Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="w-45 bg-surface border-r border-border overflow-x-hidden pt-2">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "mx-2 flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent transition-colors transform transition scale-115 translate-x-5 relative before:absolute before:left-1 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-primary "
                      : "hover:text-foreground cursor-pointer transition-colors transform transition hover:scale-115 hover:translate-x-5"
                  )
                }
              >
                {item.icon && <item.icon className="size-6 stroke-[1.5]" />}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-4 w-45 overflow-hidden">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                "mx-2 flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent transition-colors transform transition scale-115 translate-x-5 relative before:absolute before:left-1 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-primary "
                  : "hover:text-foreground cursor-pointer transition-colors transform transition hover:scale-115 hover:translate-x-5"
              )
            }
          >
            <Settings className="mr-2 text-foreground" />
            Settings
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}
