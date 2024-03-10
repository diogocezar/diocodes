import { Button } from "@/components/ui/button";
import { Tag } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SchemaTag } from "@/schemas/schema-tag";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useTagState } from "@/hooks/use-tag-state";
import { SheetForm } from "@/components/containers/admin/shared/sheet-form";
import { QUERY_KEY } from "@/contants/query-key";
import { dispatchError, dispatchSuccess } from "@/lib/toast";

export function TagForm() {
  const [isLoading, setIsLoading] = useState(false);
  const isOpenForm = useTagState((state) => state.isOpenForm);
  const setIsOpenForm = useTagState((state) => state.setIsOpenForm);
  const selectedItem: any = useTagState((state) => state.selectedItem);
  const queryClient = useQueryClient();
  const url = "/admin/tag";
  const form = useForm<z.infer<typeof SchemaTag>>({
    resolver: zodResolver(SchemaTag),
    defaultValues: { name: "" },
  });
  const setValue = form.setValue;

  useEffect(() => {
    setValue("name", selectedItem.name || "");
  }, [selectedItem, setValue]);

  const handleSubmit = async (data: z.infer<typeof SchemaTag>) => {
    try {
      setIsLoading(true);
      if (selectedItem.id) {
        await api.patch(url, {
          id: selectedItem.id,
          ...data,
        });
      } else {
        await api.post(url, data);
      }
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ADMIN_TAG],
      });
      dispatchSuccess("Tag salva com sucesso!");
    } catch (error) {
      dispatchError(error);
    } finally {
      setIsLoading(false);
      setIsOpenForm(false);
    }
  };

  return (
    <SheetForm
      Icon={<Tag />}
      isOpenForm={isOpenForm}
      setIsOpenForm={setIsOpenForm}
      title={selectedItem.id ? "Editar tag" : "Criar tag"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da tag" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-green hover:bg-pink flex h-10 flex-row gap-2 rounded-lg px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex flex-row gap-2">
                <Spinner size={20} className="animate-spin" /> Aguarde...
              </div>
            ) : (
              "Enviar"
            )}
          </Button>
        </form>
      </Form>
    </SheetForm>
  );
}
