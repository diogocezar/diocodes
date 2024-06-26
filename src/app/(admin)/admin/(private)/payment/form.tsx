import { Button } from "@/components/ui/button";
import { Tag } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { usePaymentState } from "@/hooks/use-payment-state";
import { SheetForm } from "@/components/containers/admin/shared/sheet-form";
import { QUERY_KEY } from "@/contants/query-key";
import { dispatchError, dispatchSuccess } from "@/lib/toast";
import { SchemaPayment } from "@/schemas/schema-payment";
import { useGetPersonPro } from "@/hooks/use-get-person";
import { useGetMentoringPro } from "@/hooks/use-get-mentoring";
import { PRICE } from "@/contants/price";

export function PaymentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const isOpenForm = usePaymentState((state) => state.isOpenForm);
  const setIsOpenForm = usePaymentState((state) => state.setIsOpenForm);
  const selectedItem: any = usePaymentState((state) => state.selectedItem);
  const queryClient = useQueryClient();
  const { person, isLoadingPerson } = useGetPersonPro();
  const { mentoring, isLoadingMentoring } = useGetMentoringPro();
  const url = "/admin/payment";
  const form = useForm<z.infer<typeof SchemaPayment>>({
    resolver: zodResolver(SchemaPayment),
    defaultValues: { amount: 0 },
  });

  const setValue = form.setValue;

  const bootstrap = useCallback(() => {
    setValue("amount", selectedItem?.amount || PRICE.MENTORING_PRO);
    setValue("personId", selectedItem?.person?.id || null);
    setValue("mentoringId", selectedItem?.mentoring?.id || null);
  }, [setValue, selectedItem]);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const handleSubmit = async (data: z.infer<typeof SchemaPayment>) => {
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
        queryKey: [QUERY_KEY.ADMIN_PAYMENT],
      });
      dispatchSuccess("Pagamento salvo com sucesso!");
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
      title={selectedItem.id ? "Editar pagamento" : "Criar pagamento"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input placeholder="Valor" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.amount?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
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
                        {person.map((item, index) => (
                          <SelectItem key={index} value={item?.id}>
                            {item?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
