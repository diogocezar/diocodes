"use client";
import { Container } from "@/components/app/main/container";
import { Paragraph } from "@/components/app/main/paragraph";
import Rating from "@/components/app/main/rating";
import { Tags } from "@/components/app/main/tags";
import { SubSubTitle, SubTitle } from "@/components/app/main/titles";
import { Header } from "@/components/containers/main/header";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AVALIATION } from "@/contants/avaliation";
import { cn } from "@/lib/utils";
import { SchemaAvaliationPublic } from "@/schemas/schema-avaliation-public";
import { api } from "@/services/api";
import { TypeTag } from "@/types/type-tag";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";

export default function AvaliationPage({ params }: { params: { id: string } }) {
  const [rating, setRating] = useState<number>(0);
  const [isLoadingTag, setIsLoadingTag] = useState(false);
  const [isLoadingMentoring, setIsLoadingMentoring] = useState(true);
  const [mentoring, setMentoring] = useState<any>({});
  const [tag, setTag] = useState<TypeTag[]>([]);
  const [selectedTag, setSelectedTag] = useState<any[]>([]);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const router = useRouter();
  const isLoading = isLoadingTag || isLoadingMentoring;

  const getTag = useCallback(async () => {
    try {
      setIsLoadingTag(true);
      const response = await api.get("tag");
      setTag(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingTag(false);
    }
  }, []);

  useEffect(() => {
    getTag();
  }, [getTag]);

  const getMentoring = useCallback(async () => {
    try {
      const response = await api.get(`mentoring/${params.id}`);
      const { data } = response;
      if (data.founded === false) {
        return (window.location.href = "/");
      }
      setMentoring(response.data);
      setIsLoadingMentoring(false);
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  useEffect(() => {
    getMentoring();
  }, [getMentoring]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const handleTagSelect = (selectedTagsParam: string[]) => {
    setSelectedTag(selectedTagsParam);
  };

  const form = useForm<z.infer<typeof SchemaAvaliationPublic>>({
    resolver: zodResolver(SchemaAvaliationPublic),
    defaultValues: {
      avaliationTags: [],
      comment: "",
    },
  });

  async function onSubmit(data: any) {
    try {
      setIsLoadingSubmit(true);
      const avaliationTags = selectedTag.map((item) => {
        return { id: item };
      });
      const response = await api.post(`avaliation`, {
        rating,
        mentoringId: params.id,
        avaliationTags: avaliationTags,
        comment: data.comment,
      });
      if (response.status === 201) {
        router.push("/avaliation/thanks");
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        return toast.error("A avaliação já foi enviada, obrigado!");
      }
      toast.error("Houston, we have a problem!");
    } finally {
      setIsLoadingSubmit(false);
    }
  }

  const getDate = () => {
    if (!isLoadingMentoring) {
      const newDate = new Date(mentoring.startTime);
      return newDate.toLocaleDateString("pt-BR");
    }
    return "00:00";
  };

  const getStartTime = () => {
    if (!isLoadingMentoring) {
      const newDate = new Date(mentoring.startTime);
      return newDate.toLocaleTimeString("pt-BR");
    }
    return "00:00";
  };

  const getEndTime = () => {
    if (!isLoadingMentoring) {
      const newDate = new Date(mentoring.endTime);
      return newDate.toLocaleTimeString("pt-BR");
    }
    return "00:00";
  };

  const getAttendee = () => {
    if (!isLoadingMentoring) return mentoring.attendee.name;
    return "Anônimo";
  };

  const setValue = form.setValue;

  return (
    <>
      <Container>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <Header
              headerTitle="Avalie a sua mentoria"
              headerSubTitle="Obrigado por realizar a avaliação da nossa mentoria!"
            />
            {isLoading ? (
              <Paragraph className="mb-8 flex flex-row gap-2">
                <Spinner size={20} className="animate-spin" />
                Carregando...
              </Paragraph>
            ) : (
              <div>
                <SubTitle>
                  Olá, <span className="text-green">{getAttendee()}</span>,
                  espero que esteja bem!
                </SubTitle>
                <SubTitle>
                  Essa avaliação é referente ao encontro de{" "}
                  <span className="text-green">{getDate()}</span> das{" "}
                  <span className="text-green">{getStartTime()}</span> até{" "}
                  <span className="text-green">{getEndTime()}</span>.
                </SubTitle>
                <SubSubTitle
                  className={cn(
                    form.formState.errors.rating?.message
                      ? "text-pink"
                      : "text-green",
                    "mb-12 mt-14",
                  )}
                >
                  Qual a sua nota?
                </SubSubTitle>
                <FormMessage className="mb-8">
                  {form.formState.errors.rating?.message}
                </FormMessage>
                <div className="flex w-full flex-col">
                  <FormField
                    name="rating"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <Rating
                            setValue={setValue}
                            onChange={handleRatingChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Paragraph className="font-poppins">
                  Você escolheu a nota{" "}
                  <span className="text-green text-xl">{rating}</span>.
                </Paragraph>
                <SubSubTitle
                  className={cn(
                    form.formState.errors.avaliationTags?.message
                      ? "text-pink"
                      : "text-green",
                    "mt-14",
                  )}
                >
                  Selecione 10 tags
                </SubSubTitle>
                <FormMessage className="mb-8">
                  {form.formState.errors.avaliationTags?.message}
                </FormMessage>
                {isLoadingTag ? (
                  <div className="text-foreground flex w-full flex-row items-center gap-2">
                    <Spinner size={20} className="animate-spin" />
                    Carregando...
                  </div>
                ) : (
                  <div className="flex w-full flex-col">
                    <FormField
                      name="avaliationTags"
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <Tags
                              maxTags={AVALIATION.MAX_TAGS}
                              availableTags={tag}
                              handleTagSelect={handleTagSelect}
                              setValue={setValue}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Paragraph className="font-poppins mt-10">
                      Você escolheu{" "}
                      <span className="text-green text-xl">
                        {form.getValues("avaliationTags")?.length || 0}
                      </span>{" "}
                      de{" "}
                      <span className="text-green text-xl">
                        {AVALIATION.MAX_TAGS}
                      </span>
                      .
                    </Paragraph>
                  </div>
                )}
                <SubSubTitle
                  className={cn(
                    form.formState.errors.comment?.message
                      ? "text-pink"
                      : "text-green",
                    "mt-8",
                  )}
                >
                  Deixe um comentário
                </SubSubTitle>
                <FormMessage className="mb-8">
                  {form.formState.errors.comment?.message}
                </FormMessage>
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Como você classifica a mentoria? O que você achou? Conte-nos mais sobre a sua experiência."
                          className="h-[200px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="mt-20 max-w-[150px]"
                  disabled={isLoadingSubmit}
                >
                  {isLoadingSubmit ? (
                    <div className="flex flex-row items-center gap-2">
                      <Spinner className="h-5 w-5 animate-spin" />
                      Enviando
                    </div>
                  ) : (
                    "Enviar"
                  )}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </Container>
    </>
  );
}
