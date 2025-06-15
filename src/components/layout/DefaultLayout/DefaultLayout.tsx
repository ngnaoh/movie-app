import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import "./DefaultLayout.scss";

const DefaultLayout: React.FC = () => {
  return (
    <div className="default-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
