import type { ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import FloatingActionButton from "./FloatingActionButton";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <FloatingActionButton />

      <Footer />
    </div>
  );
};

export default MainLayout;