import React from "react";
import { SubSubTitle, SubTitle } from "@/components/app/main/titles";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetComment } from "@/hooks/use-get-comment";
import { capitalizeString, compactName } from "@/lib/utils";
import SkeletonTestimonials from "@/components/skeletons/skeleton-testimonials";
import { ChatSquare } from "solar-icon-set";
import { Box } from "@/components/app/main/box";

const Testimonials = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true, jumps: true }),
  );
  const { comment, isLoadingComment } = useGetComment();
  return (
    <>
      <SubSubTitle>Depoimentos</SubSubTitle>
      <SubTitle>O que o pessoal tem falado?</SubTitle>
      <Box>
        {isLoadingComment ? (
          <SkeletonTestimonials />
        ) : (
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="mb-10 sm:mb-2">
              {comment?.map((item, index) => (
                <CarouselItem key={index} className="">
                  <Card className="rounded-none bg-transparent shadow-none">
                    <CardContent className="flex h-[200px] items-center justify-center rounded-none p-0">
                      <span className="line-clamp-5 overflow-ellipsis text-[16px] font-normal md:text-lg lg:text-xl text-background-dark">
                        {'"'}
                        {item?.comment}
                        {'"'}
                      </span>
                    </CardContent>
                    <CardFooter className="font-poppins text-background-dark text-[16px] font-bold capitalize md:text-lg lg:text-xl p-0">
                      <ChatSquare className="mt-2 mr-2" size={24} />
                      {compactName(
                        capitalizeString(item?.mentoring?.attendee?.name),
                      )}
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </Box>
    </>
  );
});

Testimonials.displayName = "Testimonials";

export { Testimonials };
