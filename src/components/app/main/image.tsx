import React from "react";
import Image from "next/image";

const MeImage = () => {
  return (
    <div className="floating-image-custom">
      <Image
        className="h-56 w-56 md:h-80 md:w-80"
        src="/assets/images/perfil/avatar.svg"
        width={400}
        height={400}
        alt="Avatar do DioGO!"
      />
    </div>
  );
};

const MeLogo = () => {
  return (
    <div className="floating-image-custom">
      <Image
        className="w-56 md:w-80"
        src="/assets/images/logo/logo-complete.svg"
        width={400}
        height={400}
        alt="Logo do DioGO!"
      />
    </div>
  );
};

export { MeImage, MeLogo };
