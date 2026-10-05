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
import { MemberPortalProvider } from "@/pages/shared/member/MemberPortalContext";

/** Same page modules as consumer — shared UI via MemberPortal basePath */
const Dashboard = Loadable(
  lazy(() => import("@/pages/Employee/Dashboard/Dashboard")),
  AdminSkeleton
);
const CustomerProducts = Loadable(
  lazy(() => import("@/pages/Consumer/CustomerProducts/CustomerProducts")),
  AdminSkeleton
);
const Checkout = Loadable(
  lazy(() => import("@/pages/Consumer/Checkout")),
  AdminSkeleton
);
const CheckoutSuccess = Loadable(
  lazy(() => import("@/pages/Consumer/CheckoutSuccess")),
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
const Notifications = Loadable(
  lazy(() => import("@/pages/Consumer/Notifications/Notifications")),
  AdminSkeleton
);

const EmployeeShell = () => (
  <MemberPortalProvider role="employee">
    <ConsumerLayout config={employeeRoutes} />
  </MemberPortalProvider>
);

export const employeeRoutes = [
  {
    path: "/employee",
    element: (
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <EmployeeShell />
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
        name: "Consumer Products",
        path: "customer-products",
        icon: <Columns />,
        element: <CustomerProducts />,
      },
      {
        path: "blueprint",
        element: <Navigate to="/employee/customer-products" replace />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "checkout/success",
        element: <CheckoutSuccess />,
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
        path: "profile",
        element: <Profile />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
];
