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
import NotFound from "@/pages/NotFound";

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
const WidgetForm = Loadable(
  lazy(() => import("@/pages/Founder/WidgetLibrary/WidgetForm")),
  AdminSkeleton
);
const WidgetDetails = Loadable(
  lazy(() => import("@/pages/Founder/WidgetLibrary/WidgetDetails")),
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
const UserProfile = Loadable(
  lazy(() => import("@/pages/Founder/UserManagement/UserProfile/UserProfile")),
  AdminSkeleton
);
const Reports = Loadable(
  lazy(() => import("@/pages/Founder/Reports/Reports")),
  AdminSkeleton
);
const ReportTemplates = Loadable(
  lazy(() => import("@/pages/Founder/Reports/ReportTemplates")),
  AdminSkeleton
);
const AIServices = Loadable(
  lazy(() => import("@/pages/Founder/AIServices/AIServices")),
  AdminSkeleton
);
const CreateNewPrompt = Loadable(
  lazy(() => import("@/pages/Founder/AIServices/component/CreateNewPrompt")),
  AdminSkeleton
);
const LinkCenter = Loadable(
  lazy(() => import("@/pages/Founder/LinkCenter/LinkCenter")),
  AdminSkeleton
);
const CreateLink = Loadable(
  lazy(() => import("@/pages/Founder/LinkCenter/CreateLink")),
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
const Invoices = Loadable(
  lazy(() => import("@/pages/Founder/FinancialCenter/Invoices")),
  AdminSkeleton
);
const InvoiceDetail = Loadable(
  lazy(() => import("@/pages/Founder/FinancialCenter/InvoiceDetail")),
  AdminSkeleton
);
const FounderProfile = Loadable(
  lazy(() => import("@/pages/Founder/Profile/Profile")),
  AdminSkeleton
);
const FounderNotifications = Loadable(
  lazy(() => import("@/pages/Founder/Notifications/Notifications")),
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
        name: "Founder Control Center™",
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
            path: "widget-library/create",
            element: <WidgetForm />,
          },
          {
            path: "widget-library/:widgetId",
            element: <WidgetDetails />,
          },
          {
            path: "widget-library/:widgetId/edit",
            element: <WidgetForm />,
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
          {
            path: "user-management/:userId",
            element: <UserProfile />,
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
            path: "reports/templates",
            element: <ReportTemplates />,
          },
          {
            icon: <Sparkles />,
            name: "AI Services™",
            path: "ai-services",
            element: <AIServices />,
          },
          {
            path: "ai-services/create-new-prompt",
            element: <CreateNewPrompt />,
          },
          {
            icon: <LinkIcon />,
            name: "Link Center™",
            path: "link-center",
            element: <LinkCenter />,
          },
          {
            path: "link-center/create",
            element: <CreateLink />,
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
          {
            path: "financial-center/invoices",
            element: <Invoices />,
          },
          {
            path: "financial-center/invoices/:invoiceId",
            element: <InvoiceDetail />,
          },
          {
            path: "profile",
            element: <FounderProfile />,
          },
          {
            path: "notifications",
            element: <FounderNotifications />,
          },
        ],
      },
    ],
  },
];
