import { Button } from "@/components/ui/button";
import { Tag } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SchemaPerson } from "@/schemas/schema-person";
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
import { usePersonState } from "@/hooks/use-person-state";
import { SheetForm } from "@/components/containers/admin/shared/sheet-form";
import { QUERY_KEY } from "@/contants/query-key";

export function PersonForm() {
  const [isLoading, setIsLoading] = useState(false);
  const isOpenForm = usePersonState((state) => state.isOpenForm);
  const setIsOpenForm = usePersonState((state) => state.setIsOpenForm);
  const selectedItem: any = usePersonState((state) => state.selectedItem);
  const queryClient = useQueryClient();
  const url = "/admin/person";
  const form = useForm<z.infer<typeof SchemaPerson>>({
    resolver: zodResolver(SchemaPerson),
    defaultValues: { name: "", email: "" },
  });
  const setValue = form.setValue;
  useEffect(() => {
    if (selectedItem) {
      setValue("name", selectedItem.name);
      setValue("email", selectedItem.email);
    } else {
      setValue("name", "");
      setValue("email", "");
    }
  }, [selectedItem, setValue]);

  const handleSubmit = async (data: z.infer<typeof SchemaPerson>) => {
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ADMIN_PERSON] });
    } catch (error) {
      console.error(error);
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
      title={selectedItem.id ? "Editar pessoa" : "Criar pessoa"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="E-mail" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
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
