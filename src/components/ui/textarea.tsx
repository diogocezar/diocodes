import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "bg-card border-input text-foreground placeholder:text-muted-foreground flex min-h-[80px] w-full rounded-md border px-3 py-2 text-base disabled:cursor-not-allowed disabled:opacity-50",

          // "border-input bg-card placeholder:text-muted-foreground text-foreground flex h-12 w-full rounded-lg border px-4 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
