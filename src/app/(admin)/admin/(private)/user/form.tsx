import { Button } from "@/components/ui/button";
import { Tag } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SchemaUser } from "@/schemas/schema-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@phosphor-icons/react";
import { api } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useUserState } from "@/hooks/use-user-state";
import { SheetForm } from "@/components/containers/admin/shared/sheet-form";
import { QUERY_KEY } from "@/contants/query-key";
import { TypePerson } from "@/types/type-person";

export function UserForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPerson, setIsLoadingPerson] = useState(false);
  const [persons, setPersons] = useState<TypePerson[]>([]);
  const isOpenForm = useUserState((state) => state.isOpenForm);
  const setIsOpenForm = useUserState((state) => state.setIsOpenForm);
  const selectedItem: any = useUserState((state) => state.selectedItem);
  const queryClient = useQueryClient();
  const url = "/admin/user";
  const form = useForm<z.infer<typeof SchemaUser>>({
    resolver: zodResolver(SchemaUser),
    defaultValues: { personId: "", role: "" },
  });
  const setValue = form.setValue;
  useEffect(() => {
    if (selectedItem) {
      setValue("personId", selectedItem?.person?.id);
      setValue("role", selectedItem?.role);
    } else {
      setValue("personId", "");
      setValue("role", "");
    }
  }, [selectedItem, setValue]);

  const getPersons = useCallback(async () => {
    try {
      setIsLoadingPerson(true);
      const response = await api.get("admin/person");
      setPersons(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPerson(false);
    }
  }, []);

  useEffect(() => {
    getPersons();
  }, [getPersons]);

  const handleSubmit = async (data: z.infer<typeof SchemaUser>) => {
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ADMIN_USER] });
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
      title={selectedItem.id ? "Editar usuário" : "Criar usuário"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-4">
            {isLoadingPerson ? (
              <div className="text-foreground flex w-full flex-row items-center gap-2">
                <Spinner size={20} className="animate-spin" />
                Carregando...
              </div>
            ) : (
              <FormField
                control={form.control}
                name="personId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pessoa</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma pessoa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {persons.map((person, index) => (
                          <SelectItem key={index} value={person?.id}>
                            {person?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Papel</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um papel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Administrador</SelectItem>
                      <SelectItem value="USER">Usuário</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
