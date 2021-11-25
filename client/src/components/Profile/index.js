import React from "react";
import {connect} from "react-redux"
import {VerifyCertificate} from "../Vaccination/VerifyCertificate";
import './index.css'
import { FaPencilAlt } from "react-icons/fa";

class Profile extends React.Component {
  state={
    disabled: true
  }
  componentDidMount() {
    console.log(this.props.user)
  }
  render() {
    return (
      <div className={window.innerHeight < window.innerWidth ? "center-container ": "center-container-bottom"}>
        <h3 className="page-heading">My Profile</h3>

        <VerifyCertificate />
        <div className="row m-0 align-items-center">
          <div className="col-12">
            <img src="/assets/images/profile-hover.png" className="profile-img"/>
          </div>
          <div className="col-4 m-1">
            <form>
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" />
              </div>
            </form>
          </div>
          <div className="col-4 m-1">
            <form>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" />
              </div>
            </form>
          </div>
          <div className="col-4 m-1">
            <form>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="text" className="form-control" />
              </div>
            </form>
          </div>
          <div className="col-4 m-1">
            <form>
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input type="text" className="form-control" />
              </div>
            </form>
          </div>
          <div className="col-4 m-1">
            <form>
              <div className="form-group">
                <label className="form-label">Contact</label>
                <input type="text" className="form-control" />
              </div>
            </form>
          </div>
          <div className="col-4 m-1">
            <form>
              <div className="form-group">
                <label className="form-label">Enrollment Number</label>
                <input type="text" className="form-control" />
              </div>
            </form>
          </div>
          <div className="col-4 m-1">
            <form>
              <div className="form-group">
                <label className="form-label">Vaccination Status</label>
                <input type="text" className="form-control" />
              </div>
            </form>
          </div>
        </div>
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
