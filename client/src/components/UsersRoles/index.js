import React from "react";
import Forum from "./Forum";
import './index.css'
import Role from "./Role";
import User from "./User";
class Manage extends React.Component {
  state={
      active: "user"
  }
  render() {
    return (
      <div className={window.innerHeight < window.innerWidth ? "center-container ": "center-container-bottom"}>
        <h3 className="page-heading">Admin</h3>
        <div className="p-md-3 p-1">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <p className={this.state.active == "user"? "nav-link active": "nav-link"} aria-current="page"  onClick={(e)=>{
                  this.setState({active: "user"})
                  }}>
                Manage Users
              </p>
            </li>
            <li className="nav-item">
              <p className={this.state.active == "role"? "nav-link active": "nav-link"}  onClick={(e)=>{
                  this.setState({active: "role"})
                  }}>
                Manage Roles
              </p>
            </li>
            <li className="nav-item">
              <p className={this.state.active == "forum"? "nav-link active": "nav-link"} aria-current="page"  onClick={(e)=>{
                  this.setState({active: "forum"})
                  }}>
                Manage Forum
              </p>
            </li>
          </ul>
        </div>
        <div className="tab-content p-md-3 p-1">
            {this.state.active == "user"? <User />: this.state.active == "role"?<Role />: <Forum />}
        </div>
      </div>
    );
  }
}

export default Manage;
