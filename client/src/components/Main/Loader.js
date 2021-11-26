import React from "react";

class Loader extends React.Component {
  render() {
    return (
      <div className="center-container h-100 d-flex align-items-center justify-content-center">
        <img src="/assets/loading.gif" />
      </div>
    );
  }
}
export default Loader;
