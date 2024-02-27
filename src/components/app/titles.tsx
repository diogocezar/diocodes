import React from "react";
import { cn } from "@/lib/utils";

const Title = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn(
        "text-pink font-poppins mb-6 text-2xl font-bold md:mb-12 md:text-6xl",
        className,
      )}
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
    <h3
      ref={ref}
      className={cn(
        "text-foreground font-poppins font-poppins mb-4 mt-2 text-lg font-medium md:mb-12 md:text-xl",
        className,
      )}
    >
      {props.children}
    </h3>
  );
});

SubTitle.displayName = "SubTitle";

const SubSubTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        "text-green font-poppins mb-8 mt-1 text-xl font-bold md:mt-14 md:text-4xl",
        className,
      )}
    >
      {props.children}
    </h2>
  );
});

SubSubTitle.displayName = "SubSubTitle";

const AdminTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        "text-foreground mb-3 mt-2 flex flex-row gap-2 text-4xl font-bold tracking-tight",
        className,
      )}
    >
      {props.children}
    </h2>
  );
});

AdminTitle.displayName = "SubSubTitle";

export { Title, SubTitle, SubSubTitle, AdminTitle };
