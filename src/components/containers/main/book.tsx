import React, { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@phosphor-icons/react";
import { PRICE } from "@/contants/price";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

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
      <div className="mb-4 flex flex-col items-center justify-center gap-0 sm:mb-0 md:flex-row md:justify-start md:gap-4">
        <Link
          href="https://buy.stripe.com/28oeVg9fVbt61ck9AB"
          target="_blank"
          className="w-full md:w-auto"
        >
          <Button className="me-button bg-green hover:bg-background hover:text-foreground rounded-none mb-0 mt-6 flex w-full flex-row items-center justify-center gap-2 md:w-[270px] md:mb-8 md:mt-10 md:justify-center">
            <Calendar size={22} />
            Mentoria Pro{" "}
            <span className="text-xs">
              ({formatCurrency(PRICE.MENTORING_PRO)})
            </span>
          </Button>
        </Link>
        <Button
          data-cal-namespace=""
          data-cal-link="diogocezar/mentoria-diogao"
          data-cal-config='{"layout":"month_view"}'
          className="me-button rounded-none mb-0 mt-6 flex w-full flex-row items-center justify-center gap-2 bg-foreground hover:bg-background hover:text-foreground md:w-[270px] md:mb-8 md:mt-10 md:justify-center"
        >
          <Calendar size={22} />
          Mentoria Free
        </Button>
      </div>
    </>
  );
});

Book.displayName = "Book";

export { Book };
