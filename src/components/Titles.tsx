import React from "react";
import { cn } from "@/lib/utils";

const Title = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn("text-pink mb-12 text-6xl font-bold", className)}
    >
      {props.children}
    </h1>
  );
});

Title.displayName = "Title";

const SubTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn("text-green mb-8 mt-14 text-4xl font-bold", className)}
    >
      {props.children}
    </h2>
  );
});

SubTitle.displayName = "SubTitle";

const SubSubTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn("text-foreground mb-12 mt-2 text-xl", className)}
    >
      {props.children}
    </h3>
  );
});

SubSubTitle.displayName = "SubSubTitle";

export { Title, SubTitle, SubSubTitle };
