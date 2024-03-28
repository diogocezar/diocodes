"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

export default function CalendarPage() {
  return (
    <FullCalendar
      locale={ptBrLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={[
        { title: "Mentoria Free: Diogo Cezar", date: new Date() },
        { title: "event 2", date: "2019-04-02" },
      ]}
    />
  );
}
