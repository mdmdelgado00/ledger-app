import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Ellipsis, Trash } from "lucide-react";
import type { Transaction } from "./types";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "categoryId",
    header: "Category",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0 cursor-pointer">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center gap-2">
              <Edit />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive hover:bg-destructive/10 flex items-center gap-2">
              <Trash className="text-destructive" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
