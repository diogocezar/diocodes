import {
  dashboardAvaliationsByMonth,
  dashboardCountAvaliation,
  dashboardCountAvaliationAvg,
  dashboardCountInvite,
  dashboardCountMentoringDone,
  dashboardCountMentoringToBe,
  dashboardCountPerson,
  dashboardCountTag,
  dashboardGetRecentMentoring,
} from "@/database/dashboard";
import { TypeDashboard } from "@/types/type-dashboard";

export const GET = async () => {
  try {
    const mentoringDone = await dashboardCountMentoringDone();
    const mentoringToBe = await dashboardCountMentoringToBe();
    const avaliation = await dashboardCountAvaliation();
    const avaliationAvarage = await dashboardCountAvaliationAvg();
    const invite = await dashboardCountInvite();
    const tag = await dashboardCountTag();
    const person = await dashboardCountPerson();
    const graph = await dashboardAvaliationsByMonth();
    const recentMentoring = await dashboardGetRecentMentoring();
    const result: TypeDashboard = {
      mentoringDone,
      mentoringToBe,
      mentoring: mentoringDone + mentoringToBe,
      avaliation,
      avaliationAvarage,
      invite,
      tag,
      person,
      graph,
      recentMentoring,
    };
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
