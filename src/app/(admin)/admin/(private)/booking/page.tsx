"use client";
import { AdminTitle } from "@/components/containers/admin/shared/admin-title";
import { Calendar } from "@phosphor-icons/react";

export default function AdminBookingPage() {
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AdminTitle title="Reservas" Icon={<Calendar />} />
      </div>
    </>
  );
}
