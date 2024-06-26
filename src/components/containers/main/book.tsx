import React, { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/button";
import { Calendar, Star } from "@phosphor-icons/react";
import { PRICE } from "@/contants/price";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { SubTitle } from "@/components/app/main/titles";

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
          href="https://buy.stripe.com/4gw3cy9fV7cQ6wE000"
          target="_blank"
          className="w-full sm:w-auto"
        >
          <Button className="me-button rounded-none mb-0 mt-6 flex w-full flex-row items-center justify-center gap-2 bg-foreground hover:bg-green hover:text-background-dark sm:w-[270px] md:mb-8 md:mt-10 md:justify-center">
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
          className="me-button rounded-none mb-0 mt-6 flex w-full flex-row items-center justify-center gap-2 bg-foreground hover:bg-green hover:text-background-dark sm:w-[270px] md:mb-8 md:mt-10 md:justify-center"
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
