import { AdminTitle } from "@/components/containers/admin/shared/admin-title";
import MentoringDone from "@/components/containers/admin/dashboard/mentoring/mentoring-done";
import { Suspense } from "react";
import { ChartBar } from "@phosphor-icons/react/dist/ssr";
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

export default async function AdminDashboardPage() {
  return (
    <>
      <div className="flex-1 p-8 pt-6">
        <AdminTitle title="Dashboard" Icon={<ChartBar />} />
        <div className="mt-8 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Suspense fallback={<SkeletonDahboardTile />}>
              <MentoringDone />
            </Suspense>
            <Suspense fallback={<SkeletonDahboardTile />}>
              <MentoringToBe />
            </Suspense>
            <Suspense fallback={<SkeletonDahboardTile />}>
              <MentoringTotal />
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Suspense fallback={<SkeletonDahboardTile />}>
              <AvaliationByMonth />
            </Suspense>
            <Suspense fallback={<SkeletonDahboardTile />}>
              <MentoringNext />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
