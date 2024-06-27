import { Box } from "@/components/app/main/box";
import { SubSubTitle } from "@/components/app/main/titles";
import React, { Suspense } from "react";
import SkeletonDahboardTile from "@/components/skeletons/skeleton-dashboard-tile";
import { useGetStatistics } from "@/hooks/use-get-statistics";
import SkeletonStatistics from "@/components/skeletons/skeleton-statistics";

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
                Mentorias <br /> Relizadas
              </div>
            }
            value={statistics.totalDoneMentoring}
          />
          <StatisticsBox
            title={
              <div>
                Média de
                <br />
                Avaliações
              </div>
            }
            value={statistics.avgAvaliation}
          />
          <StatisticsBox
            title={
              <div>
                Total de
                <br />
                Mentorias
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
        </div>
      )}
    </>
  );
}
