import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@components/ui/input-group";

import { SearchIcon } from "lucide-react";

export default function SearchFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <InputGroup className="w-60">
      <InputGroupInput
        id="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search transactions..."
      ></InputGroupInput>
      <InputGroupAddon align="inline-start">
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          className="text-foreground disabled:text-muted-foreground cursor-pointer"
          disabled={!value}
          onClick={() => onChange("")}
        >
          Clear
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
