import React from "react";
import "./Style/AdminPannel.scss";
import Picture from "../../../Pictures/profile.jpg";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
const NavBarHome = () => {
  let username = JSON.parse(localStorage.getItem("username"));
  return (
    <div>
      <div className="parent-navbar-dashbord">
        <div className="container-navbar-dashbord">
          <div className="navbar">
            <div className="card">
              <div className="text">
                <h3>Dashboard</h3>
              </div>
              <div className="profile">
                <div className="dark">
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <h3>
                  Hello <FaLongArrowAltRight className="arrow" />
                  <span>{username}</span>
                </h3>
                <div className="img">
                  <img src={Picture} alt="" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="paragraph">
                <h1>Dashboard</h1>
                <div className="path">
                  <p>Dashboard </p>
                  <p>
                    <FaArrowRight />
                  </p>
                  <Link>Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarHome;
