import PageCommon from "@/components/containers/admin/shared/page-common";
import Calendar from "@/components/containers/admin/calendar/calendar";

export default function CalendarPage() {
  return (
    <PageCommon>
      <div className="w-full space-y-4 p-6">
        <Calendar />
      </div>
    </PageCommon>
  );
}
