"use client";
import { z } from "zod";
import { Container } from "@/components/app/main/container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SchemaAvaliation } from "@/schemas/schema-avaliation";
import { SubSubTitle, SubTitle } from "@/components/app/main/titles";
import Rating from "@/components/app/main/rating";
import { useCallback, useEffect, useState } from "react";
import { Paragraph } from "@/components/app/main/paragraph";
import { Header } from "@/components/containers/main/header";
import { Tags } from "@/components/app/main/tags";
import { AVALIATION } from "@/contants/avaliation";
import { api } from "@/services/api";
import { TypeTag } from "@/types/type-tag";
import { Spinner } from "@phosphor-icons/react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function AvaliationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [rating, setRating] = useState<number>(1);
  const [isLoadingTag, setIsLoadingTag] = useState(false);
  const [isLoadingMentoring, setIsLoadingMentoring] = useState(true);
  const [mentoring, setMentoring] = useState<any>({});
  const [tag, setTag] = useState<any[]>([]);
  const [selectedTag, setSelectedTag] = useState<any[]>([]);

  const getTag = useCallback(async () => {
    try {
      setIsLoadingTag(true);
      const response = await api.get("tag");
      const data = response.data.map((item: TypeTag) => item.name);
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

  const getMentoring = useCallback(async () => {
    try {
      const response = await api.get(`mentoring/${params.id}`);
      setMentoring(response.data);
    } catch (error) {
      router.push("/");
    } finally {
      setIsLoadingMentoring(false);
    }
  }, []);

  useEffect(() => {
    getMentoring();
  }, [getMentoring]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const handleTagSelect = (selectedTagsParam: string[]) => {
    setSelectedTag(selectedTagsParam);
  };

  const form = useForm<z.infer<typeof SchemaAvaliation>>({
    resolver: zodResolver(SchemaAvaliation),
  });

  async function onSubmit(data: any) {
    console.log(data);
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
      const newDate = new Date(mentoring.start);
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

  return (
    <>
      <Container>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Header
              headerTitle="Avalie a sua mentoria"
              headerSubTitle="Obrigado por realizar a avaliação da nossa mentoria!"
            />
            <SubTitle>
              Olá, <span className="text-green">{getAttendee()}</span>, espero
              que esteja bem!
            </SubTitle>
            <SubTitle>
              Só confirmando, essa avaliação é referente ao papo que tivemos no
              dia <span className="text-green">{getDate()}</span> das{" "}
              <span className="text-green">{getStartTime()}</span> até{" "}
              <span className="text-green">{getEndTime()}</span>.
            </SubTitle>
            <SubSubTitle className="mt-8">
              De 1 a 5, qual a sua nota para a mentoria?
            </SubSubTitle>
            <Rating onChange={handleRatingChange} />
            <Paragraph>
              Você escolheu a nota <span className="text-green">{rating}</span>.
            </Paragraph>
            <SubSubTitle className="mt-8">
              Escolha até 10 tags que melhor descrevem a mentoria.
            </SubSubTitle>
            {isLoadingTag ? (
              <div className="text-foreground flex w-full flex-row items-center gap-2">
                <Spinner size={20} className="animate-spin" />
                Carregando...
              </div>
            ) : (
              <div className="flex w-full flex-col">
                <Tags
                  maxTags={AVALIATION.MAX_TAGS}
                  availableTags={tag}
                  onTagSelect={handleTagSelect}
                />
                <Paragraph className="mt-10">
                  Você escolheu{" "}
                  <span className="text-green">{selectedTag.length || 0}</span>{" "}
                  de <span className="text-green">{AVALIATION.MAX_TAGS}</span>.
                </Paragraph>
              </div>
            )}
            <SubSubTitle className="mt-8">
              Deixe um comentário sobre a mentoria.
            </SubSubTitle>
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
            <Button type="submit" className="mt-20">
              Enviar
            </Button>
          </form>
        </Form>
      </Container>
    </>
  );
}
