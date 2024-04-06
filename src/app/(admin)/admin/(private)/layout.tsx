import Container from "@/components/containers/admin/shared/container";
import Nav from "@/components/containers/admin/shared/nav";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-dots flex">
      <Nav />
      <Container>{children}</Container>
    </div>
  );
}
