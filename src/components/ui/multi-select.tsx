"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
type Items = Record<"value" | "label", string>;

type MultiSelectProps = {
  items: Items[];
  setValue: any;
  placeholder?: string;
  fieldName: string;
  initialValue?: Items[];
};

export function MultiSelect({
  items,
  placeholder,
  setValue,
  initialValue = [],
  fieldName,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Items[]>(initialValue);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (item: Items) => {
      setSelected((prev) => prev.filter((s) => s.value !== item.value));
      const newSelected = selected.filter((s) => s.value !== item.value);
      setValue(fieldName, newSelected);
    },
    [selected, setValue, fieldName],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              setValue(fieldName, newSelected);
              return newSelected;
            });
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [fieldName, setValue],
  );

  const selectables = items.filter((item) => !selected.includes(item));

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="border-input bg-card text-foreground rounded-md border px-3 py-2 text-base">
        <div className="flex flex-wrap gap-1">
          {selected.map((item) => {
            return (
              <Badge
                key={item.value}
                className="bg-background text-foreground rounded-md px-4 py-1 text-sm font-normal"
                variant="secondary"
              >
                {item.label}
                <button
                  className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="text-muted-foreground hover:text-foreground h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder || "Selecione..."}
            className="placeholder:text-foreground ml-2 h-7 flex-1 bg-transparent outline-none"
          />
        </div>
      </div>
      <div className="relative mt-1">
        {open && selectables.length > 0 ? (
          <div className="bg-background-dark border-background text-foreground animate-in absolute top-0 z-10 max-h-[100px] w-full overflow-auto rounded-md border shadow-md outline-none">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((item) => {
                return (
                  <CommandItem
                    key={item.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue("");
                      setSelected((prev) => [...prev, item]);
                      setValue(fieldName, [...selected, item]);
                    }}
                    className="cursor-crosshair"
                  >
                    {item.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
