import React from "react";

class Forum extends React.Component {
  render() {
    return (
      <div className={window.innerHeight < window.innerWidth ? "center-container ": "center-container-bottom"}>
        <h3 className="page-heading">Forum</h3>
      </div>
    );
  }
}
export default Forum;