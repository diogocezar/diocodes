"use client";

import { useOpenedState } from "@/hooks/use-opened-state";

export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setIsOpened = useOpenedState((state) => state.setIsOpened);
  const isOpened = useOpenedState((state) => state.isOpened);
  return (
    <div style={{ marginLeft: isOpened ? 240 : 72 }} className="w-full">
      {children}
    </div>
  );
}
