"use client";
import { AdminTitle } from "@/components/app/titles";
import { Tag as TagIcon } from "@phosphor-icons/react";
import { columns } from "./columns";
import { TypeTag } from "@/types/type-tag";
import * as React from "react";

import DataTable from "@/components/ui/data-table";
import TagForm from "./form";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function AdminRequestAvaliation() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const result = await api.get("/admin/avaliation/tag");
        setData(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <>
      <div className="flex-1 p-8 pt-6">
        <div className="flex items-center justify-between">
          <AdminTitle className="mb-0 mt-0">
            <TagIcon className="h-9 w-9" /> Tags {isLoading && "Carregando..."}
          </AdminTitle>
        </div>
        <DataTable
          form={<TagForm defaultValues={{ name: "Uma nova Tag" }} />}
          data={data}
          columns={columns}
          searchField="name"
        />
      </div>
    </>
  );
}
