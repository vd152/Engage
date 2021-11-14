import React, { useState } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import {setActive} from '../../../redux/actions/SidebarActions'
import "./sidebar.css";

class Sidebar extends React.Component {
  state={url: ""}
  render() {
    if(this.state.url != "") return <Redirect to={this.state.url}/>
    return (
      <div
        className={
          window.innerHeight < window.innerWidth ? "sideNavbar" : "bottomNavbar"
        }
      >
        <div className="sideNavItems">
          <div className={"sideNavlink"}>
            <div className={this.props.active === "Chat" ? "activeLink" : ""}>
              <img
                src={
                  this.props.active === "Chat"
                    ? "/assets/images/chat-hover.png"
                    : "/assets/images/chat.png"
                }
                alt="chat"
              />
            </div>
            <div className={this.props.active === "Chat" ? "activeSideNavLink" : ""}>
              Chat
            </div>
          </div>
          <div className="sideNavlink">
            <div className={this.props.active === "Teams" ? "activeLink" : ""}>
              <img
                className="currentSideBarIcon"
                src={
                  this.props.active === "Teams"
                    ? "/assets/images/teams-hover.png"
                    : "/assets/images/teams.png"
                }
                alt="teams"
              />
            </div>
            <div className={this.props.active === "Teams" ? "activeSideNavLink" : ""}>
              Teams
            </div>
          </div>
          <div className="sideNavlink">
            <div className={this.props.active === "Contacts" ? "activeLink" : ""}>
              <img
                alt="contacts"
                className="currentSideBarIcon"
                src={
                  this.props.active === "Contacts"
                    ? "/assets/images/files-hover.png"
                    : "/assets/images/files.png"
                }
              />
            </div>
            <div className={this.props.active === "Contacts" ? "activeSideNavLink" : ""}>
              Contacts
            </div>
          </div>

          <div
            className="sideNavlink"
            onClick={(e) => {
              this.props.setActive("Users");
              this.setState({url: "user-role"})
            }}
          >
            <div className={this.props.active === "Users" ? "activeLink" : ""}>
              <img
                className="currentSideBarIcon"
                src={
                  this.props.active === "Users"
                    ? "/assets/images/teams-hover.png"
                    : "/assets/images/teams.png"
                }
                alt="UsersRoles"
              />
            </div>
            <div className={this.props.active === "Users" ? "activeSideNavLink" : ""}>
              Users & Roles
            </div>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}
const mapStateToProps = (state) =>{
  return {
    active: state.getActive.active
  }
}
export default connect(mapStateToProps, {setActive})(Sidebar);
