import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonWhoBooked() {
  return (
    <div className="mb-8 flex w-full flex-row flex-wrap">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
        <div
          key={index}
          className="w-full space-y-4 md:w-[50%] lg:w-[33.3%] xl:w-[25%]"
        >
          <div className="bg-card m-2 gap-2 p-6">
            <Skeleton className="mb-4 h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[180px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
