import React from "react";

const HeaderImage = ({ ...props }) => {
  return (
    <div className="mb-12 h-[150px] w-[150px] items-center overflow-hidden md:h-[250px] md:w-[250px]">
      {props.children}
    </div>
  );
};

HeaderImage.displayName = "Image";

export { HeaderImage };
