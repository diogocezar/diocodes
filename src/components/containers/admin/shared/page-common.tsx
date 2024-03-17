export default function PageCommon({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex h-full flex-col">{children}</div>;
}
