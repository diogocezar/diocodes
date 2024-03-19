import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTestimonials() {
  return (
    <div className="mb-10 w-full sm:mb-2">
      <div className="bg-card m-1 flex h-[220px] flex-col justify-center gap-2 p-6">
        <div className="flex w-full flex-col items-start justify-center">
          <Skeleton className="h-6 w-3/6" />
          <Skeleton className="mt-2 h-6 w-3/4" />
        </div>
        <Skeleton className="mt-14 h-4 w-[180px]" />
      </div>
    </div>
  );
}
