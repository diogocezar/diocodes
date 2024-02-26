import React, { useEffect, useState } from "react";
import { SubSubTitle } from "@/components/app/titles";
import { TypeBooking } from "@/types/type-booking";
import { Paragraph } from "@/components/app/paragraph";
import { Spinner } from "@phosphor-icons/react";
import { Bookings } from "@/components/app/bookings";

const WhoBooked = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  const [bookings, setBookints] = useState(Array<TypeBooking>);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const request = await fetch("/api/booking");
        const bookings = await request.json();
        setBookints(bookings);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <>
      <SubSubTitle>Quem já reservou?</SubSubTitle>
      {isLoading ? (
        <Paragraph className="mb-8 flex flex-row gap-2">
          <Spinner size={20} className="animate-spin" />
          Carregando...
        </Paragraph>
      ) : (
        <ul className="mb-8 flex w-full flex-row flex-wrap">
          {bookings.map((booking: TypeBooking, index) => (
            <Bookings key={index} booking={booking} />
          ))}
        </ul>
      )}
    </>
  );
});

WhoBooked.displayName = "WhoBooked";

export { WhoBooked };
