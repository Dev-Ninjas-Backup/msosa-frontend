import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useSmoothScroll from "@/hooks/useSmoothScroll";

const Layout: React.FC = () => {
  // Initialize buttery-smooth scrolling for the entire public site
  useSmoothScroll();

  return (
    <div className="min-h-screen flex flex-col bg-primary-bg overflow-x-hidden">
      <Navbar />
      <main className="bg-primary-bg flex-1 pb-20 md:pb-0 -mt-22">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
