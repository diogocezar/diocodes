"use client";
import { AdminTitle } from "@/components/app/titles";
import { Tag as TagIcon } from "@phosphor-icons/react";
import { columns } from "./columns";
import { Tag } from "./columns";
import * as React from "react";

import DataTable from "@/components/ui/data-table";
import TagForm from "./form";

const data: Tag[] = [
  {
    id: "m5gr84i9",
    name: "Interessante",
    createdAt: new Date(),
  },
  {
    id: "m5gr84i4",
    name: "Médio",
    createdAt: new Date(),
  },
];

export default function AdminRequestAvaliation() {
  return (
    <>
      <div className="flex-1 p-8 pt-6">
        <div className="flex items-center justify-between">
          <AdminTitle className="mb-0 mt-0">
            <TagIcon className="h-9 w-9" /> Tags
          </AdminTitle>
        </div>
        <DataTable
          form={<TagForm />}
          data={data}
          columns={columns}
          searchField="name"
        />
      </div>
    </>
  );
}
