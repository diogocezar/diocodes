import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonDahboardGraph() {
  return (
    <div className="bg-card text-card-foreground col-span-4 rounded-lg p-6 shadow-md">
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="h-[350px] w-[100%]" />
    </div>
  );
}
