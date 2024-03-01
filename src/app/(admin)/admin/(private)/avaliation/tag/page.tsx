"use client";
import { AdminTitle } from "@/components/app/titles";
import { Tag as TagIcon } from "@phosphor-icons/react";
import { columns } from "./columns";
import * as React from "react";
import DataTable from "@/components/ui/data-table";
import TagForm from "./form";
import { api } from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTagState } from "@/hooks/use-tag-state";

export default function AdminAvaliationTag() {
  const queryClient = useQueryClient();
  const setIsOpen = useTagState((state) => state.setIsOpen);
  const setSelectedItem = useTagState((state) => state.setSelectedItem);
  const { data, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await api.get("/admin/avaliation/tag");
      return data;
    },
  });
  const handleDelete = async (items: any) => {
    const idsToDelete = items.map((item: any) => item.original.id);
    await api.delete("/admin/avaliation/tag", {
      data: { idsToDelete: idsToDelete },
    });
    queryClient.invalidateQueries({ queryKey: ["tags"] });
  };
  const handleEdit = async (item: any) => {
    setSelectedItem(item[0].original);
    setIsOpen(true);
  };
  const handleCreate = () => {
    setSelectedItem({});
    setIsOpen(true);
  };
  const dataTableColumns = columns(isLoading);
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
          columns={dataTableColumns}
          searchField="name"
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleCreate={handleCreate}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
