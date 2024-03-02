"use client";
import { AdminTitle } from "@/components/containers/admin/shared/admin-title";
import { TelegramLogo } from "@phosphor-icons/react";

export default function AdminAvaliationRequestPage() {
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AdminTitle title="Solicitar Avaliação" Icon={<TelegramLogo />} />
      </div>
    </>
  );
}
