import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonDahboardList() {
  return (
    <div className="bg-card text-card-foreground col-span-3 rounded-lg p-6 shadow-md">
      <Skeleton className="mb-4 h-4 w-full" />
      <div className="flex flex-row gap-4">
        <Skeleton className="size-[70px]" />
        <Skeleton className="mb-4 h-4 w-full" />
      </div>
    </div>
  );
}
