import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { useGetMentoring } from "@/hooks/use-get-mentoring";
import { SubSubTitle } from "@/components/app/main/titles";
import SkeletonWhoBooked from "@/components/skeletons/skeleton-who-booked";
import { compactName } from "@/lib/utils";
import { CAL } from "@/contants/cal";

export default function Calendar() {
  const { mentoring, isLoadingMentoring } = useGetMentoring("mentoring");
  const events = mentoring.map((mentoring) => {
    return {
      title: compactName(mentoring?.attendee?.name.toUpperCase()),
      date: mentoring.startTime,
      color:
        mentoring.externalEventId === CAL.MENTORING_FREE
          ? "#50fa7b"
          : "#ff79c6",
    };
  });
  return (
    <div className="hidden w-full sm:hidden md:block lg:block">
      <SubSubTitle>Agenda de Mentorias</SubSubTitle>
      {isLoadingMentoring ? (
        <SkeletonWhoBooked />
      ) : (
        <div className="w-full">
          <FullCalendar
            eventColor="#50fa7b"
            eventTextColor="#0e0f12"
            contentHeight={900}
            eventDisplay="block"
            locale={ptBrLocale}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
          />
        </div>
      )}
    </div>
  );
}
