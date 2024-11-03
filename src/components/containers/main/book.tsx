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
      <div className="mb-4 flex flex-col w-full items-center justify-center gap-0 sm:mb-0 md:flex-row md:justify-start md:gap-4">
        <Link
          href="https://buy.stripe.com/28oeVg9fVbt61ck9AB"
          target="_blank"
          className="w-full lg:w-auto"
        >
          <Button className="bg-pink-primary text-foreground hover:bg-background hover:text-foreground rounded-lg mb-0 mt-6 flex w-full flex-row items-center justify-center h-[60px] gap-2 lg:w-[350px] lg:mb-8 lg:mt-10 lg:justify-center">
            MENTORIA PRO{" "}
            <span className="text-xs">
              ({formatCurrency(PRICE.MENTORING_PRO)})
            </span>
          </Button>
        </Link>
        <Button
          data-cal-namespace=""
          data-cal-link="diogocezar/mentoria-diogao"
          data-cal-config='{"layout":"month_view"}'
          className="rounded-lg mb-0 mt-6 flex w-full flex-row items-center justify-center gap-2 bg-foreground hover:bg-background hover:text-foreground h-[60px] lg:w-[350px] lg:mb-8 lg:mt-10 lg:justify-center"
        >
          MENTORIA FREE
        </Button>
      </div>
    </>
  );
});

Book.displayName = "Book";

export { Book };
