import React from "react";
import {FaTrashAlt, FaThumbsUp } from "react-icons/fa";
import { format } from "timeago.js";
import { connect } from "react-redux";
import api from "../../apis/api";
import Loader from "../Main/Loader";
class SinglePost extends React.Component {
  state = {
    content: "",
    comments: [],
    liked: false,
    loadingLike: false,
    loadingComments: false,
  };
  componentDidMount() {
    this.getComments();
    this.setState({
      liked: this.props.post?.likes?.includes(this.props.user._id),
    });
  }
  likeTogglePost = () => {
    this.setState({ loadingLike: true });
    api
      .post("/forum/post/like", { id: this.props.post?._id })
      .then((res) => {
        this.setState({ liked: !this.state.liked, loadingLike: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loadingLike: false });
      });
  };
  getComments = () => {
    this.setState({ loadingComments: true });
    let url = "/forum/post/comment/" + this.props.post?._id;
    api
      .post(url)
      .then((res) => {
        this.setState({ comments: res.data?.comments, loadingComments: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loadingComments: false });
      });
  };
  postComment = () => {
    api
      .post("/forum/post/comment", {
        id: this.props.post?._id,
        content: this.state.content,
        requiredPermission: "Create Comments",
      })
      .then((res) => {
        this.getComments();
        this.setState({ content: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <>
        <div className="row justify-content-center m-0">
          <div className="col-md-9">
            <button
              className="btn btn-dark"
              onClick={(e) => {
                e.preventDefault();
                this.props.refresh();
                this.props.back("");
              }}
            >
              Go Back
            </button>
          </div>
        </div>

        <div className="row mx-0 mt-3 justify-content-center post-row">
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
              <div className="mb-1 text-muted">
                Posted by:{" "}
                {this.props.post.createdBy?.firstName +
                  " " +
                  this.props.post.createdBy?.lastName +
                  " - " +
                  this.props.post.createdBy?.email}
              </div>
            </div>
            <div className="col-auto d-flex flex-column align-items-center justify-content-center">
              {this.state.loadingLike ? (
                <Loader height="50" width="50" />
              ) : (
                <FaThumbsUp
                  className="post-icon"
                  style={{
                    color: this.state.liked ? "red" : "black",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    this.likeTogglePost();
                  }}
                />
              )}
            </div>
            <hr />
            <div className="comment-section my-2">
              <form>
                <div className="form-group">
                  <label className="form-label">Share your views: </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Start typing..."
                    value={this.state.content}
                    onChange={(e) => {
                      this.setState({ content: e.target.value });
                    }}
                  />
                </div>
                <div className="row m-0 justify-content-end">
                  <button
                    className="btn btn-primary add-button mt-2 "
                    onClick={(e) => {
                      e.preventDefault();
                      this.postComment();
                    }}
                  >
                    Post Comment
                  </button>
                </div>
              </form>
              <hr />
              {this.state.loadingComments ? (
                "Loading.."
              ) : (
                <div className="row ">
                  {this.state.comments.map((comment, key) => {
                    return (
                      <div className="row comment-bg justify-content-between">
                      <div className="col-9 " key={key}>
                        <p className=" m-0">
                          {comment.user?.firstName +
                            " " +
                            comment.user?.lastName +
                            " " +
                            comment.user?.email}{" "}
                          -{" "}
                          <span className="text-muted">
                            {format(comment.createdAt)}
                          </span>
                        </p>
                        <p className="m-0">{comment.content}</p>
                      </div>
                      <div className="col-2">
                        <button className="btn"><FaTrashAlt/></button>
                      </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.currentUser.user,
  };
};
export default connect(mapStateToProps)(SinglePost);
