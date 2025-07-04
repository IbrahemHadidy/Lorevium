import React from "react";
import "./Style/AdminPannel.scss";
import { Outlet } from "react-router-dom";
import MenuDash from "./MenuDash";
import NavBarHome from "./NavBarHome";

const DashBord = () => {
  return (
    <div>
      <div className="parent-dashbord">
        <div className="containers">
          <MenuDash />
          <NavBarHome/>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}; 

export default DashBord;
