import { Button } from "@/components/ui/button";
import { Tag } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SchemaMentoring } from "@/schemas/schema-mentoring";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { TypePerson } from "@/types/type-person";

export function MentoringForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPerson, setIsLoadingPerson] = useState(false);
  const [persons, setPersons] = useState<TypePerson[]>([]);
  const isOpenForm = useMentoringState((state) => state.isOpenForm);
  const setIsOpenForm = useMentoringState((state) => state.setIsOpenForm);
  const selectedItem: any = useMentoringState((state) => state.selectedItem);
  const queryClient = useQueryClient();
  const url = "/admin/mentoring";

  const form = useForm<z.infer<typeof SchemaMentoring>>({
    resolver: zodResolver(SchemaMentoring),
    defaultValues: {
      hostId: "",
      attendeeId: "",
      startTime: undefined,
      endTime: undefined,
    },
  });
  const setValue = form.setValue;
  useEffect(() => {
    if (selectedItem) {
      setValue("hostId", selectedItem?.host?.id);
      setValue("attendeeId", selectedItem?.attendee?.id);
      setValue("startTime", selectedItem?.startTime);
      setValue("endTime", selectedItem?.endTime);
    } else {
      setValue("hostId", "");
      setValue("attendeeId", "");
      setValue("startTime", new Date());
      setValue("endTime", new Date());
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

  const handleSubmit = async (data: z.infer<typeof SchemaMentoring>) => {
    try {
      console.log(data);
      setIsLoading(true);
      if (selectedItem.id) {
        await api.patch(url, {
          id: selectedItem.id,
          ...data,
        });
      } else {
        await api.post(url, data);
      }
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ADMIN_MENTORING] });
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
              </>
            )}
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Início</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
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
                  <FormLabel>Fim</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
