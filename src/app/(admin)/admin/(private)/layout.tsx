import Nav from "@/components/containers/admin/shared/nav";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-dots flex h-screen">
      <Nav />
      <div className="ml-[240px] w-full">{children}</div>
    </div>
  );
}
