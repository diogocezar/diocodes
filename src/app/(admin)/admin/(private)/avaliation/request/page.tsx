"use client";
import { AdminTitle } from "@/components/app/titles";
import { CheckFat } from "@phosphor-icons/react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function AdminRequestAvaliation() {
  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <AdminTitle>
            <CheckFat className="h-9 w-9" /> Solicitar Avaliação
          </AdminTitle>
        </div>
        <div className="container mx-auto py-10">
          {/* <DataTable columns={columns} data={data} /> */}
        </div>
      </div>
    </>
  );
}
