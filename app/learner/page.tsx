import Dashboard from "@/pages/Dashboard";
import DashboardLayout from "@/shared/layouts/DashboardLayout";
import React from "react";

const page = () => {
  return (
    <div>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </div>
  );
};

export default page;
