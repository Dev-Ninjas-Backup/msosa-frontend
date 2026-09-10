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
import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";

// Lazy-loaded Employee pages
const Dashboard = Loadable(
  lazy(() => import("@/pages/Employee/Dashboard/Dashboard")),
  AdminSkeleton
);
const Blueprint = Loadable(
  lazy(() => import("@/pages/Employee/Blueprint/Blueprint")),
  AdminSkeleton
);
const ReflectionRoom = Loadable(
  lazy(() => import("@/pages/Employee/ReflectionRoom/ReflectionRoom")),
  AdminSkeleton
);
const Report = Loadable(
  lazy(() => import("@/pages/Employee/Report/Report")),
  AdminSkeleton
);
const Continuum = Loadable(
  lazy(() => import("@/pages/Employee/Continuum/Continuum")),
  AdminSkeleton
);

const EmployeeDashboardLayout = () => <DashboardLayout config={employeeRoutes} />;

export const employeeRoutes = [
  {
    path: "/employee",
    element: (
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <EmployeeDashboardLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/employee/dashboard" replace />,
      },
      {
        name: "Dashboard",
        path: "dashboard",
        icon: <LayoutDashboard />,
        element: <Dashboard />,
      },
      {
        name: "Blueprint",
        path: "blueprint",
        icon: <Columns />,
        element: <Blueprint />,
      },
      {
        name: "Reflection Room",
        path: "reflection-room",
        icon: <Activity />,
        element: <ReflectionRoom />,
      },
      {
        name: "Report",
        path: "report",
        icon: <FileBarChart />,
        element: <Report />,
      },
      {
        name: "Continuum",
        path: "continuum",
        icon: <InfinityIcon />,
        element: <Continuum />,
      },
    ],
  },
];
