import React from "react";
import {connect} from "react-redux"
import {VerifyCertificate} from "../Vaccination/VerifyCertificate";
import './index.css'
import { FaPencilAlt } from "react-icons/fa";
import Modal from "../Modal"
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

        <div className="row m-0 align-items-center">
          <div className="col-12">
            <img src="/assets/images/profile-hover.png" className="profile-img"/>
          </div>
          <form className="row m-0 align-items-center"> 
          <div className="col-4 m-1">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" />
              </div>
          </div>
          <div className="col-4 m-1">
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" />
              </div>
          </div>
          <div className="col-4 m-1">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="text" className="form-control" />
              </div>
          </div>
          <div className="col-4 m-1">
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input type="text" className="form-control" />
              </div>
          </div>
          <div className="col-4 m-1">
              <div className="form-group">
                <label className="form-label">Contact</label>
                <input type="text" className="form-control" />
              </div>
          </div>
          <div className="col-4 m-1">
              <div className="form-group">
                <label className="form-label">Enrollment Number</label>
                <input type="text" className="form-control" />
              </div>
          </div>
          </form>
          {!this.props.user?.vaccinationStatus &&
          <div className="col-4 m-1">
              <div className="form-group">
                <label className="form-label">Vaccination Status</label>
                <button
                  className="btn add-button"
                  data-bs-toggle="modal"
                  data-bs-target="#vaccination"
                >
                  Vaccination certificate verification
                </button>
              </div>
          </div>
  }
        </div>
        <Modal target="vaccination" heading="Verify your certificate">
          <VerifyCertificate/>
        </Modal>
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
