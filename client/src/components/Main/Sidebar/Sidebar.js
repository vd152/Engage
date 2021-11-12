import React, { useState } from "react";

import "./sidebar.css";

const Sidebar = (props) => {

  const [active, setActive] = useState("Chat");


  return (
    <div
      className={
        window.innerHeight < window.innerWidth ? "sideNavbar" : "bottomNavbar"
      }
    >
      <div className="sideNavItems">
        <div
          className={"sideNavlink"}
          
        >
          <div className={active === "Chat" ? "activeLink":""}>
            <img src={active === "Chat" ? "/assets/images/chat-hover.png" : "/assets/images/chat.png"} alt="chat" />
          </div>
          <div className={active === "Chat" ? "activeSideNavLink":""}>Chat</div>
        </div>
        <div
          className="sideNavlink"
          
        >
          <div className={active === "Teams"? "activeLink":""}>
            <img
              className="currentSideBarIcon"
              src={active === "Teams" ? "/assets/images/teams-hover.png" : "/assets/images/teams.png"}
              alt="teams"
            />
            {/* <img src={TeamsHoverImg} alt="teams" className="hoverSideBarIcon" /> */}
          </div>
          <div className={active === "Teams" ?"activeSideNavLink":""}>Teams</div>
        </div>
        <div
          className="sideNavlink"
         
        >
          <div className={active === "Contacts" ?"activeLink":""}>
            <img
              alt="contacts"
              className="currentSideBarIcon"
              src={active === "Contacts" ? "/assets/images/files-hover.png" : "/assets/images/files.png"}
            />
          </div>
          <div className={active === "Contacts" ? "activeSideNavLink":""}>
            Contacts
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Sidebar;
