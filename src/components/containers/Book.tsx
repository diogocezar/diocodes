import React, { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@phosphor-icons/react";

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
      <Button
        data-cal-namespace=""
        data-cal-link="diogocezar/mentoria-diogao"
        data-cal-config='{"layout":"month_view"}'
        className="mt-10 flex flex-row items-center justify-start gap-2 md:mt-14 md:justify-center"
      >
        <Calendar size={20} />
        Agendar Mentoria
      </Button>
    </>
  );
});

Book.displayName = "Book";

export { Book };
