import React from "react";
import {connect} from "react-redux"
class Profile extends React.Component {
  render() {
    return (
      <div className={window.innerHeight < window.innerWidth ? "center-container ": "center-container-bottom"}>
        <h3 className="page-heading">My Profile</h3>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      user: state.currentUser.user,
    };
  };
export default connect(mapStateToProps)(Profile);
