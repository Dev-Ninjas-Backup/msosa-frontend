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
        // element: <NotFound />
      },
      {
        group: "Manage",
        items: [
          {
            icon: <Columns />,
            name: "Create Product™",
            path: "create-product",
            element: <CreateProduct />,
            // element: <NotFound />
          },
          {
            icon: <LayoutGrid />,
            name: "Widget Library™",
            path: "widget-library",
            // element: <WidgetLibrary />,
            element: <NotFound />
          },
          {
            path: "widget-library/create",
            // element: <WidgetForm />,
            element: <NotFound />
          },
          {
            path: "widget-library/:widgetId",
            // element: <WidgetDetails />,
            element: <NotFound />
          },
          {
            path: "widget-library/:widgetId/edit",
            // element: <WidgetForm />,
            element: <NotFound />
          },
          {
            icon: <BookOpen />,
            name: "Protocol Library™",
            path: "protocol-library",
            element: <ProtocolLibrary />,
            // element: <NotFound />
          },
          {
            icon: <Users2 />,
            name: "User Management™",
            path: "user-management",
            element: <UserManagement />,
            // element: <NotFound />
          },
          {
            path: "user-management/:userId",
            element: <UserProfile />,
            // element: <NotFound />
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
            // element: <Reports />,
            element: <NotFound />
          },
          {
            path: "reports/templates",
            // element: <ReportTemplates />,
            element: <NotFound />
          },
          {
            icon: <Sparkles />,
            name: "AI Services™",
            path: "ai-services",
            // element: <AIServices />,
            element: <NotFound />
          },
          {
            path: "ai-services/create-new-prompt",
            // element: <CreateNewPrompt />,
            element: <NotFound />
          },
          {
            icon: <LinkIcon />,
            name: "Link Center™",
            path: "link-center",
            // element: <LinkCenter />,
            element: <NotFound />
          },
          {
            path: "link-center/create",
            // element: <CreateLink />,
            element: <NotFound />
          },
          {
            icon: <PieChart />,
            name: "Analytics & Insights™",
            path: "analytics-insights",
            // element: <AnalyticsInsights />,
            element: <NotFound />
          },
          {
            icon: <CircleDollarSign />,
            name: "Financial Center™",
            path: "financial-center",
            // element: <FinancialCenter />,
            element: <NotFound />
          },
          {
            path: "financial-center/invoices",
            // element: <Invoices />,
            element: <NotFound />
          },
          {
            path: "financial-center/invoices/:invoiceId",
            // element: <InvoiceDetail />,
            element: <NotFound />
          },
          {
            path: "profile",
            // element: <FounderProfile />,
            element: <NotFound />
          },
          {
            path: "notifications",
            // element: <FounderNotifications />,
            element: <NotFound />
          },
        ],
      },
    ],
  },
];
