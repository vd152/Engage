import React from "react";
import { connect } from "react-redux";
import { VerifyCertificate } from "../Vaccination/VerifyCertificate";
import "./index.css";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "../Modal";
import api from "../../apis/api";
import { currentUser } from "../../redux/actions/UserActions";
import {setActive} from "../../redux/actions/SidebarActions"
import Loader from "../Main/Loader";
import { toast } from 'react-toastify';

class Profile extends React.Component {
  state = {
    disabled: true,
    user: {},
    loading: false,
  };
  componentDidMount() {
    this.props.setActive("Profile")
    this.setState({ user: this.props.user });
  }
  setData = (key, value) => {
    const { user } = this.state;
    user[key] = value;
    this.setState({ user });
  };
  handleSubmit = () => {
    this.setState({loading: true})
    const { user } = this.state;
    let url = "/user/" + this.state.user._id;
    api
      .put(url, { user })
      .then((res) => {
        this.props.currentUser(res.data.user?._id);
        toast("Profile edited.")
        this.setState({loading: false})
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message }`);
        this.setState({loading: false})
      });
  };
  render() {
    if (this.state.loading)
      return (
        <Loader />
      );
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
          <form className="row m-0 align-items-center">
            <div className="col-md-4 m-1">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  disabled={this.state.disabled}
                  value={this.state.user?.firstName || ""}
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
                  value={this.state.user?.lastName || ""}
                  onChange={(e) => {
                    this.setData(e.target.name, e.target.value);
                  }}
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
                  value={this.state.user?.email || ""}
                  onChange={(e) => {
                    this.setData(e.target.name, e.target.value);
                  }}
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
                  value={this.state.user?.dob?.substring(0, 10) || "01-01-2000"}
                  onChange={(e) => {
                    this.setData(e.target.name, e.target.value);
                  }}
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
                  value={this.state.user?.contactNumber || ""}
                  onChange={(e) => {
                    this.setData(e.target.name, e.target.value);
                  }}
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
                  value={this.state.user?.enrollmentNumber || ""}
                  onChange={(e) => {
                    this.setData(e.target.name, e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
          <>
              <div className="col-md-4 m-md-3 m-0 col-12 vac-user">
            {!this.props.user?.vaccinationStatus && (
                <div className="form-group">
                  <label className="form-label m-md-1 m-0">Vaccination Status</label>
                  <button
                    className="btn add-button"
                    data-bs-toggle="modal"
                    data-bs-target="#vaccination"
                  >
                    Vaccination certificate verification
                  </button>
                </div>
            )}
              </div>
            {!this.state.disabled && (
              <div className="col-md-4 m-md-1 px-md-5 px-0 my-1 text-end edit-user">
                <div className="form-group text-right">
                  <button
                    className="btn add-button"
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleSubmit();
                    }}
                  >
                    Edit user
                  </button>
                </div>
              </div>
            )}
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
export default connect(mapStateToProps, { currentUser, setActive })(Profile);
