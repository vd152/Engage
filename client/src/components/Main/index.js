import React from "react";
import Sidebar from "./Sidebar/Sidebar";

class Main extends React.Component {
  render() {
    return (
      <div className={window.innerHeight < window.innerWidth ? "center-container ": "center-container-bottom"}>
        <h3 className="page-heading">Welcome</h3>
      </div>
    );
  }
}

export default Main;
