import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export const formatHeaderSelect = (isLoading: boolean, table: any) => {
  return (
    <Checkbox
      checked={
        (!isLoading && table.getIsAllPageRowsSelected()) ||
        (!isLoading && table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
};

export const formatHeader = (title: string, column: any) => {
  return (
    <Button
      className="flex flex-row items-center gap-2"
      variant="link"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );
};
