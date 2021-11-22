import React from "react";
import "./index.css";
import { FaAngleDown } from "react-icons/fa";
import PostTile from "./PostTile";
import Modal from "../Modal";

class Forum extends React.Component {
  render() {
    return (
      <div
        className={
          window.innerHeight < window.innerWidth
            ? "center-container "
            : "center-container-bottom"
        }
      >
        <h3 className="page-heading">Forum</h3>
        <div className="d-flex m-0 align-items-center p-1 justify-content-between px-md-3 px-2">
            <button className="btn add-button"           data-bs-toggle="modal"
          data-bs-target="#createpost">Create</button>
          <div className="d-flex m-0 align-items-center justify-content-end">
          <span className=" filter-text">Filter: </span>
          <div className="dropdown  filter-button-container">
            <button
              className="filter-button dropdown-toggle p-2"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Choose
              <FaAngleDown />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>Item</li>
            </ul>
          </div>
          <div className="dropdown filter-button-container">
            <button
              className=" filter-button dropdown-toggle p-2"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Choose
              <FaAngleDown />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>Item</li>
            </ul>
          </div>
          </div>
          
        </div>
        <div className="row mx-0 mt-3 justify-content-center post-row">
          <PostTile />
        </div>
        <Modal target="createpost" heading="Ask a Question/ Discuss"/>
      </div>
    );
  }
}
export default Forum;
