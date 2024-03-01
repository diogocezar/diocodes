"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function CustomQueryProvider({
  children,
}: {
  children: React.ReactNode;
  session: any;
}): React.ReactNode {
  const [client] = useState(new QueryClient());
  return (
    <>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    </>
  );
}
