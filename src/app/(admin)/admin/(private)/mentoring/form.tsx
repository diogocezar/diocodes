import { Button } from "@/components/ui/button";
import { Tag } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SchemaMentoring } from "@/schemas/schema-mentoring";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { TimePicker } from "@/components/ui/time-picker";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@phosphor-icons/react";
import { api } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useMentoringState } from "@/hooks/use-mentoring-state";
import { SheetForm } from "@/components/containers/admin/shared/sheet-form";
import { QUERY_KEY } from "@/contants/query-key";
import { Textarea } from "@/components/ui/textarea";
import { dispatchError, dispatchSuccess } from "@/lib/toast";
import { useGetPerson } from "@/hooks/use-get-person";

export function MentoringForm() {
  const [isLoading, setIsLoading] = useState(false);
  const isOpenForm = useMentoringState((state) => state.isOpenForm);
  const setIsOpenForm = useMentoringState((state) => state.setIsOpenForm);
  const selectedItem = useMentoringState((state) => state.selectedItem);
  const queryClient = useQueryClient();
  const { person, isLoadingPerson } = useGetPerson();
  const url = "/admin/mentoring";

  const form = useForm<z.infer<typeof SchemaMentoring>>({
    resolver: zodResolver(SchemaMentoring),
  });

  const setValue = form.setValue;

  const bootstrap = useCallback(() => {
    setValue("hostId", selectedItem?.host?.id || "");
    setValue("attendeeId", selectedItem?.attendee?.id || "");
    setValue("startTime", selectedItem?.startTime || new Date());
    setValue("endTime", selectedItem?.endTime || new Date());
    setValue("externalMessage", selectedItem?.externalMessage || "");
  }, [setValue, selectedItem]);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const handleSubmit = async (data: z.infer<typeof SchemaMentoring>) => {
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
        queryKey: [QUERY_KEY.ADMIN_MENTORING],
      });
      dispatchSuccess("Mentoria salva com sucesso!");
    } catch (error) {
      dispatchError(error);
    } finally {
      setIsLoading(false);
      setIsOpenForm(false);
    }
  };

  const disabledStartDate = useCallback((date: Date) => date < new Date(), []);

  const disabledEndDate = useCallback(
    (date: Date) => date < form.getValues("startTime"),
    [form],
  );

  return (
    <SheetForm
      Icon={<Tag />}
      isOpenForm={isOpenForm}
      setIsOpenForm={setIsOpenForm}
      title={selectedItem.id ? "Editar mentoria" : "Criar mentoria"}
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
              <>
                <FormField
                  control={form.control}
                  name="hostId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Host</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o host" />
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
                <FormField
                  control={form.control}
                  name="attendeeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Participante</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o participante" />
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
              </>
            )}
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Começa em</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="border-background text-foreground m-0 w-full gap-2 border px-4 text-left font-normal"
                      >
                        <div className="flex flex-row gap-2">
                          <CalendarIcon className="h-5 w-5" />
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy HH:mm:ss")
                          ) : (
                            <div className="h-5">Selecione a data e hora</div>
                          )}
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={disabledStartDate}
                      />
                      <div className="border-border border-t p-3">
                        <TimePicker
                          setDate={field.onChange}
                          date={field.value}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Termina em</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="border-background text-foreground m-0 w-full gap-2 border px-4 text-left font-normal"
                      >
                        <div className="flex flex-row gap-2">
                          <CalendarIcon className="h-5 w-5" />
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy HH:mm:ss")
                          ) : (
                            <div className="h-5">Selecione a data e hora</div>
                          )}
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={disabledEndDate}
                      />
                      <div className="border-border border-t p-3">
                        <TimePicker
                          setDate={field.onChange}
                          date={field.value}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedItem?.externalMessage && (
              <FormField
                control={form.control}
                name="externalMessage"
                disabled={true}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
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
