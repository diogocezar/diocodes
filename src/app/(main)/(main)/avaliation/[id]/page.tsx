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
import { Spinner, Siren } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useGetTag } from "@/hooks/use-get-tag";
import { useGetMentoringById } from "@/hooks/use-get-mentoring";
import { TypeTagValueLabel } from "@/types/type-tag";
import { Box } from "@/components/app/main/box";
import { MeImage } from "@/components/app/main/image";

export default function AvaliationPage({ params }: { params: { id: string } }) {
  const [rating, setRating] = useState<number>(0);
  const [selectedTag, setSelectedTag] = useState<TypeTagValueLabel[]>([]);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const router = useRouter();
  const { tag, isLoadingTag } = useGetTag("tag");
  const { mentoring, isLoadingMentoring } = useGetMentoringById(params.id);

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
    return mentoring?.endTime?.toLocaleTimeString("pt-BR");
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
        <MeImage />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <Header
              headerTitle="Avalie a sua mentoria"
              headerSubTitle="Vai ser rapidinho! E você me ajuda a melhorar como mentor."
            />
            {isLoading ? (
              <div className="mb-8 flex flex-row gap-2 items-center">
                <Spinner size={20} className="animate-spin text-pink-primary" />
                <Paragraph className="mb-0 text-pink-primary">
                  Carregando...
                </Paragraph>
              </div>
            ) : (
              <div>
                <Box>
                  <SubTitle className="mt-3">
                    Olá,{" "}
                    <span className="text-background-dark">
                      {getAttendee()}
                    </span>
                    , espero que esteja bem!
                  </SubTitle>
                  <SubTitle>
                    Essa avaliação é referente ao encontro de{" "}
                    <span className="text-background-dark">{getDate()}</span>{" "}
                    das{" "}
                    <span className="text-background-dark">
                      {getStartTime()}
                    </span>{" "}
                    até{" "}
                    <span className="text-background-dark">{getEndTime()}</span>
                    .
                  </SubTitle>
                  <SubSubTitle
                    className={cn(
                      form.formState.errors.rating?.message
                        ? "text-rose-500"
                        : "text-pink-primary",
                      "mb-12 mt-14",
                    )}
                  >
                    Que nota você dá a essa mentoria?
                  </SubSubTitle>
                  <FormMessage className="mb-8 font-bold text-rose-500 text-md">
                    {form.formState.errors.rating?.message && (
                      <div className="flex flex-row gap-2">
                        <Siren size={23} />{" "}
                        {form.formState.errors.rating?.message}
                      </div>
                    )}
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
                  <Paragraph className="font-bold text-md">
                    Você escolheu a nota{" "}
                    <span className="text-background-dark text-xl">
                      {rating}
                    </span>
                    .
                  </Paragraph>
                  <SubSubTitle
                    className={cn(
                      form.formState.errors.avaliationTags?.message
                        ? "text-rose-500"
                        : "text-pink-primary",
                      "mt-14",
                    )}
                  >
                    Selecione {AVALIATION.MAX_TAGS} tags
                  </SubSubTitle>
                  <FormMessage className="mb-8 font-bold text-rose-500 text-md">
                    {form.formState.errors.avaliationTags?.message && (
                      <div className="flex flex-row gap-2">
                        <Siren size={23} />{" "}
                        {form.formState.errors.avaliationTags?.message
                          ? "Selecione pelo menos 6 tags!"
                          : ""}
                      </div>
                    )}
                  </FormMessage>
                  {isLoadingTag ? (
                    <div className="text-background-dark flex w-full flex-row items-center gap-2 font-bold text-md">
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
                      <Paragraph className="mt-10 font-bold text-md">
                        Você escolheu{" "}
                        <span className="text-background-dark font-bold text-xl">
                          {form.getValues("avaliationTags")?.length || 0}
                        </span>{" "}
                        de{" "}
                        <span className="text-background-dark font-bold text-xl">
                          {AVALIATION.MAX_TAGS}
                        </span>
                        .
                      </Paragraph>
                    </div>
                  )}
                  <SubSubTitle
                    className={cn(
                      form.formState.errors.comment?.message
                        ? "text-rose-500"
                        : "text-pink-primary",
                      "mt-8",
                    )}
                  >
                    Deixe um comentário
                  </SubSubTitle>
                  <FormMessage className="mb-8 font-bold text-rose-500 text-md">
                    {form.formState.errors.comment?.message && (
                      <div className="flex flex-row gap-2">
                        <Siren size={23} />{" "}
                        {form.formState.errors.comment?.message}
                      </div>
                    )}
                  </FormMessage>
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Textarea
                            placeholder="Como você classifica a mentoria? O que você achou? Conte-nos mais sobre a sua experiência."
                            className="h-[100px] w-full rounded-lg border-2 bg-foreground font-bold text-background-dark"
                            maxLength={250}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Box>
                <Button
                  type="submit"
                  className="rounded-lg mb-0 mt-6 flex w-full flex-row items-center justify-center gap-2 bg-foreground hover:bg-background hover:text-foreground h-[60px] lg:w-[250px] md:w-full md:mb-2 md:mt-2 lg:mb-8 lg:mt-10 md:justify-center"
                  disabled={isLoadingSubmit}
                >
                  {isLoadingSubmit ? (
                    <div className="flex flex-row items-center gap-2">
                      <Spinner className="h-5 w-5 animate-spin" />
                      Enviando
                    </div>
                  ) : (
                    "ENVIAR"
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
