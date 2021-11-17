import React from "react";
import Modal from "../Modal";
import GroupTile from "./GroupTile";
import "./index.css";
class Groups extends React.Component {
  state = {
    name: "",
    code: "",
    join: "",
  };
  handleCreate = () => {};
  render() {
    return (
      <React.Fragment>
        <div className="center-container ">
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
            <GroupTile />
            <GroupTile />
            <GroupTile />
            <GroupTile />
            <GroupTile />
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
                value={this.state.join}
                onChange={(e) => this.setState({ join: e.target.value })}
              />
            </div>
            <button className="btn btn-primary add-button mt-2" type="submit">
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
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Code: </label>
              <input
                className="form-control"
                placeholder="Eg. Class22"
                type="text"
                value={this.state.code}
                onChange={(e) => this.setState({ code: e.target.value })}
              />
            </div>
            <button className="btn btn-primary add-button mt-2" type="submit">
              Create
            </button>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Groups;
