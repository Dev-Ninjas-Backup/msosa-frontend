import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Columns,
  Activity,
  FileBarChart,
  Infinity as InfinityIcon,
} from "lucide-react";

import Loadable from "@/utils/Loadable";
import { AdminSkeleton } from "@/common/Skeleton/Admin/AdminSkeleton";
import ConsumerLayout from "@/Layout/ConsumerLayout/ConsumerLayout";

const Dashboard = Loadable(
  lazy(() => import("@/pages/Consumer/Dashboard/Dashboard")),
  AdminSkeleton
);
const Blueprint = Loadable(
  lazy(() => import("@/pages/Consumer/Blueprint/Blueprint")),
  AdminSkeleton
);
const Checkout = Loadable(
  lazy(() => import("@/pages/Consumer/Blueprint/Checkout")),
  AdminSkeleton
);
const ReflectionRoom = Loadable(
  lazy(() => import("@/pages/Consumer/ReflectionRoom/ReflectionRoom")),
  AdminSkeleton
);
const Report = Loadable(
  lazy(() => import("@/pages/Consumer/Report/Report")),
  AdminSkeleton
);
const ReportDetail = Loadable(
  lazy(() => import("@/pages/Consumer/Report/ReportDetail")),
  AdminSkeleton
);
const Continuum = Loadable(
  lazy(() => import("@/pages/Consumer/Continuum/Continuum")),
  AdminSkeleton
);
const Profile = Loadable(
  lazy(() => import("@/pages/Consumer/Profile/Profile")),
  AdminSkeleton
);

const ConsumerShell = () => <ConsumerLayout config={consumerRoutes} />;

export const consumerRoutes = [
  {
    path: "/consumer",
    element: (
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <ConsumerShell />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/consumer/dashboard" replace />,
      },
      {
        name: "Dashboard",
        path: "dashboard",
        icon: <LayoutDashboard />,
        element: <Dashboard />,
      },
      {
        name: "Blueprints",
        path: "blueprint",
        icon: <Columns />,
        element: <Blueprint />,
      },
      {
        // nested under blueprint — hidden from sidebar (no name)
        path: "blueprint/checkout",
        element: <Checkout />,
      },
      {
        name: "Reflection Room",
        path: "reflection-room",
        icon: <Activity />,
        element: <ReflectionRoom />,
      },
      {
        name: "Reports",
        path: "report",
        icon: <FileBarChart />,
        element: <Report />,
      },
      {
        path: "report/:reportId",
        element: <ReportDetail />,
      },
      {
        name: "Continuum",
        path: "continuum",
        icon: <InfinityIcon />,
        element: <Continuum />,
      },
      {
        // Profile via sidebar user card — not a primary nav item
        path: "profile",
        element: <Profile />,
      },
    ],
  },
];
