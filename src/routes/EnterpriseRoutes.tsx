import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserCheck,
  BookOpen,
  Share2,
  Network,
  FileSpreadsheet,
  Settings,
  Receipt,
} from "lucide-react";

import Loadable from "@/utils/Loadable";
import { AdminSkeleton } from "@/common/Skeleton/Admin/AdminSkeleton";
import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";

// Lazy-loaded Enterprise pages
const Dashboard = Loadable(
  lazy(() => import("@/pages/Enterprise/Dashboard/Dashboard")),
  AdminSkeleton
);
const EmployeeManagement = Loadable(
  lazy(() => import("@/pages/Enterprise/EmployeeManagement/EmployeeManagement")),
  AdminSkeleton
);
const EmployeeDetail = Loadable(
  lazy(() => import("@/pages/Enterprise/EmployeeManagement/EmployeeDetail")),
  AdminSkeleton
);
const BlueprintManagement = Loadable(
  lazy(() => import("@/pages/Enterprise/BlueprintManagement/BlueprintManagement")),
  AdminSkeleton
);
const BlueprintDetail = Loadable(
  lazy(() => import("@/pages/Enterprise/BlueprintManagement/BlueprintDetail")),
  AdminSkeleton
);
const InvitationManagement = Loadable(
  lazy(() => import("@/pages/Enterprise/InvitationManagement/InvitationManagement")),
  AdminSkeleton
);
const InvitationDetail = Loadable(
  lazy(() => import("@/pages/Enterprise/InvitationManagement/InvitationDetail")),
  AdminSkeleton
);
const ParticipationMonitoring = Loadable(
  lazy(() => import("@/pages/Enterprise/ParticipationMonitoring/ParticipationMonitoring")),
  AdminSkeleton
);
const Reports = Loadable(
  lazy(() => import("@/pages/Enterprise/Reports/Reports")),
  AdminSkeleton
);
const ReportDetail = Loadable(
  lazy(() => import("@/pages/Enterprise/Reports/ReportDetail")),
  AdminSkeleton
);
const QCV = Loadable(
  lazy(() => import("@/pages/Enterprise/QCV/QCV")),
  AdminSkeleton
);
const Billing = Loadable(
  lazy(() => import("@/pages/Enterprise/Billing/Billing")),
  AdminSkeleton
);

const EnterpriseDashboardLayout = () => <DashboardLayout config={enterpriseRoutes} />;

export const enterpriseRoutes = [
  {
    path: "/enterprise",
    element: (
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <EnterpriseDashboardLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/enterprise/dashboard" replace />,
      },
      {
        name: "Dashboard™",
        path: "dashboard",
        icon: <LayoutDashboard />,
        element: <Dashboard />,
      },
      {
        group: "Manage",
        items: [
          {
            icon: <UserCheck />,
            name: "Employee Management",
            path: "employee-management",
            element: <EmployeeManagement />,
          },
          {
            path: "employee-management/:employeeId",
            element: <EmployeeDetail />,
          },
          {
            icon: <BookOpen />,
            name: "Enterprise Management",
            path: "blueprint-management",
            element: <BlueprintManagement />,
          },
          {
            path: "blueprint-management/:blueprintId",
            element: <BlueprintDetail />,
          },
          {
            icon: <Share2 />,
            name: "Invitation Management",
            path: "invitation-management",
            element: <InvitationManagement />,
          },
          {
            path: "invitation-management/:invitationId",
            element: <InvitationDetail />,
          },
          {
            icon: <Network />,
            name: "Participation Monitoring",
            path: "participation-monitoring",
            element: <ParticipationMonitoring />,
          },
        ],
      },
      {
        group: "Operate",
        items: [
          {
            icon: <FileSpreadsheet />,
            name: "Reports™",
            path: "reports",
            element: <Reports />,
          },
          {
            path: "reports/:reportId",
            element: <ReportDetail />,
          },
          {
            icon: <Settings />,
            name: "QCV™",
            path: "qcv",
            element: <QCV />,
          },
          {
            icon: <Receipt />,
            name: "Billing™",
            path: "billing",
            element: <Billing />,
          },
        ],
      },
    ],
  },
];
