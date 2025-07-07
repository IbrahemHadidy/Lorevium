import React, { useState } from "react";
import "./Style/AdminPannel.scss";
import { CiBookmarkCheck, CiMenuFries } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import {  IoHomeOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
const MenuDash = () => {
  const [setMenu, getMenu] = useState(false);
  const SizeMenu = () => {
    if (window) {
      getMenu(!setMenu);
    }
  };
  const RemoveStorage = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("role")
  }
  return (
    <div>
      <div className={`parent-menu ${setMenu ? "fullWidth" : "smallWidth"}`}>
        <div className="container">
          <div className="text">
            <h2>Admin</h2>
            <button onClick={() => SizeMenu()}>
              <CiMenuFries />
            </button>
          </div>
          <div className="icons">
            <ul className={`${setMenu ? "hide" : "show"}`}>
              <li><NavLink to="/admin/dashbord" ><IoHomeOutline /></NavLink></li>
              <li><NavLink to="/admin/dashbord/users" ><CiBookmarkCheck/></NavLink></li>
              {/* <li><NavLink to="/admin/dashbord/create" ><MdOutlineCreate/></NavLink></li> */}
              <li><NavLink to="/admin/dashbord/maps" ><FiMapPin /></NavLink></li>
              <li><NavLink className="out" to="/" onClick={()=>RemoveStorage()} ><LuLogOut/></NavLink></li>
            </ul>
            <ul className={`${setMenu ? "show" : "hide"}`}>
              <li><NavLink to="/admin/dashbord" ><IoHomeOutline /> Home</NavLink></li>
              <li><NavLink to="/admin/dashbord/users" ><CiBookmarkCheck/> Book A Table</NavLink></li>
              <li><NavLink to="/admin/dashbord/maps" ><FiMapPin/>Maps</NavLink></li>
              <li><NavLink className="out" to="/" onClick={()=>RemoveStorage()}><LuLogOut/> Log Out</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDash;
