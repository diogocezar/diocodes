import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tag } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SchemaTag } from "@/schemas/schema-tag";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";

type TagFormProps = {
  defaultValues?: z.infer<typeof SchemaTag>;
};

export default function TagForm({ defaultValues }: TagFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof SchemaTag>>({
    resolver: zodResolver(SchemaTag),
    defaultValues: defaultValues || {
      name: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof SchemaTag>) => {
    try {
      setIsLoading(true);
      await api.post("/admin/avaliation/tag", data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="flex flex-row gap-2 rounded-lg">
          <Tag className="h-5 w-5" /> Criar Tag
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-center">
        <SheetHeader>
          <SheetTitle className="flex flex-row gap-2 rounded-lg">
            <Tag className="h-5 w-5" /> Criar nova tag
          </SheetTitle>
        </SheetHeader>
        <div className="flex w-full flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da tag" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
