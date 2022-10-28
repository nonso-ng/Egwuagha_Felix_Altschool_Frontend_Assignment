//import logo from "./images/logo.png";
import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
//<img  className="logo" src={logo} alt="trial"/>
const NavigationBar = () => {
  return (
    <header className="navbar">
      <div className="nav">
       <img className="logo" src="./images/logo.png"  alt="trial"/>
        <div className="list-nav">
          <ul>
            <li>
                <NavLink to="/" className="ggg">
                HOME
                </NavLink>
             
            </li>
            <li>
            <NavLink to="/about" className="ggg">
                ABOUT
                </NavLink>
            </li>
            <li className="last">
            <NavLink to="/user" className="ggg">
                USERS
                </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
