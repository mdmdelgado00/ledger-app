import { useAuth } from "@features/auth/authProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { LogOut, User } from "lucide-react";

export function ProfileButton() {
  const { signOut } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Profile Menu"
          className="
         inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=open]:bg-primary data-[state=open]:text-white cursor-pointer data-[state=open]:hover:cursor-default"
        >
          <User className="size-6 stroke-[1.5]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-surface border border-border rounded shadow-md mt-7 mr-2">
        <DropdownMenuItem
          className="px-4 py-2 hover:bg-surface-hover hover:cursor-pointer outline-none focus:outline-none focus-visible:ouline-none text-foreground"
          onClick={signOut}
        >
          <LogOut className="inline mr-2 size-4 stroke-[1.5] text-muted-foreground" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
