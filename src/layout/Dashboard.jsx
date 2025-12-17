import React from "react";
import Sidebar from "../Sidebar/sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
