import { Skeleton } from "@/components/ui/skeleton";
import { Box } from "../app/main/box";

export default function SkeletonStatistics() {
  return (
    <div className="flex w-full flex-row flex-wrap justify-between gap-y-8">
      {[1, 2, 3, 4].map((_, index) => (
        <Box key={index} className="w-[45%] lg:w-[23%]">
          <Skeleton className="bg-pink-primary h-6 w-3/6" />
          <Skeleton className="bg-pink-primary mt-3 h-10 w-10" />
        </Box>
      ))}
    </div>
  );
}
