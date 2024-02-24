"use client";
import { z } from "zod";
import { Star } from "@phosphor-icons/react";
import { Container } from "@/components/app/container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Paragraph } from "@/components/app/paragraph";
import { Header } from "@/components/containers/header";
import { SchemaAvaliation } from "@/schemas/schema-avaliation";
import { SubTitle } from "@/components/app/titles";

export default function Avaliation({ params }: { params: { id: string } }) {
  const form = useForm<z.infer<typeof SchemaAvaliation>>({
    resolver: zodResolver(SchemaAvaliation),
  });
  async function onSubmit() {}
  return (
    <>
      <Container>
        <Header />
        <SubTitle className="mb-8">
          De 1 a 5, qual a sua nota para a mentoria?
        </SubTitle>
        <div className="flex flex-row gap-2">
          <Star className="text-pink h-8 w-8 " />
          <Star className="text-pink h-8 w-8" />
          <Star className="text-pink h-8 w-8" />
          <Star className="text-pink h-8 w-8" />
          <Star className="text-pink h-8 w-8" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2">
            <Button type="submit" className="mt-20">
              Enviar
            </Button>
          </form>
        </Form>
      </Container>
    </>
  );
}
