"use client";
import { Container } from "@/components/app/container";
import { Header } from "@/components/containers/main/header";
import { Book } from "@/components/containers/main/book";
import { Presentation } from "@/components/containers/main/presentation";
import { WhoBooked } from "@/components/containers/main/who-booked";
import { Why } from "@/components/containers/main/why";
import { Who } from "@/components/containers/main/who";
import { IsTrap } from "@/components/containers/main/is-trap";
import { Liked } from "@/components/containers/main/liked";

export default function HomePage() {
  return (
    <>
      <Container>
        <Header />
        <Presentation />
        <Book />
        <WhoBooked />
        <Why />
        <Who />
        <IsTrap />
        <Liked />
      </Container>
    </>
  );
}
