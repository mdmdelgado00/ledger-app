import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { cn } from "@lib/utils";
import { ChevronDown, Plus, User, Users } from "lucide-react";
import { useState } from "react";

export function SpacesDropdown() {
  const [space, setSpace] = useState("personal");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center gap-2",
            "h-10 rounded-md px-3",
            "bg-primary-soft text-primary",
            "hover:bg-primary-soft/70",
            "focus:outline-none",
            "data-[state=open]:bg-primary-soft/70 data-[state=open]:shadow-sm",
            "cursor-pointer select-none transition-colors",
          )}
        >
          {space === "personal" ? (
            <User className="size-5 stroke-[1.5] text-primary" />
          ) : (
            <Users className="size-5 stroke-[1.5] text-primary" />
          )}
          <span className="max-w-[160px] truncate font-semibold">
            {space === "personal" ? "Personal Space" : "Work Space"}
          </span>
          <ChevronDown
            className={cn(
              "size-4 stroke-[1.5] text-primary transition-transform",
              "data-[state=open]:rotate-180",
            )}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className={cn(
          "z-50 min-w-64 overflow-hidden",
          "rounded-xl border border-border bg-background",
          "shadow-lg p-2",
        )}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-2 text-xs font-medium text-muted-foreground">
            Spaces
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup value={space} onValueChange={setSpace}>
            <DropdownMenuRadioItem value="personal">
              <User />
              Personal Space
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="work">
              <Users />
              Work Space
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator className="my-1 h-px bg-border" />
          <DropdownMenuItem className="flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-2 text-sm outline-hidden select-none">
            <Plus className="size-4" />
            Create New Space
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
