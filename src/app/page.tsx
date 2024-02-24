"use client";
import { Container } from "@/components/app/container";
import { Header } from "@/components/containers/header";
import { Book } from "@/components/containers/book";
import { Presentation } from "@/components/containers/presentation";
import { WhoBooked } from "@/components/containers/who-booked";
import { Why } from "@/components/containers/why";
import { Who } from "@/components/containers/who";
import { IsTrap } from "@/components/containers/is-trap";
import { Liked } from "@/components/containers/liked";

export default function Home() {
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
