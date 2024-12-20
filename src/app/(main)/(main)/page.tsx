"use client";
import { Container } from "@/components/app/main/container";
import { Header } from "@/components/containers/main/header";
import { Book } from "@/components/containers/main/book";
import { Presentation } from "@/components/containers/main/presentation";
import { Why } from "@/components/containers/main/why";
import { Who } from "@/components/containers/main/who";
import { IsTrap } from "@/components/containers/main/is-trap";
import { Liked } from "@/components/containers/main/liked";
import { Testimonials } from "@/components/containers/main/testimonials";
import { MeImage } from "@/components/app/main/image";
import Statistics from "@/components/containers/main/statistics";

export default function MainPage() {
  return (
    <Container>
      <MeImage />
      <Header />
      <Presentation />
      <Book />
      <Statistics />
      <Testimonials />
      <Why />
      <Who />
      <IsTrap />
      <Liked />
    </Container>
  );
}
