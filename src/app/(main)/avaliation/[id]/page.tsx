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
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useGetTag } from "@/hooks/use-get-tag";
import { useGetOneMentoring } from "@/hooks/use-get-mentoring";
import { TypeTagValueLabel } from "@/types/type-tag";

export default function AvaliationPage({ params }: { params: { id: string } }) {
  const [rating, setRating] = useState<number>(0);
  const [selectedTag, setSelectedTag] = useState<TypeTagValueLabel[]>([]);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const router = useRouter();
  const { tag, isLoadingTag } = useGetTag();
  const { mentoring, isLoadingMentoring } = useGetOneMentoring(params.id);

  const isLoading = isLoadingTag && isLoadingMentoring;

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const handleTagSelect = (selectedTagsParam: TypeTagValueLabel[]) => {
    setSelectedTag(selectedTagsParam);
  };

  const form = useForm<z.infer<typeof SchemaAvaliationPublic>>({
    resolver: zodResolver(SchemaAvaliationPublic),
  });

  async function onSubmit(data: any) {
    try {
      setIsLoadingSubmit(true);
      const avaliationTags = selectedTag.map((item: TypeTagValueLabel) => {
        return { id: item.value, name: item.label };
      });
      const response = await api.post(`avaliation`, {
        rating,
        mentoringId: params.id,
        mentoring,
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
    return mentoring?.startTime?.toLocaleDateString("pt-BR");
  };

  const getStartTime = () => {
    return mentoring?.startTime?.toLocaleTimeString("pt-BR");
  };

  const getEndTime = () => {
    return mentoring?.startTime?.toLocaleTimeString("pt-BR");
  };

  const getAttendee = () => {
    return mentoring?.attendee?.name;
  };

  const setValue = form.setValue;

  if (mentoring?.founded === false) {
    return (window.location.href = "/");
  }

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
                  Selecione {AVALIATION.MAX_TAGS} tags
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
