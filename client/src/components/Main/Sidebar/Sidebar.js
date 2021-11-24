import React, { useState } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { setActive } from "../../../redux/actions/SidebarActions";
import "./sidebar.css";

class Sidebar extends React.Component {
  state = { url: "" };
  render() {
    if (this.state.url != "") return <Redirect to={this.state.url} />;
    return (
      <div
        className={
          window.innerHeight < window.innerWidth ? "sideNavbar" : "bottomNavbar"
        }
      >
        <div className="sideNavItems">
          <div             className="sideNavlink"
            onClick={(e) => {
              this.props.setActive("Home");
              this.setState({ url: "/" });
            }}>
            <div className={this.props.active === "Home" ? "activeLink" : ""}>
              <img
              className="currentSideBarIcon"
                src={
                  this.props.active === "Home"
                    ? "/assets/images/home-hover.png"
                    : "/assets/images/home.png"
                }
                alt="Home"
              />
            </div>
            <div
              className={
                this.props.active === "Home" ? "activeSideNavLink" : ""
              }
            >
              Home
            </div>
          </div>
          <div
            className="sideNavlink"
            onClick={(e) => {
              this.props.setActive("Groups");
              this.setState({ url: "/groups" });
            }}
          >
            <div className={this.props.active === "Groups" ? "activeLink" : ""}>
              <img
                className="currentSideBarIcon"
                src={
                  this.props.active === "Groups"
                    ? "/assets/images/group-hover.png"
                    : "/assets/images/group.png"
                }
                alt="Groups"
              />
            </div>
            <div
              className={
                this.props.active === "Groups" ? "activeSideNavLink" : ""
              }
            >
              Groups
            </div>
          </div>
          <div
            className="sideNavlink"
            onClick={(e) => {
              this.props.setActive("Schedule");
              this.setState({ url: "/schedule" });
            }}
          >
            <div
              className={this.props.active === "Schedule" ? "activeLink" : ""}
            >
              <img
                className="currentSideBarIcon"
                src={
                  this.props.active === "Schedule"
                    ? "/assets/images/schedule-hover.png"
                    : "/assets/images/schedule.png"
                }
                alt="Schedule"
              />
            </div>
            <div
              className={
                this.props.active === "Schedule" ? "activeSideNavLink" : ""
              }
            >
              Schedule
            </div>
          </div>
          <div
            className="sideNavlink"
            onClick={(e) => {
              this.props.setActive("Forum");
              this.setState({ url: "/forum" });
            }}
          >
            <div className={this.props.active === "Forum" ? "activeLink" : ""}>
              <img
                alt="Forum"
                className="currentSideBarIcon"
                src={
                  this.props.active === "Forum"
                    ? "/assets/images/forum-hover.png"
                    : "/assets/images/forum.png"
                }
              />
            </div>
            <div
              className={
                this.props.active === "Forum" ? "activeSideNavLink" : ""
              }
            >
              Forum
            </div>
          </div>
          {this.props.user?.role?.name.toLowerCase().includes("admin")  &&

          <div
            className="sideNavlink"
            onClick={(e) => {
              this.props.setActive("Admin");
              this.setState({ url: "/manage" });
            }}
          >
            <div className={this.props.active === "Admin" ? "activeLink" : ""}>
              <img
                className="currentSideBarIcon"
                src={
                  this.props.active === "Admin"
                    ? "/assets/images/user-roles-hover.png"
                    : "/assets/images/user-roles.png"
                }
                alt="Admin"
              />
            </div>
            <div
              className={
                this.props.active === "Admin" ? "activeSideNavLink" : ""
              }
            >
              Admin
            </div>
          </div>
  }
        </div>
        <div
            className="sideNavlink"
            onClick={(e) => {
              this.props.setActive("Profile");
              this.setState({ url: "/profile" });
            }}
          >
            <div className={this.props.active === "Profile" ? "activeLink" : ""}>
              <img
                alt="Profile"
                className="currentSideBarIcon"
                src={
                  this.props.active === "Profile"
                    ? "/assets/images/profile-hover.png"
                    : "/assets/images/profile.png"
                }
              />
            </div>
            <div
              className={
                this.props.active === "Profile" ? "activeSideNavLink" : ""
              }
            >
              Profile
            </div>
          </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    active: state.getActive.active,
    user: state.currentUser.user,
  };
};
export default connect(mapStateToProps, { setActive })(Sidebar);
