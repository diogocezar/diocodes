import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonDahboardList() {
  return (
    <div className="bg-card text-card-foreground col-span-3 rounded-lg p-6 shadow-md">
      <Skeleton className="mb-4 h-4 w-full" />
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <div key={index} className="mb-2 flex flex-row gap-4">
          <Skeleton className="size-[50px]" />
          <div className="flex-1">
            <Skeleton className="mb-2 h-2 w-1/4" />
            <Skeleton className="mb-2 h-2 w-1/3" />
            <Skeleton className="h-2 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
