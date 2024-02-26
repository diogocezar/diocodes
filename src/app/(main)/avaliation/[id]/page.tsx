"use client";
import { z } from "zod";
import { Container } from "@/components/app/container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SchemaAvaliation } from "@/schemas/schema-avaliation";
import { SubTitle } from "@/components/app/titles";
import Rating from "@/components/app/rating";
import { useState } from "react";
import { Paragraph } from "@/components/app/paragraph";

export default function AvaliationPage({ params }: { params: { id: string } }) {
  const [rating, setRating] = useState<number>(1);
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const form = useForm<z.infer<typeof SchemaAvaliation>>({
    resolver: zodResolver(SchemaAvaliation),
  });
  console.log(params.id);
  async function onSubmit() {}
  return (
    <>
      <Container>
        <SubTitle className="mb-8">
          De 1 a 5, qual a sua nota para a mentoria?
        </SubTitle>
        <Rating onChange={handleRatingChange} />
        <Paragraph>Você escolheu a nota {rating}</Paragraph>
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
