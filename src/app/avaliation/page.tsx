"use client";
import { useEffect, useState } from "react";
import { SubTitle, Title } from "@/components/Titles";
import { Container } from "@/components/Container";
import { ButtonFooter } from "@/components/Button";
import { HeaderImage } from "@/components/Image";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Diocodes from "@/assets/diocodes";
import { Heart, FileCode } from "@phosphor-icons/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type TypeAvaliation = {
  attendees: string;
  startTime: Date;
  endTime: Date;
  email: string;
};

const FormSchema = z.object({
  attendees: z.string(),
  email: z.string().email(),
});

export default function Home() {
  const [avaliations, setAvaliations] = useState(Array<TypeAvaliation>);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("passou");
    console.log(data);
  }
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const request = await fetch("/api/avaliation");
      const bookings = await request.json();
      setAvaliations(bookings);
      setIsLoading(false);
    })();
  }, []);
  return (
    <>
      <main>
        <Container>
          <HeaderImage>
            <Diocodes />
          </HeaderImage>
          <Title className="md:max-w-[80%] lg:max-w-[50%]">
            Enviar avaliação da{" "}
            <span className="text-green text-4xl md:text-7xl">Mentoria</span>
          </Title>
          <SubTitle>
            Selecione qual a mentoria deseja enviar a avaliação:
          </SubTitle>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoading && (
                          <SelectItem value="null">Loading...</SelectItem>
                        )}
                        {avaliations.map((avaliation) => (
                          <SelectItem
                            key={avaliation.email}
                            value={avaliation.email}
                          >
                            {avaliation.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage email addresses in your{" "}
                      <Link href="/examples/forms">email settings</Link>.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </Container>
      </main>
      <Footer>
        <div>
          <Link href="https://github.com/diogocezar/diocodes" target="_blank">
            <ButtonFooter className="flex flex-row justify-center gap-2">
              <FileCode size={20} />
              Acessar código fonte!
            </ButtonFooter>
          </Link>
        </div>
        <div>
          <p className="text-background m-0 flex flex-row items-center justify-center gap-2 font-semibold">
            Feito com{" "}
            <Heart
              weight="fill"
              className="text-pink animate-pulse"
              size={20}
            />
            ️por
            <a
              href="https://diogocezar.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Diogo Cezar
            </a>
          </p>
        </div>
      </Footer>
    </>
  );
}
