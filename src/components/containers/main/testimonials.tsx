import React from "react";
import { SubSubTitle } from "@/components/app/main/titles";
import { Paragraph } from "@/components/app/main/paragraph";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetAvaliation } from "@/hooks/use-get-avaliation";
import { capitalizeString } from "@/lib/utils";
import SkeletonTestimonials from "@/components/skeletons/skeleton-testimonials";

const Testimonials = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true, jumps: true }),
  );
  const { avaliation, isLoadingAvaliation } = useGetAvaliation();
  return (
    <>
      <SubSubTitle>Depoimentos</SubSubTitle>
      <Paragraph>
        Veja os depoimentos de quem já fez a mentoria e o que eles acharam.
      </Paragraph>
      {isLoadingAvaliation ? (
        <SkeletonTestimonials />
      ) : (
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="mb-10 sm:mb-2">
            {avaliation?.map((item, index) => (
              <CarouselItem key={index} className="">
                <div className="p-1">
                  <Card className="rounded-none">
                    <CardContent className="flex h-[200px] items-center justify-center rounded-none p-6">
                      <span className="text-xl font-semibold">
                        {item.comment}
                      </span>
                    </CardContent>
                    <CardFooter className="font-poppins text-green font-bold capitalize">
                      {capitalizeString(item.mentoring.attendee.name)}
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </>
  );
});

Testimonials.displayName = "Testimonials";

export { Testimonials };
