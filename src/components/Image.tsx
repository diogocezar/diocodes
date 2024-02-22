import React from "react";

const HeaderImage = ({ ...props }) => {
  return (
    <div className="mb-12 h-[100px] w-[100px] items-center overflow-hidden md:h-[150px] md:w-[150px]">
      {props.children}
    </div>
  );
};

HeaderImage.displayName = "Image";

export { HeaderImage };
