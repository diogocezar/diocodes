import { Button } from "@/components/ui/button";
import { Tag } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SchemaInvite } from "@/schemas/schema-invite";
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
import { SheetForm } from "@/components/containers/admin/shared/sheet-form";
import { QUERY_KEY } from "@/contants/query-key";
import { dispatchError, dispatchSuccess } from "@/lib/toast";
import { useInviteState } from "@/hooks/use-invite-state";
import { useGetMentoring } from "@/hooks/use-get-mentoring";

export function InviteForm() {
  const [isLoading, setIsLoading] = useState(false);
  const isOpenForm = useInviteState((state) => state.isOpenForm);
  const setIsOpenForm = useInviteState((state) => state.setIsOpenForm);
  const selectedItem = useInviteState((state) => state.selectedItem);
  const queryClient = useQueryClient();
  const { mentoring, isLoadingMentoring } = useGetMentoring();
  const url = "/admin/invite";
  const form = useForm<z.infer<typeof SchemaInvite>>({
    resolver: zodResolver(SchemaInvite),
  });
  const setValue = form.setValue;

  const bootstrap = useCallback(() => {
    setValue("mentoringId", selectedItem?.mentoring?.id || "");
  }, [setValue, selectedItem]);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const handleSubmit = async (data: z.infer<typeof SchemaInvite>) => {
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
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ADMIN_INVITE],
      });
      dispatchSuccess("Convite salvo com sucesso!");
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
      title={selectedItem.id ? "Editar convite" : "Criar convite"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-4">
            {isLoadingMentoring ? (
              <div className="text-foreground flex w-full flex-row items-center gap-2">
                <Spinner size={20} className="animate-spin" />
                Carregando...
              </div>
            ) : (
              <FormField
                control={form.control}
                name="mentoringId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mentoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma mentoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mentoring.map((item, index) => (
                          <SelectItem key={index} value={item?.id}>
                            {`${new Date(item?.startTime).toLocaleDateString("pt-BR")} - ${item?.attendee?.name}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
