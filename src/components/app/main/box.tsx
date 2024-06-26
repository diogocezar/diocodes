import React from "react";

const Box = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="box bg-foreground border-4 border-black p-5 relative flex flex-col justify-start items-start max-w-full lg:max-w-[95%]"
    >
      {props.children}
    </div>
  );
});

Box.displayName = "Box";

export { Box };
