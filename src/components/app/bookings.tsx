import React from "react";
import { Calendar } from "@phosphor-icons/react";

const Bookings = ({ booking }: any) => {
  return (
    <li
      className={`shadow- w-full cursor-crosshair md:w-[50%] lg:w-[33.3%] xl:w-[25%] ${booking.isActive ? "opacity-100" : "opacity-20"}`}
    >
      <div className="group">
        <div className="bg-card group-hover:bg-background-dark m-2 gap-2 p-6 transition duration-300 ease-in-out">
          <div className="text-foreground font-poppins mb-2 text-sm font-bold">
            <Calendar size={32} className="text-green mb-3" />{" "}
            {booking.attendee.toUpperCase()}
          </div>
          <div className="text-pink group-hover:text-foreground text-xs font-medium transition duration-300 ease-in-out">
            {new Date(booking.startTime).toLocaleString("pt-BR")}
          </div>
        </div>
      </div>
    </li>
  );
};

export { Bookings };
