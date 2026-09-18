import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  History,
  UserCog,
} from "lucide-react";

import Loadable from "@/utils/Loadable";
import { AdminSkeleton } from "@/common/Skeleton/Admin/AdminSkeleton";
import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";

const Dashboard = Loadable(
  lazy(() => import("@/pages/Refiner/Dashboard/Dashboard")),
  AdminSkeleton
);
const ReviewQueue = Loadable(
  lazy(() => import("@/pages/Refiner/ReviewQueue/ReviewQueue")),
  AdminSkeleton
);
const ReportReview = Loadable(
  lazy(() => import("@/pages/Refiner/ReviewQueue/ReportReview")),
  AdminSkeleton
);
const ReviewHistory = Loadable(
  lazy(() => import("@/pages/Refiner/ReviewHistory/ReviewHistory")),
  AdminSkeleton
);
const ProfileSettings = Loadable(
  lazy(() => import("@/pages/Refiner/ProfileSettings/ProfileSettings")),
  AdminSkeleton
);

const RefinerDashboardLayout = () => (
  <DashboardLayout config={refinerRoutes} />
);

export const refinerRoutes = [
  {
    path: "/refiner",
    element: (
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <RefinerDashboardLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/refiner/dashboard" replace />,
      },
      {
        name: "Dashboard",
        path: "dashboard",
        icon: <LayoutDashboard />,
        element: <Dashboard />,
      },
      {
        name: "Review Queue",
        path: "review-queue",
        icon: <ListChecks />,
        element: <ReviewQueue />,
      },
      {
        path: "review-queue/:reportId",
        element: <ReportReview />,
      },
      {
        name: "Review History",
        path: "review-history",
        icon: <History />,
        element: <ReviewHistory />,
      },
      {
        name: "Profile & Settings",
        path: "profile-settings",
        icon: <UserCog />,
        element: <ProfileSettings />,
      },
    ],
  },
];
