"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Footer } from "@/components/containers/footer";
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

export default function Home() {
  const [avaliations, setAvaliations] = useState(Array<TypeAvaliation>);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof SchemaAvaliation>>({
    resolver: zodResolver(SchemaAvaliation),
  });
  async function onSubmit(data: z.infer<typeof SchemaAvaliation>) {
    const avaliation = avaliations.find(
      (avaliation) => avaliation.id === parseInt(data.attendee),
    );
    const request = await fetch("/api/send-avaliation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avaliation),
    });
    const response = await request.json();
    console.log(response);
  }
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const request = await fetch("/api/avaliation");
      const avaliations = await request.json();
      setAvaliations(avaliations);
      setIsLoading(false);
    })();
  }, []);
  return (
    <>
      <Container>
        <Header />
        <Paragraph className="mb-8">
          É possível enviar um e-mail para as pessoas que já conversaram!
        </Paragraph>
        {isLoading ? (
          <Paragraph className="mb-8 flex flex-row gap-2">
            <Spinner size={20} className="animate-spin" />
            Carregando...
          </Paragraph>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-1/2 space-y-6"
            >
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
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {avaliations.map((avaliation) => (
                          <SelectItem
                            key={avaliation.id}
                            value={avaliation.id.toString()}
                          >
                            {avaliation.attendees.toUpperCase()} -{" "}
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
              <Button type="submit" className="mt-16">
                Enviar
              </Button>
            </form>
          </Form>
        )}
      </Container>
    </>
  );
}
