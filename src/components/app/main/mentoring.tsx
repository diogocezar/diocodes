import React from "react";
import { Calendar } from "@phosphor-icons/react";
import { compactName } from "@/lib/utils";

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
          className={`${!isFree ? "bg-green group-hover:bg-purple" : "bg-card"} m-1 flex flex-row items-center gap-2 p-4 transition duration-300 ease-in-out group-hover:bg-background-dark`}
        >
          <div className="font-poppins text-sm font-bold text-foreground">
            <span
              className={`${!isFree ? "text-background-dark group-hover:text-foreground" : "text-foreground"}`}
            >
              {compactName(attendee?.name.toUpperCase())}{" "}
              {!isFree && (
                <span className="ml-1 rounded-md bg-background-dark px-3 text-xs text-foreground">
                  PRO
                </span>
              )}
            </span>
          </div>
          <div
            className={`${!isFree ? "text-background group-hover:text-background-dark" : "text-green"} text-xs font-medium transition duration-300 ease-in-out group-hover:text-foreground`}
          >
            {new Date(startTime).toLocaleDateString("pt-BR")}
          </div>
        </div>
      </div>
    </li>
  );
};

export { Mentoring };
