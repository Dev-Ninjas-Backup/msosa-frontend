import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Columns,
  LayoutGrid,
  BookOpen,
  Users2,
  FileBarChart,
  Sparkles,
  Link as LinkIcon,
  PieChart,
  CircleDollarSign,
} from "lucide-react";

import Loadable from "@/utils/Loadable";
import { AdminSkeleton } from "@/common/Skeleton/Admin/AdminSkeleton";
import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";

// Lazy-loaded Founder pages
const Dashboard = Loadable(
  lazy(() => import("@/pages/Founder/Dashboard/Dashboard")),
  AdminSkeleton
);
const CreateProduct = Loadable(
  lazy(() => import("@/pages/Founder/CreateProduct/CreateProduct")),
  AdminSkeleton
);
const WidgetLibrary = Loadable(
  lazy(() => import("@/pages/Founder/WidgetLibrary/WidgetLibrary")),
  AdminSkeleton
);
const ProtocolLibrary = Loadable(
  lazy(() => import("@/pages/Founder/ProtocolLibrary/ProtocolLibrary")),
  AdminSkeleton
);
const UserManagement = Loadable(
  lazy(() => import("@/pages/Founder/UserManagement/UserManagement")),
  AdminSkeleton
);
const Reports = Loadable(
  lazy(() => import("@/pages/Founder/Reports/Reports")),
  AdminSkeleton
);
const AIServices = Loadable(
  lazy(() => import("@/pages/Founder/AIServices/AIServices")),
  AdminSkeleton
);
const LinkCenter = Loadable(
  lazy(() => import("@/pages/Founder/LinkCenter/LinkCenter")),
  AdminSkeleton
);
const AnalyticsInsights = Loadable(
  lazy(() => import("@/pages/Founder/AnalyticsInsights/AnalyticsInsights")),
  AdminSkeleton
);
const FinancialCenter = Loadable(
  lazy(() => import("@/pages/Founder/FinancialCenter/FinancialCenter")),
  AdminSkeleton
);

const FounderDashboardLayout = () => <DashboardLayout config={founderRoutes} />;

export const founderRoutes = [
  {
    path: "/founder",
    element: (
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <FounderDashboardLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/founder/dashboard" replace />,
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
            icon: <Columns />,
            name: "Create Product™",
            path: "create-product",
            element: <CreateProduct />,
          },
          {
            icon: <LayoutGrid />,
            name: "Widget Library™",
            path: "widget-library",
            element: <WidgetLibrary />,
          },
          {
            icon: <BookOpen />,
            name: "Protocol Library™",
            path: "protocol-library",
            element: <ProtocolLibrary />,
          },
          {
            icon: <Users2 />,
            name: "User Management™",
            path: "user-management",
            element: <UserManagement />,
          },
        ],
      },
      {
        group: "Operate",
        items: [
          {
            icon: <FileBarChart />,
            name: "Reports™",
            path: "reports",
            element: <Reports />,
          },
          {
            icon: <Sparkles />,
            name: "AI Services™",
            path: "ai-services",
            element: <AIServices />,
          },
          {
            icon: <LinkIcon />,
            name: "Link Center™",
            path: "link-center",
            element: <LinkCenter />,
          },
          {
            icon: <PieChart />,
            name: "Analytics & Insights™",
            path: "analytics-insights",
            element: <AnalyticsInsights />,
          },
          {
            icon: <CircleDollarSign />,
            name: "Financial Center™",
            path: "financial-center",
            element: <FinancialCenter />,
          },
        ],
      },
    ],
  },
];
