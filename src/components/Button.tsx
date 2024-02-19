import React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "bg-pink text-background hover:bg-green mb-10 mt-10 animate-bounce cursor-crosshair rounded-full px-8 py-4 font-semibold transition-all",
        className,
      )}
      {...props}
    >
      {props.children}
    </button>
  );
});

Button.displayName = "Button";

const ButtonFooter = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "bg-background text-foreground hover:bg-pink cursor-crosshair rounded-full px-8 py-4 font-semibold transition-all",
        className,
      )}
      {...props}
    >
      {props.children}
    </button>
  );
});

ButtonFooter.displayName = "Button";

export { Button, ButtonFooter };
