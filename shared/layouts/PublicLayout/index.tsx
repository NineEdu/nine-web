import React from "react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* navbar */}
      <Navbar />

      {/* content */}
      <main className={cn("flex-1 container mx-auto p-4")}>{children}</main>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
