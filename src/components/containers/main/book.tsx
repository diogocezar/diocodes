import React, { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/button";
import { Calendar, Star } from "@phosphor-icons/react";

const Book = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: {
          branding: { brandColor: "#50FA7B" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <>
      <div className="mb-4 flex flex-col items-center justify-center gap-4 sm:mb-0 md:flex-row md:justify-start">
        <Button
          data-cal-namespace=""
          data-cal-link="diogocezar/mentoria-diogao-pro"
          data-cal-config='{"layout":"month_view"}'
          className="bg-green hover:bg-card hover:text-green mb-2 mt-6 flex w-full flex-row items-center justify-center gap-2 sm:w-[300px] md:mb-8 md:mt-10 md:justify-center"
        >
          <Star size={20} />
          Mentoria Pro <span className="text-xs">(R$ 120,00)</span>
        </Button>
        <Button
          data-cal-namespace=""
          data-cal-link="diogocezar/mentoria-diogao"
          data-cal-config='{"layout":"month_view"}'
          className="sm:justify-left hover:bg-card hover:text-green mt-0 flex w-full flex-row items-center justify-center gap-2 sm:w-[300px] md:mt-10"
        >
          <Calendar size={20} />
          Mentoria Free
        </Button>
      </div>
    </>
  );
});

Book.displayName = "Book";

export { Book };
