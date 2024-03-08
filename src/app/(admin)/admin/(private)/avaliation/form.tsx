import { Button } from "@/components/ui/button";
import { Star } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SchemaAvaliation } from "@/schemas/schema-avaliation";
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
import { useMentoringState } from "@/hooks/use-mentoring-state";
import { SheetForm } from "@/components/containers/admin/shared/sheet-form";
import { QUERY_KEY } from "@/contants/query-key";
import { TypeMentoring } from "@/types/type-mentoring";
import { MultiSelect } from "@/components/ui/multi-select";
import { TypeTag } from "@/types/type-tag";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

export function AvaliationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMentoring, setIsLoadingMentoring] = useState(false);
  const [isLoadingTag, setIsLoadingTag] = useState(false);
  const [mentoring, setMentoring] = useState<TypeMentoring[]>([]);
  const [tag, setTag] = useState<any[]>([]);
  const isOpenForm = useMentoringState((state) => state.isOpenForm);
  const setIsOpenForm = useMentoringState((state) => state.setIsOpenForm);
  const selectedItem: any = useMentoringState((state) => state.selectedItem);
  const queryClient = useQueryClient();
  const url = "/admin/avaliation";

  const formatTags = (tags: any) => {
    if (!tags) return [];
    return tags.map((item: any) => {
      if (item.tag) {
        return {
          label: item.tag.name,
          value: item.tag.id,
        };
      } else {
        return {
          label: item.label,
          value: item.value,
        };
      }
    });
  };

  const form = useForm<z.infer<typeof SchemaAvaliation>>({
    resolver: zodResolver(SchemaAvaliation),
    defaultValues: {
      rating: [1],
    },
  });
  const setValue = form.setValue;

  useEffect(() => {
    setValue("mentoringId", selectedItem?.mentoring?.id || "");
    setValue("avaliationTags", formatTags(selectedItem?.avaliationTags || ""));
    setValue("comment", selectedItem?.comment || "");
    setValue("rating", [selectedItem?.rating || 1]);
  }, [selectedItem, setValue]);

  const getMentoring = useCallback(async () => {
    try {
      setIsLoadingMentoring(true);
      const response = await api.get("admin/mentoring");
      setMentoring(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMentoring(false);
    }
  }, []);

  useEffect(() => {
    getMentoring();
  }, [getMentoring]);

  const getTag = useCallback(async () => {
    try {
      setIsLoadingTag(true);
      const response = await api.get("admin/tag");
      const data = response.data.map((item: TypeTag) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setTag(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingTag(false);
    }
  }, []);

  useEffect(() => {
    getTag();
  }, [getTag]);

  const handleSubmit = async (data: z.infer<typeof SchemaAvaliation>) => {
    try {
      setIsLoading(true);
      const avaliationTags = data?.avaliationTags?.map((item: any) => {
        return {
          id: item.value,
        };
      });
      const formData = {
        mentoringId: data.mentoringId,
        avaliationTags,
        comment: data.comment,
        rating: Number(data.rating[0]),
      };
      if (selectedItem.id) {
        await api.patch(url, {
          id: selectedItem.id,
          ...formData,
        });
      } else {
        await api.post(url, formData);
      }
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ADMIN_AVALIATION] });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsOpenForm(false);
    }
  };

  return (
    <SheetForm
      Icon={<Star />}
      isOpenForm={isOpenForm}
      setIsOpenForm={setIsOpenForm}
      title={selectedItem.id ? "Editar avaliação" : "Criar avaliação"}
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
                          <SelectValue placeholder="Selecione a mentoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mentoring.map((item, index) => (
                          <SelectItem key={index} value={item?.id}>
                            {`${item?.attendee?.name} & ${item?.host?.name} - ${new Date(item?.startTime).toLocaleDateString("pt-BR")}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {isLoadingTag ? (
              <div className="text-foreground flex w-full flex-row items-center gap-2">
                <Spinner size={20} className="animate-spin" />
                Carregando...
              </div>
            ) : (
              <FormField
                control={form.control}
                name="avaliationTags"
                render={() => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <MultiSelect
                      fieldName="avaliationTags"
                      items={tag}
                      maxItems={10}
                      setValue={setValue}
                      initialValue={form.getValues("avaliationTags")}
                      placeholder="Selecione as tags"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nota: {field.value || 1}</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      defaultValue={[Number(field.value || 1)]}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.rating?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comentrário</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Foi muito boa a mentoria."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.comment?.message}
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
