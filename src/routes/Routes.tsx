import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { routesGenerator } from "@/utils/Generator/RoutesGenerator";

import { founderRoutes } from "./FounderRoutes";
import { consumerRoutes } from "./ConsumerRoutes";
import { enterpriseRoutes } from "./EnterpriseRoutes";
import { employeeRoutes } from "./EmployeeRoutes";
import { refinerRoutes } from "./RefinerRoutes";
import { publicRoutes } from "./PublicRoutes";


import { PublicSkeleton } from "@/common/Skeleton/Public/PublicSkeleton";
import Skeleton from "@/common/Skeleton";

// Auth card placeholder skeleton
const AuthSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-primary-bg">
    <div className="w-full max-w-md p-8 rounded-xl bg-[#0b0f15] border border-white/10 space-y-6 animate-pulse">
      <Skeleton className="h-8 w-40 mx-auto bg-white/10" />
      <Skeleton className="h-4 w-56 mx-auto bg-white/10" />
      <div className="space-y-4 pt-4">
        <Skeleton className="h-10 w-full bg-white/10 rounded-lg" />
        <Skeleton className="h-10 w-full bg-white/10 rounded-lg" />
        <Skeleton className="h-10 w-full bg-primary-brand/30 rounded-lg" />
      </div>
    </div>
  </div>
);

// CORE COMPONENTS (Always included)
const App = lazy(() => import("../App"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const ForgotPassword = lazy(() => import("@/pages/Auth/ForgotPassword"));
const EmployeeSignup = lazy(() => import("@/pages/Auth/EmployeeSignup"));
const Form = lazy(() => import("@/pages/Form"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PublicSkeleton />}>
        <App />
      </Suspense>
    ),
    children: [

      ...routesGenerator(publicRoutes),

      {
        path: "/form",
        element: <Form />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<AuthSkeleton />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<AuthSkeleton />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<AuthSkeleton />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<AuthSkeleton />}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: "/employee/signup",
    element: (
      <Suspense fallback={<AuthSkeleton />}>
        <EmployeeSignup />
      </Suspense>
    ),
  },

  ...routesGenerator(founderRoutes),
  ...routesGenerator(consumerRoutes),
  ...routesGenerator(enterpriseRoutes),
  ...routesGenerator(employeeRoutes),
  ...routesGenerator(refinerRoutes),

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
