import React from "react";
import { Redirect } from "react-router";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import api from "../../apis/api";
import { toast } from "react-toastify";
import Modal from "../Modal";
class GroupTile extends React.Component {

  constructor(props){
    super(props)
    this.state={
      name: props.group.name,
      code: props.group.code,
      redirect: false,
    }
  }

  leaveGroup = (code) => {
    this.props.setLoading(true);
    api
      .post("/group/leave", { code })
      .then((res) => {
        this.props.refresh();
        this.props.setLoading(false);
        toast("Operation successful");
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);

        this.props.setLoading(false);
      });
  };
  deleteGroup = (id) => {
    this.props.setLoading(true);

    api
      .post("/group/delete", { id, requiredPermission: "Delete Groups" })
      .then((res) => {
        this.props.refresh();
        this.props.setLoading(false);
        toast("Group deleted successfully");
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message }`);
        this.props.setLoading(false);
      });
  };

  render() {
    if (this.state.redirect)
      return (
        <Redirect
          to={{
            pathname: "/schedule",
            groupid: this.props.group?._id,
          }}
        />
      );
    return (
        <div className="col-md-3 grouptile text-center position-relative" key={this.props.id}>
          {this.props.user?._id === this.props.group.createdBy?._id && (
            <FaPencilAlt
              className="position-absolute"
              style={{ right: "5px", top: "5px", cursor: "pointer" }}
              data-bs-toggle="modal"
              data-bs-target="#editmodal"
              onClick={(e)=>{
                this.props.setEditStates(this.props.group.name, this.props.group.code, this.props.group._id)
              }}
            />
          )}

          <h6 className="m-0">{this.props.group.name}</h6>
          <p className="mb-2 m-0 text-muted">({this.props.group.code})</p>
          <img
            src="/assets/images/group-hover.png"
            className="group-img"
            alt="Group"
          />
          <p className="group-text ">
            Owner:{" "}
            {this.props.group.createdBy?.firstName +
              " " +
              this.props.group.createdBy?.lastName}
          </p>
          <div className="d-flex justify-content-center align-items-center">
            <button
              className="btn btn-primary view-button m-2"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ redirect: true });
              }}
            >
              Schedule
            </button>
            <button
              className="btn btn-primary leave-button m-2"
              onClick={(e) => {
                e.preventDefault();
                this.leaveGroup(this.props.group.code);
              }}
            >
              Leave
            </button>
            {this.props.user?._id === this.props.group.createdBy?._id && (
              <button
                className="btn btn-primary leave-button m-2"
                onClick={(e) => {
                  e.preventDefault();
                  this.deleteGroup(this.props.group?._id);
                }}
              >
                <FaTrashAlt />
              </button>
            )}
          </div>
        </div>
       
    );
  }
}

export default GroupTile;
