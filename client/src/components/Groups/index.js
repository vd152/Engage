import React from "react";
import GroupTile from "./GroupTile";
import './index.css'
class Groups extends React.Component {
  render() {
    return (
      <div className="center-container ">
        <div className="d-flex justify-content-between">
          <h3 className="page-heading">My Groups</h3>
          <button className="btn btn-primary m-2 p-2 add-button">
            {" "}
            Create Group
          </button>
        </div>
        <div className="m-3 row align-items-center justify-content-center"> 
            <GroupTile /><GroupTile /><GroupTile /><GroupTile />
        </div>
      </div>
    );
  }
}

export default Groups;
