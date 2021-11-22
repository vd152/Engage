import React from "react";
import { FaComment, FaThumbsUp } from "react-icons/fa";

class PostTile extends React.Component {
  render() {
    return (
      <div className="col-md-9 col-10 row  border  overflow-hidden flex-md-row mb-4  h-md-250 position-relative" style={{height: 'fit-content'}}>
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 top-text">
            Category &gt; Topic
          </strong>
          <h3 className="mb-0">Post title</h3>
          <div className="mb-1 text-muted">Nov 11</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <p className="post-link">View Discussion</p>
        </div>
        <div className="col-auto d-flex flex-column align-items-center justify-content-center">
          <FaThumbsUp className="post-icon" />
          <FaComment className="post-icon" />
        </div>
      </div>
    );
  }
}
export default PostTile;
