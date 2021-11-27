import React, { useState } from "react";
import hamburger from "../images/icon-hamburger.svg";
import {Link} from 'react-router-dom'
export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <nav className="navbar">
      <a href="./" role="img">
        <h4 className="text-white">Classroom Extended</h4>
      </a>
      <div className={`menu ${toggle && "active"}`}>
        <ul className="nav-menu p-0">         
          <li className="nav-item">
            <Link to={"/login"} className="btn add-button btn-home nav-link">
              Login
            </Link>
          </li>
        </ul>
      </div>
      <button className="btn hamburger" onClick={handleToggle}>
        <img src={hamburger} alt="ham" />
      </button>
    </nav>
  );
}
