import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  BanknoteArrowUp,
  CircleDollarSign,
  CreditCard,
  Folder,
  Plus,
} from "lucide-react";

export function AddButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center mr-6 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors hover:cursor-pointer outline-none focus:outline-none focus-visible:ouline-none">
          <Plus className="inline mr-2" />
          Add
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-surface border border-border rounded shadow-md mt-4">
        <DropdownMenuItem className="px-4 py-2 hover:bg-surface-hover hover:cursor-pointer outline-none focus:outline-none focus-visible:ouline-none">
          <BanknoteArrowUp className="inline mr-2 size-4 stroke-[1.5] text-text-muted" />
          Income
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2 hover:bg-surface-hover hover:cursor-pointer outline-none focus:outline-none focus-visible:ouline-none">
          <CreditCard className="inline mr-2 size-4 stroke-[1.5] text-text-muted" />
          Transaction
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2 hover:bg-surface-hover hover:cursor-pointer outline-none focus:outline-none focus-visible:ouline-none">
          <CircleDollarSign className="inline mr-2 size-4 stroke-[1.5] text-text-muted" />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2 hover:bg-surface-hover hover:cursor-pointer outline-none focus:outline-none focus-visible:ouline-none">
          <Folder className="inline mr-2 size-4 stroke-[1.5] text-text-muted" />
          Category
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
