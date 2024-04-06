import MentoringDone from "@/components/containers/admin/dashboard/mentoring/mentoring-done";
import { Suspense } from "react";
import SkeletonDahboardTile from "@/components/skeletons/skeleton-dashboard-tile";
import MentoringToBe from "@/components/containers/admin/dashboard/mentoring/mentoring-to-be";
import MentoringTotal from "@/components/containers/admin/dashboard/mentoring/mentoring-total";
import AvaliationTotal from "@/components/containers/admin/dashboard/avaliation/avaliation-total";
import InviteSent from "@/components/containers/admin/dashboard/invite/invite-sent";
import TagTotal from "@/components/containers/admin/dashboard/tag/tag-total";
import PersonTotal from "@/components/containers/admin/dashboard/person/person-total";
import AvaliationAverage from "@/components/containers/admin/dashboard/avaliation/avaliation-average";
import AvaliationByMonth from "@/components/containers/admin/dashboard/graph/avaliation-by-month";
import MentoringNext from "@/components/containers/admin/dashboard/mentoring/mentoring-next";
import SkeletonDahboardGraph from "@/components/skeletons/skeleton-dashboard-graph";
import SkeletonDahboardList from "@/components/skeletons/skeleton-dashboard-list";
import PageCommon from "@/components/containers/admin/shared/page-common";
import MentoringCanceled from "@/components/containers/admin/dashboard/mentoring/mentoring-canceled";
import MentoringPro from "@/components/containers/admin/dashboard/mentoring/mentoring-pro";
import MentoringFree from "@/components/containers/admin/dashboard/mentoring/mentoring-free";
import MentoringReceived from "@/components/containers/admin/dashboard/mentoring/mentoring-received";
import Calendar from "@/components/containers/admin/calendar/calendar";
import { DashboardTitle } from "@/components/app/admin/titles";

export default async function AdminDashboardPage() {
  return (
    <PageCommon>
      <div className="p-6">
        <DashboardTitle className="mb-4">Estatísticas</DashboardTitle>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={<SkeletonDahboardTile />}>
            <MentoringDone />
          </Suspense>
          <Suspense fallback={<SkeletonDahboardTile />}>
            <MentoringToBe />
          </Suspense>
          <Suspense fallback={<SkeletonDahboardTile />}>
            <MentoringCanceled />
          </Suspense>
          <Suspense fallback={<SkeletonDahboardTile />}>
            <MentoringTotal />
          </Suspense>
          <Suspense fallback={<SkeletonDahboardTile />}>
            <MentoringPro />
          </Suspense>
          <Suspense fallback={<SkeletonDahboardTile />}>
            <MentoringFree />
          </Suspense>
          <Suspense fallback={<SkeletonDahboardTile />}>
            <MentoringReceived />
          </Suspense>
          <Suspense fallback={<SkeletonDahboardTile />}>
            <AvaliationTotal />
          </Suspense>
          <Suspense fallback={<SkeletonDahboardTile />}>
            <InviteSent />
          </Suspense>
          <Suspense fallback={<SkeletonDahboardTile />}>
            <TagTotal />
          </Suspense>
          <Suspense fallback={<SkeletonDahboardTile />}>
            <PersonTotal />
          </Suspense>
          <Suspense fallback={<SkeletonDahboardTile />}>
            <AvaliationAverage />
          </Suspense>
        </div>
        <DashboardTitle className="mt-10 mb-4">Calendário</DashboardTitle>
        <Calendar />
        <DashboardTitle className="mt-10 mb-4">Análises</DashboardTitle>
        <div className="grid gap-4 md:grid-cols-7">
          <Suspense fallback={<SkeletonDahboardGraph />}>
            <AvaliationByMonth />
          </Suspense>
          <Suspense fallback={<SkeletonDahboardList />}>
            <MentoringNext />
          </Suspense>
        </div>
      </div>
    </PageCommon>
  );
}
