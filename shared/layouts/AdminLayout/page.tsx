import { AdminSidebar } from "@/components/AdminSidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Sidebar cố định bên trái */}
      <AdminSidebar />

      {/* Nội dung chính bên phải */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header (Top bar) nếu có */}
        <header className="h-16 bg-white border-b px-6 flex items-center">
          {/* Search bar, profile... */}
          <span>Header Content</span>
        </header>

        {/* Main Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
