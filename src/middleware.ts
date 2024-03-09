export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin/avaliation/:path*",
    "/admin/dashboard/:path*",
    "/admin/invite/:path*",
    "/admin/mentoring/:path*",
    "/admin/person/:path*",
    "/admin/tag/:path*",
    "/admin/user/:path*",
    "/api/admin/:path*",
    "/api/cron/:path*",
  ],
};
