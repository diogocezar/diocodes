import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonDahboardTile() {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md">
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="size-[70px]" />
    </div>
  );
}
