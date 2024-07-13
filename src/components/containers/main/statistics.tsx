import { Box } from "@/components/app/main/box";
import { SubSubTitle } from "@/components/app/main/titles";
import React from "react";
import { useGetStatistics } from "@/hooks/use-get-statistics";
import SkeletonStatistics from "@/components/skeletons/skeleton-statistics";
import { Star } from "@phosphor-icons/react/dist/ssr";

type StatisticsBoxProps = {
  title: React.ReactElement;
  value: any;
};

const StatisticsBox = ({ title, value }: StatisticsBoxProps) => {
  return (
    <Box className="w-[45%] lg:w-[23%]">
      <h3 className="font-poppins mb-3 mt-0 text-lg font-black md:mb-6 md:text-xl lg:text-1xl xl:text-2xl 2xl:text-3xl tracking-tighter">
        {title}
      </h3>
      <span className="text-5xl font-black">{value}</span>
    </Box>
  );
};

const StatisticsBoxAvaliation = ({ title, value }: StatisticsBoxProps) => {
  return (
    <Box className="w-[45%] lg:w-[23%]">
      <h3 className="font-poppins mb-3 mt-0 text-lg font-black md:mb-6 md:text-xl lg:text-1xl xl:text-2xl 2xl:text-3xl tracking-tighter">
        {title}
      </h3>
      <div className="mt-2 flex flex-row gap-1 text-3xl">
        {[1, 2, 3, 4, 5].map((index) =>
          index <= Math.round(value) ? (
            <Star key={index} weight="fill" />
          ) : (
            <Star key={index} className="opacity-20" />
          ),
        )}
      </div>
    </Box>
  );
};

export default function Statistics() {
  const { statistics, isLoadingStatistics } = useGetStatistics();
  return (
    <>
      <SubSubTitle>Estatísticas para Nerds</SubSubTitle>
      {isLoadingStatistics ? (
        <SkeletonStatistics />
      ) : (
        <div className="flex w-full flex-row flex-wrap justify-between gap-y-8">
          <StatisticsBox
            title={
              <div>
                Mentorias <br /> Realizadas
              </div>
            }
            value={statistics.totalMentoring}
          />
          <StatisticsBox
            title={
              <div>
                Mentorias <br /> Agendadas
              </div>
            }
            value={statistics.mentoringToBe}
          />
          <StatisticsBox
            title={
              <div>
                Mentorias <br /> PRO
              </div>
            }
            value={statistics.totalPro}
          />
          <StatisticsBoxAvaliation
            title={
              <div>
                Média de
                <br />
                Avaliações
              </div>
            }
            value={statistics.avgAvaliation}
          />
        </div>
      )}
    </>
  );
}
