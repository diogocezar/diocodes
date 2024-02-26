import Link from "next/link";

import { cn } from "@/lib/utils";

export function AdminNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin/dashboard"
        className="hover:text-primary text-primary text-sm font-bold transition-colors"
      >
        Dashboard
      </Link>
      <Link
        href="/admin/avaliations"
        className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
      >
        Avaliações
      </Link>
      <Link
        href="/admin/bookings"
        className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
      >
        Reservas
      </Link>
    </nav>
  );
}
