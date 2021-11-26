import React from "react";
import { connect } from "react-redux";
import { VerifyCertificate } from "../Vaccination/VerifyCertificate";
import "./index.css";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "../Modal";
import api from '../../apis/api'
import {currentUser} from '../../redux/actions/UserActions'

class Profile extends React.Component {
  state = {
    disabled: true,
    user: {},
  };
  componentDidMount() {
    this.setState({ user: this.props.user });
  }
  setData = (key, value) => {
    const { user } = this.state;
    user[key] = value;
    this.setState({ user });
  };
  handleSubmit = () => {
    const { user } = this.state;
    let url = '/user/'+ this.state.user._id 
    api.put(url, {user}).then(res=>{
      this.props.currentUser(res.data.user?._id)
    }).catch(err=>{
      console.log(err)
    })
  }
  render() {
    return (
      <div
        className={
          window.innerHeight < window.innerWidth
            ? "center-container "
            : "center-container-bottom"
        }
      >
        <div className="d-flex align-items-center">
          <h3 className="page-heading">My Profile</h3>
          <FaPencilAlt
            onClick={(e) => this.setState({ disabled: !this.state.disabled })}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="row m-0 align-items-center">
          {/* <div className="col-12">
            <img
              src="/assets/images/profile-hover.png"
              className="profile-img"
            />
          </div> */}
          <form className="row m-0 align-items-center">
            <div className="col-md-4 m-1">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  disabled={this.state.disabled}
                  value={this.state.user?.firstName}
                  onChange={(e) => {
                    this.setData(e.target.name, e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-md-4 m-1">
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  disabled={this.state.disabled}
                  value={this.state.user?.lastName}
                  onChange={(e)=>{this.setData(e.target.name,e.target.value)}}
                />
              </div>
            </div>
            <div className="col-md-4 m-1">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  disabled={this.state.disabled}
                  value={this.state.user?.email}
                  onChange={(e)=>{this.setData(e.target.name,e.target.value)}}
                />
              </div>
            </div>
            <div className="col-md-4 m-1">
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  disabled={this.state.disabled}
                  value={this.state.user?.dob?.substring(0,10)}
                  onChange={(e)=>{this.setData(e.target.name,e.target.value)}}
                />
              </div>
            </div>
            <div className="col-md-4 m-1">
              <div className="form-group">
                <label className="form-label">Contact</label>
                <input
                  type="number"
                  name="contactNumber"
                  className="form-control"
                  disabled={this.state.disabled}
                  value={this.state.user?.contactNumber}
                  onChange={(e)=>{this.setData(e.target.name,e.target.value)}}
                />
              </div>
            </div>
            <div className="col-md-4 m-1">
              <div className="form-group">
                <label className="form-label">Enrollment Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="enrollmentNumber"
                  disabled={this.state.disabled}
                  value={this.state.user?.enrollmentNumber}
                  onChange={(e)=>{this.setData(e.target.name,e.target.value)}}
                />
              </div>
            </div>
          </form>
          <>
        
          {!this.props.user?.vaccinationStatus && (
            <div className="col-md-4 m-3">
              <div className="form-group">
                <label className="form-label m-1">Vaccination Status</label>
                <button
                  className="btn add-button"
                  data-bs-toggle="modal"
                  data-bs-target="#vaccination"
                >
                  Vaccination certificate verification
                </button>
              </div>
            </div>
          )}
           {!this.state.disabled &&
          <div className="col-md-4 m-1 px-5 text-end">
              <div className="form-group text-right">
                <button
                  className="btn add-button"
                  onClick={(e)=>{
                    e.preventDefault();
                    this.handleSubmit()
                  }}
                >
                  Edit user
                </button>
              </div>
            </div>
  }
          </>
        </div>
        <Modal target="vaccination" heading="Verify your certificate">
          <VerifyCertificate />
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
export default connect(mapStateToProps, {currentUser})(Profile);
