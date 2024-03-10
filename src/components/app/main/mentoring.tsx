import React from "react";
import { Calendar } from "@phosphor-icons/react";

type MentoringProps = {
  startTime: Date;
  attendee: {
    name: string;
  };
  isFree: boolean;
};

const Mentoring = ({ startTime, attendee, isFree }: MentoringProps) => {
  return (
    <li
      className={`shadow-w-full w-full md:w-[50%] lg:w-[33.3%] xl:w-[25%] ${new Date(startTime) > new Date() ? "opacity-100" : "opacity-50"}`}
    >
      <div className="group">
        <div
          className={`${!isFree ? "bg-green group-hover:bg-purple" : "bg-card"} group-hover:bg-background-dark m-2 gap-2 p-6 transition duration-300 ease-in-out`}
        >
          <div className="text-foreground font-poppins mb-2 text-sm font-bold">
            <Calendar
              size={32}
              className={`${!isFree ? "text-background group-hover:text-background-dark" : "text-green"}  mb-3`}
            />{" "}
            <span
              className={`${!isFree ? "text-background-dark group-hover:text-foreground" : "text-foreground"}`}
            >
              {attendee?.name.toUpperCase()}{" "}
              {!isFree && (
                <span className="bg-background-dark text-foreground ml-1 rounded-md px-3 text-xs">
                  PRO
                </span>
              )}
            </span>
          </div>
          <div
            className={`${!isFree ? "text-background group-hover:text-background-dark" : "text-green"} group-hover:text-foreground text-xs font-medium transition duration-300 ease-in-out`}
          >
            {new Date(startTime).toLocaleString("pt-BR")}
          </div>
        </div>
      </div>
    </li>
  );
};

export { Mentoring };
