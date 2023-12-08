import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Setting from "./views/Setting";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/settings" element={<Setting />} />
    </Routes>
  );
};

export default AppRoutes;
