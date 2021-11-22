import React from "react";
import {removeAuthToken, removeUser} from '../../../utils/localStorage'
import "./topbar.css";

const Topbar = (props) => {
  return (
    <div className="headBar">
      {window.innerWidth > 862 && (
        <div className="headBarBox">
          <div className="dots">. . .</div>
          <div className="dots">. . .</div>
          <div className="dots">. . .</div>
        </div>
      )}
      <div className="headSubBarBox">
        {window.innerWidth > 862 && (
          <div className="headBarTeamsHeading">
            <div className="headBarMSTeams">M.E.</div>
          </div>
        )}
        {/* <div className="headBarSearch">
          <input
            type="text"
            className="headerBarSearchInput"
            placeholder="Search"
          />
        </div> */}
        
        <div className="p-2 logout" onClick={(e)=>{
          removeAuthToken()
          removeUser()
          window.location.reload()
        }}>
          <img src="/assets/images/logout.png" width="20"></img>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

// #7F81E1
