import React from "react";
import { FaAngleDown, FaArrowUp } from "react-icons/fa";
import {connect} from "react-redux";

class Schedule extends React.Component {
  state={
    selectedGroupName: "",
    selectedGroup: {}
  }
  render() {
    return (
      <div className="center-container ">
        <div className="d-flex justify-content-between">
          <h3 className="page-heading">My Schedule</h3>
          <div className="btn-container">
            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle p-2"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {this.state.selectedGroupName != ""? this.state.selectedGroupName: "Choose group"}
                <FaAngleDown />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="dropdownMenuButton2"
              >
                {this.props.user?.groups?.map((group,key)=>{
                  return <li key={key} onClick={(e)=>{
                    this.setState({selectedGroup: group, selectedGroupName: group.name})
                  }}>
                    <p className="dropdown-item">{group.name +" ("+group.code+")"}</p>
                  </li>
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center m-0">
          {this.state.selectedGroupName == "" && <p className="w-auto">Please choose a group</p>}
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
export default connect(mapStateToProps)(Schedule);
