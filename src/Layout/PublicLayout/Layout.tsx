import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useSmoothScroll from "@/hooks/useSmoothScroll";
import { clearGlobalThemeOverrides } from "@/lib/dashboardTheme";

const Layout: React.FC = () => {
  // Landing / public pages only
  useSmoothScroll();

  useEffect(() => {
    clearGlobalThemeOverrides();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-primary-bg overflow-x-hidden">
      <Navbar />
      <main className="bg-primary-bg flex-1 pb-16 sm:pb-20 lg:pb-0 -mt-16 sm:-mt-20 lg:-mt-22">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
