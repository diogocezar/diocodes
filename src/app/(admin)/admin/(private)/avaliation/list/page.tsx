"use client";
import { AdminTitle } from "@/components/containers/admin/shared/admin-title";
import { Star } from "@phosphor-icons/react";

export default function AdminAvaliationListPage() {
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AdminTitle title="Avaliações" Icon={<Star />} />
      </div>
    </>
  );
}
