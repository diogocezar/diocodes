import Nav from "@/components/containers/admin/shared/nav";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-dots flex min-h-[100vh]">
      <Nav />
      {children}
    </div>
  );
}
