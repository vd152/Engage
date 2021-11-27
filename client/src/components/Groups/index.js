import React from "react";
import Modal from "../Modal";
import GroupTile from "./GroupTile";
import "./index.css";
import api from "../../apis/api";
import { connect} from 'react-redux'
import {currentUser} from '../../redux/actions/UserActions'
import { toast } from 'react-toastify';
import Loader from "../Main/Loader";

class Groups extends React.Component {
  state = {
    loading: false,
    name: "",
    code: "",
    join: "",
    groups: [],
    id: ""
  };
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
}
  handleCreate = () => {
    this.setState({loading: true});
    api
      .post("/group", {
        name: this.state.name,
        code: this.state.code,
        requiredPermission: "Create Groups",
      })
      .then((res) => {
        toast("Group created successfully")
        this.getGroups()
        window.location.reload()
        this.setState({loading: false})
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message }`);
        this.setState({loading: false})
      });
  };
  joinGroup = () =>{
    this.setState({loading: true});

    api.post('/group/join', {code: this.state.join}).then(res=>{
      toast("Group joined")
      this.getGroups()
      this.setState({loading: false})
    }).catch(err=>{
      toast.error(`${err.response?.data?.message }`);
      this.setState({loading: false})
    })
  }
  getGroups = () =>{
    this.props.currentUser(this.props.user._id)
  }
  setLoading = (value) =>{
    this.setState({loading: value});
  }
  setEditStates = (name, code, id) => {
    this.setState({name: name, code: code, id: id})
  }
  editGroup = () => {
    let url = "/group/" + this.state.id;
    api
      .put(url, {
        name: this.state.name,
        code: this.state.code,
        requiredPermission: "Edit Groups",
      })
      .then((res) => {
        toast("Group edited successfully");
        this.setLoading(false);
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);
        this.setLoading(false);
      }).then(()=>{
        this.getGroups()
      });
  };
  
  render() {
    if(this.state.loading) return <Loader />
    return (
      <React.Fragment>
      <div className={window.innerHeight < window.innerWidth ? "center-container ": "center-container-bottom"}>
          <div className="d-flex justify-content-between">
            <h3 className="page-heading">My Groups</h3>
            <div className="btn-container">
              <button
                className="btn btn-primary add-button"
                data-bs-toggle="modal"
                data-bs-target="#joinmodal"
              >
                Join Group
              </button>
              <button
                className="btn btn-primary  add-button"
                data-bs-toggle="modal"
                data-bs-target="#createmodal"
              >
                Create Group
              </button>
            </div>
          </div>
          <div className="m-3 row align-items-center justify-content-center group-row">
            {this.props.user?.groups?.map((group, key)=>{
              return <GroupTile setEditStates={this.setEditStates} key={key} group={group} user={this.props.user} refresh={this.getGroups} setLoading={this.setLoading} id={key}/>
            })}
          </div>
        </div>
        <Modal target="joinmodal" heading="Join a Group">
          <form>
            <div className="form-group">
              <label className="form-label">Code: </label>
              <input
                className="form-control"
                placeholder="Eg. Class22"
                type="text"
                value={this.state.join || ""}
                onChange={(e) => this.setState({ join: e.target.value })}
              />
            </div>
            <button className="btn btn-primary add-button mt-2" data-bs-dismiss="modal" onClick={(e)=>{
              e.preventDefault();
              this.joinGroup()
            }}>
              Join
            </button>
          </form>
        </Modal>
        <Modal target="createmodal" heading="Create a Group">
          <form>
            <div className="form-group">
              <label className="form-label">Name: </label>
              <input
                className="form-control"
                placeholder="Eg. Class 2022"
                type="text"
                value={this.state.name || ""}
                onChange={(e) => this.setState({ name: e.target.value.replace(/\s+/g, '-') })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Code: </label>
              <input
                className="form-control"
                placeholder="Eg. Class22"
                type="text"
                value={this.state.code.toLowerCase() || ""}
                onChange={(e) => this.setState({ code: e.target.value.replace(/\s+/g, '-')})}
              />
            </div>
            <button
              className="btn btn-primary add-button mt-2"
              data-bs-dismiss="modal"
              onClick={(e) => {
                e.preventDefault()
                this.handleCreate();
              }}
            >
              Create
            </button>
          </form>
        </Modal>
        <Modal target="editmodal" heading="Edit Group" >
          <form>
            <div className="form-group">
              <label className="form-label">Name: </label>
              <input
                className="form-control"
                placeholder="Eg. Class 2022"
                type="text"
                value={this.state.name}
                onChange={(e) =>
                  this.setState({ name: e.target.value.replace(/\s+/g, "-") })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Code: </label>
              <input
                className="form-control"
                placeholder="Eg. Class22"
                type="text"
                value={this.state.code.toLowerCase()}
                onChange={(e) =>
                  this.setState({ code: e.target.value.replace(/\s+/g, "-") })
                }
              />
            </div>
            <button
              className="btn btn-primary add-button mt-2"
              data-bs-dismiss="modal"
              onClick={(e) => {
                e.preventDefault();
                this.editGroup();
              }}
            >
              Edit
            </button>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser.user,
  };
};
export default connect(mapStateToProps, {currentUser})(Groups);
