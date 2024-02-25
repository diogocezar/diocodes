"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Spinner } from "@phosphor-icons/react";
import { Container } from "@/components/app/container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Paragraph } from "@/components/app/paragraph";
import { Header } from "@/components/containers/header";
import { TypeAvaliation } from "@/types/type-avaliation";
import { SchemaAvaliation } from "@/schemas/schema-avaliation";
import { toast } from "sonner";

export default function AdminAvaliation() {
  const [avaliations, setAvaliations] = useState(Array<TypeAvaliation>);
  const [isLoadingSelect, setIsLoadingSelect] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const form = useForm<z.infer<typeof SchemaAvaliation>>({
    resolver: zodResolver(SchemaAvaliation),
  });
  async function onSubmit(data: z.infer<typeof SchemaAvaliation>) {
    setIsLoadingForm(true);
    try {
      const avaliation = avaliations.find(
        (avaliation) => avaliation.id === parseInt(data.attendee),
      );
      await fetch("/api/avaliation/send", {
        method: "POST",
        body: JSON.stringify(avaliation),
      });
      await fetch("/api/avaliation/save", {
        method: "POST",
        body: JSON.stringify(avaliation),
      });
      toast("O e-mail foi enviado e a avaliação salva com sucesso!");
    } catch (error) {
      console.error(error);
      toast("Houve um erro ao enviar o email ou salvar a avaliação.");
    } finally {
      setIsLoadingForm(false);
    }
  }
  useEffect(() => {
    (async function () {
      setIsLoadingSelect(true);
      const request = await fetch("/api/avaliation/get");
      const avaliations = await request.json();
      setAvaliations(avaliations);
      setIsLoadingSelect(false);
    })();
  }, []);
  return (
    <>
      <Container>
        <Header />
        <Paragraph className="mb-8">
          Utilize o formulário abaixo para enviar a avaliação para os
          participantes que já realizaram a mentoria.
        </Paragraph>
        {isLoadingSelect ? (
          <Paragraph className="mb-8 flex flex-row gap-2">
            <Spinner size={20} className="animate-spin" />
            Carregando...
          </Paragraph>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2">
              <FormField
                control={form.control}
                name="attendee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Escolha uma pessoa</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger disabled={isLoadingForm}>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {avaliations.map((avaliation) => (
                          <SelectItem
                            key={avaliation.id}
                            value={avaliation.id.toString()}
                          >
                            {avaliation?.attendee.toUpperCase()} -{" "}
                            {new Date(avaliation.startTime).toLocaleString(
                              "pt-BR",
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-20" disabled={isLoadingForm}>
                {isLoadingForm ? (
                  <div className="flex flex-row gap-2">
                    <Spinner size={20} className="animate-spin" /> Aguarde...
                  </div>
                ) : (
                  "Enviar"
                )}
              </Button>
            </form>
          </Form>
        )}
      </Container>
    </>
  );
}
