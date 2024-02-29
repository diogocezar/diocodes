import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rounded-md text-md disabled:pointer-events-none disabled:opacity-50 shadow",
  {
    variants: {
      variant: {
        default:
          "bg-pink font-poppins text-background hover:bg-green mb-8 mt-8 cursor-crosshair rounded-full px-6 py-3 font-semibold transition duration-300 ease-in-out",
        destructive:
          "bg-background font-poppins text-foreground hover:bg-pink cursor-crosshair rounded-full px-8 py-4 font-semibold transition duration-300 ease-in-out",
        outline:
          "bg-card text-foreground hover:bg-background-dark flex flex-row items-center rounded-lg px-6 py-3",
        secondary:
          "bg-secondary font-poppins text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent font-poppins hover:text-accent-foreground",
        link: "text-primary font-poppins underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
