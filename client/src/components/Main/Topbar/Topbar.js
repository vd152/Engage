import React from "react";


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
        <div className="headBarSearch">
          <input
            type="text"
            className="headerBarSearchInput"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;

// #7F81E1
