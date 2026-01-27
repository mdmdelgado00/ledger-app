import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { ChevronDown, Tag } from "lucide-react";
import { useMemo } from "react";
import type { Category } from "../../types";

type Props = {
  categoryIds: string[];
  onChange: (categoryIds: string[]) => void;
  categories: Category[];
};

export default function CategoriesFilter({
  categoryIds,
  onChange,
  categories,
}: Props) {
  const selectedCategories = useMemo(() => new Set(categoryIds), [categoryIds]);
  const count = categoryIds.length;

  const label =
    count === 0
      ? "All Categories"
      : count === 1
        ? (categories.find((c) => c.id === categoryIds[0])?.name ??
          "1 category")
        : `${count} Categories`;

  const toggle = (id: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    onChange(Array.from(newSelected));
  };

  const clear = () => onChange([]);
  const selectAll = () => onChange(categories.map((c) => c.id));

  const favorites = categories.filter((c) => c.isFavorite);
  const income = categories.filter((c) => c.kind === "income");
  const expense = categories.filter((c) => c.kind === "expense");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="justify-between">
          <span className="flex items-center gap-2">
            <Tag className="size-4" />
            {label}
          </span>
          <ChevronDown className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-fit p-0">
        <div className="w-full flex items-center justify-between border-b p-2">
          <div className="w-full flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              //disabled={count === 0}
              onClick={selectAll}
              className="cursor-pointer"
            >
              Select All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              //disabled={count === categories.length}
              onClick={clear}
              className="cursor-pointer"
            >
              Clear
            </Button>
          </div>
        </div>
        <Command className="rounded-none">
          <CommandInput placeholder="Search categories..." />
          <CommandList>
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </CommandEmpty>
            {favorites.length > 0 && (
              <CommandGroup heading="Favorites">
                {favorites.map((category) => (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    checked={selectedCategories.has(category.id)}
                    onToggle={() => toggle(category.id)}
                  />
                ))}
              </CommandGroup>
            )}
            {income.length > 0 && (
              <CommandGroup heading="Income">
                {income.map((category) => (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    checked={selectedCategories.has(category.id)}
                    onToggle={() => toggle(category.id)}
                  />
                ))}
              </CommandGroup>
            )}
            {expense.length > 0 && (
              <CommandGroup heading="Expense">
                {expense.map((category) => (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    checked={selectedCategories.has(category.id)}
                    onToggle={() => toggle(category.id)}
                  />
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function CategoryItem({
  category,
  checked,
  onToggle,
}: {
  category: Category;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <CommandItem
      onSelect={() => {
        onToggle();
      }}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onToggle}
        onClick={(e) => e.stopPropagation()}
        className="
          bg-transparent
          data-[state=checked]:bg-transparent
          data-[state=checked]:text-primary
          data-[state=checked]:border-primary
        "
      />
      <span className="ml-2">{category.name}</span>
    </CommandItem>
  );
}
