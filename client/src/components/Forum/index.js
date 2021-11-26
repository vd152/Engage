import React from "react";
import "./index.css";
import PostTile from "./PostTile";
import Modal from "../Modal";
import { connect } from "react-redux";
import api from "../../apis/api";
import SinglePost from "./SinglePost";
class Forum extends React.Component {
  state = {
    selectedGroup: "none",
    selectedGroupCategories: [],
    selectedCategory: "",
    selectedCategoryTopics: [],
    selectedTopic: "",
    title: "",
    content: "",
    filtergroup: "",
    filtercategory: "",
    filtertopic: "",
    allCategories: [],
    allTopics: [],
    posts: [],
    singlePost: "",
  };
  componentDidMount() {
    this.getCategories();
    this.getPost();
  }
  getCategories = () => {
    let url = "/forum/category/" + this.state.selectedGroup;
    api
      .get(url)
      .then((res) => {
        this.setState({ selectedGroupCategories: res.data.categories });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getTopics = () => {
    let url = "/forum/topic/" + this.state.selectedCategory;
    api
      .get(url)
      .then((res) => {
        this.setState({ selectedCategoryTopics: res.data.topics });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  createPost = () => {
    api
      .post("/forum/post", {
        group: this.state.selectedGroup == "" ? null : this.state.selectedGroup,
        category: this.state.selectedCategory,
        topic: this.state.selectedTopic,
        title: this.state.title,
        content: this.state.content,
        requiredPermission: "Create Posts",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getPost = () => {
    api
      .post("forum/post/filter", {
        group: this.state.filtergroup,
        category: this.state.filtercategory,
        topic: this.state.filtertopic,
      })
      .then((res) => {
        this.setState({ posts: res.data?.posts });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  setSingle = (id) => {
    this.setState({ singlePost: id });
  };
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
          <button
            className="btn add-button"
            data-bs-toggle="modal"
            data-bs-target="#createpost"
          >
            Create
          </button>
          <div className="d-flex m-0 align-items-center justify-content-end">
            <span className=" filter-text">Filter: </span>
            <select
              className="filter-button"
              value={this.state.filtergroup}
              onChange={(e) => {
                this.setState({ filtergroup: e.target.value }, ()=>{
                  this.getPost()
                });
              }}
            >
              <option value="">Group</option>
              {this.props.user?.groups?.map((group, key) => {
                return (
                  <option key={key} value={group._id}>
                    {group.name}
                  </option>
                );
              })}
            </select>
           
        
          </div>
        </div>
        {this.state.singlePost == "" ? (
          <div className="row mx-0 mt-3 justify-content-center post-row">
            {this.state.posts.length === 0 && <p>No posts found</p>}
            {this.state.posts.map((post, key) => {
              return (
                <PostTile
                  post={post}
                  key={key}
                  refresh={this.getPost}
                  viewPost={this.setSingle}
                />
              );
            })}
          </div>
        ) : (
          <SinglePost
            back={this.setSingle}
            post={this.state.singlePost}
            refresh={this.getPost}
          />
        )}
        <Modal target="createpost" heading="Ask a Question/ Discuss">
          <form>
            <div className="form-group">
              <label className="form-label">Group: </label>
              <select
                className="form-control"
                value={this.state.selectedGroup}
                onChange={(e) => {
                  this.setState({ selectedGroup: e.target.value }, () =>
                    this.getCategories()
                  );
                }}
              >
                <option value="none">Please select a group</option>
                {this.props.user?.groups?.map((group, key) => {
                  return (
                    <option value={group._id} key={key}>
                      {group.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Category: </label>
              <select
                className="form-control"
                value={this.state.selectedCategory}
                onChange={(e) => {
                  this.setState({ selectedCategory: e.target.value }, () =>
                    this.getTopics()
                  );
                }}
              >
                <option value="">Please select a category</option>
                {this.state.selectedGroupCategories.map((category, key) => {
                  return (
                    <option value={category._id} key={key}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Topics: </label>
              <select
                className="form-control"
                value={this.state.selectedTopic}
                onChange={(e) => {
                  this.setState({ selectedTopic: e.target.value });
                }}
              >
                <option value="">Please select a topic</option>
                {this.state.selectedCategoryTopics?.map((topic, key) => {
                  return (
                    <option value={topic._id} key={key}>
                      {topic.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Title/Question: </label>
              <input
                className="form-control"
                placeholder="Eg. Class22"
                type="text"
                value={this.state.title}
                onChange={(e) => {
                  this.setState({ title: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Content: </label>
              <textarea
                className="form-control"
                placeholder="Eg. Class22"
                type="text"
                value={this.state.content}
                onChange={(e) => {
                  this.setState({ content: e.target.value });
                }}
              />
            </div>
            <button
              className="btn btn-primary add-button mt-2"
              onClick={(e) => {
                e.preventDefault();
                this.createPost();
              }}
            >
              Join
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.currentUser.user,
  };
};
export default connect(mapStateToProps)(Forum);
