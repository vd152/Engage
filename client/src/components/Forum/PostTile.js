import React from "react";
import { FaComment, FaThumbsUp } from "react-icons/fa";
import { format } from "timeago.js";
import api from "../../apis/api";
import { connect} from 'react-redux'

class PostTile extends React.Component {
  likeTogglePost = () => {
    api.post('/forum/post/like', {id: this.props.post?._id}).then(res=>{
      this.props.refresh()
    }).catch(err => {
      console.log(err)
    })
  };

  render() {
    return (
      <div
        className="col-md-9 col-10 row  border  overflow-hidden flex-md-row mb-4  h-md-250 position-relative"
        style={{ height: "fit-content" }}
      >
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 top-text">
            {this.props.post?.category?.name} &gt;{" "}
            {this.props.post?.topic?.name}
          </strong>
          <h3 className="mb-0">{this.props.post?.title}</h3>
          <div className="mb-1 text-muted">
            {format(this.props.post?.createdAt)}
          </div>
          <p className="mb-auto">{this.props.post?.content}</p>
        </div>
        <div className="col-auto d-flex flex-column align-items-center justify-content-center">
          <FaThumbsUp
            className="post-icon"
            style={{color: this.props.post?.likes?.includes(this.props.user._id)?'red':"black"}}
            onClick={(e) => {
              e.preventDefault();
              this.likeTogglePost();
            }}
          />
          <FaComment className="post-icon" onClick={(e) => {
              e.preventDefault();
              this.props.viewPost(this.props.post);
            }}/>
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
export default connect(mapStateToProps)(PostTile);
