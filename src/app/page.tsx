"use client";
import { Container } from "@/components/app/Container";
import { Footer } from "@/components/containers/Footer";
import { Header } from "@/components/containers/Header";
import { Book } from "@/components/containers/Book";
import { Presentation } from "@/components/containers/Presentation";
import { WhoBooked } from "@/components/containers/WhoBooked";
import { Why } from "@/components/containers/Why";
import { Who } from "@/components/containers/Who";
import { IsTrap } from "@/components/containers/IsTrap";
import { Liked } from "@/components/containers/Liked";

export default function Home() {
  return (
    <>
      <main>
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
      </main>
      <Footer />
    </>
  );
}
