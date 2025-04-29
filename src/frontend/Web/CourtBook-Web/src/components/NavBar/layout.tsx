import { Outlet } from "react-router-dom";
import { NavBar } from "./navBar";

export const Layout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <NavBar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};