import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import api from "../../apis/api";
import { format } from "timeago.js";
import Modal from "../Modal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { connect } from "react-redux";
import Loader from "../Main/Loader";
import { toast } from "react-toastify";

class Forum extends React.Component {
  state = {
    loading1: false,
    loading2: false,
    loader: false,
    edit: false,
    editid: "",
    tableDataCat: {
      columns: [
        {
          name: "Id",
          selector: (row) => row.id,
          sortable: true,
          width: "60px",
        },
        {
          name: "Name",
          selector: (row) => row.name,
          sortable: true,
        },
        {
          name: "Group",
          selector: (row) => row.group,
          sortable: true,
        },
        {
          name: "Created",
          selector: (row) => row.created,
          sortable: true,
        },
        {
          name: "Edit",
          width: "60px",
          cell: (row) => (
            <button
              className=" row-btn"
              onClick={(e) => {
                e.preventDefault();
                this.setState(
                  {
                    group: row.groupid,
                    catName: row.name,
                    editid: row._id,
                    edit: true,
                  },
                  () => {
                    document.querySelector("#editcat").click();
                  }
                );
              }}
            >
              <FaEdit />
            </button>
          ),
        },
        {
          name: "Delete",
          width: "60px",
          cell: (row) => (
            <button
              className=" row-btn"
              onClick={(e) => {
                e.preventDefault();
                this.handleDelete(row);
              }}
            >
              <FaTrashAlt />
            </button>
          ),
        },
      ],
      data: [],
    },
    tableDataTopic: {
      columns: [
        {
          name: "Id",
          selector: (row) => row.id,
          sortable: true,
          width: "60px",
        },
        {
          name: "Name",
          selector: (row) => row.name,
          sortable: true,
        },
        {
          name: "Category",
          selector: (row) => row.category,
          sortable: true,
        },
        {
          name: "Created",
          selector: (row) => row.created,
          sortable: true,
        },
        {
          name: "Edit",
          width: "60px",
          cell: (row) => (
            <button
              className=" row-btn"
              onClick={(e) => {
                e.preventDefault();
                this.setState(
                  {
                    selectedCategory: row.catid,
                    topicName: row.name,
                    editid: row._id,
                    edit: true,
                  },
                  () => {
                    document.querySelector("#edittopic").click();
                  }
                );
              }}
            >
              <FaEdit />
            </button>
          ),
        },
        {
          name: "Delete",
          width: "60px",
          cell: (row) => (
            <button
              className=" row-btn"
              onClick={(e) => {
                e.preventDefault();
                this.handleDelete(row);
              }}
            >
              <FaTrashAlt />
            </button>
          ),
        },
      ],
      data: [],
    },
    catName: "",
    group: "",
    topicName: "",
    selectedCategory: "",
    allCategories: [],
    allgroups: [],
  };
  componentDidMount() {
    this.getCategories();
    this.getTopics();
    api
      .get("/group")
      .then((res) => {
        this.setState({ allgroups: res.data?.groups });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getCategories = () => {
    this.setState({ loading1: true });

    let allCategories = []
    api
      .get("/forum/category")
      .then((res) => {
        const datalist = [];
        var i = 0;
        res.data.categories.forEach((val) => {
          i++;
          let temp = {
            id: i,
            name: val.name,
            group: val.group?.name ? val.group?.name : "General",
            groupid: val.group?._id,
            _id: val._id,
            type: val.categoryType,
            created: format(val.createdAt),
          };
          datalist.push(temp);
          allCategories.push(val);
        });

        const { tableDataCat } = this.state;
        tableDataCat["data"] = datalist;
        this.setState({ tableDataCat, allCategories: allCategories, loading1: false });
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);

        this.setState({ loading1: false });
      });
  };
  getTopics = () => {
    this.setState({ loading2: true });

    api
      .get("/forum/topic")
      .then((res) => {
        const datalist = [];
        var i = 0;
        res.data.topics.forEach((val) => {
          i++;
          let temp = {
            id: i,
            name: val.name,
            category: val.parentCategory?.name,
            catid: val.parentCategory?._id,
            _id: val._id,
            created: format(val.createdAt),
          };
          datalist.push(temp);
        });

        const { tableDataTopic } = this.state;
        tableDataTopic["data"] = datalist;
        this.setState({ tableDataTopic, loading2: false });
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);

        this.setState({ loading2: false });
      });
  };
  handleDelete = (row) => {
    this.setState({ loader: true });
    api
      .post("/forum/delete/category", {
        id: row._id,
        requiredPermission:
          row.type === "root" ? "Delete Categories" : "Delete Topics",
      })
      .then((res) => {
        this.getCategories();
        this.getTopics();
        toast("Deleted Successfully");
        this.setState({ loader: false });
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);
        this.setState({ loader: false });
      });
  };
  createCategory = () => {
    this.setState({ loader: true });

    api
      .post("/forum/category", {
        name: this.state.catName,
        group: this.state.group == "" ? null : this.state.group,
        requiredPermission: "Create Categories",
      })
      .then((res) => {
        this.getCategories();
        this.setState({ loader: false });
        toast("Cateogry created.");
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);
        this.setState({ loader: false });
      });
  };
  createTopic = () => {
    this.setState({ loader: true });

    api
      .post("/forum/topic", {
        name: this.state.topicName,
        parentCategory: this.state.selectedCategory,
        requiredPermission: "Create Topics",
      })
      .then((res) => {
        this.getTopics();
        this.setState({ loader: false });
        toast("Topic created");
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);
        this.setState({ loader: false });
      });
  };
  editCategory = () => {
    this.setState({ loader: true });

    let url = "/forum/category/" + this.state.editid;
    api
      .put(url, {
        name: this.state.catName,
        group: this.state.group,
        requiredPermission: "Edit Categories",
      })
      .then((res) => {
        this.getCategories();
        this.setState({ loader: false });
        toast("Cateogry edited.");
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);
        this.setState({ loader: false });
      });
  };
  editTopic = () => {
    this.setState({ loader: true });

    let url = "/forum/topic/" + this.state.editid;
    api
      .put(url, {
        name: this.state.topicName,
        parentCategory: this.state.selectedCategory,
        requiredPermission: "Edit Topics",
      })
      .then((res) => {
        this.getTopics();
        this.setState({ loader: false });
        toast("Topic edited.");
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);
        this.setState({ loader: false });
      });
  };
  render() {
    if (this.state.loader) return <Loader />;
    return (
      <div>
        <button
          className="btn add-button"
          data-bs-toggle="modal"
          data-bs-target="#addcat"
          onClick={(e) => {
            this.setState({ group: "", catName: "", edit: false });
          }}
        >
          Add a category
        </button>
        <button
          className="btn add-button"
          data-bs-toggle="modal"
          id="editcat"
          data-bs-target="#addcat"
          style={{ visibility: "hidden" }}
        ></button>
        <DataTableExtensions {...this.state.tableDataCat}>
          <DataTable
            noHeader
            defaultSortField="id"
            defaultSortAsc={true}
            filterPlaceholder="Search"
            responsive
            pagination
            highlightOnHover
            progressPending={this.state.loading1}
          />
        </DataTableExtensions>
        <button
          className="btn add-button"
          data-bs-toggle="modal"
          data-bs-target="#addtopic"
          onClick={(e) => {
            this.setState({ topicName: "", selectedCategory: "", edit: false });
          }}
        >
          Add a topic
        </button>
        <button
          className="btn add-button"
          data-bs-toggle="modal"
          id="edittopic"
          data-bs-target="#addtopic"
          style={{ visibility: "hidden" }}
        ></button>
        <DataTableExtensions {...this.state.tableDataTopic}>
          <DataTable
            noHeader
            defaultSortField="id"
            defaultSortAsc={true}
            filterPlaceholder="Search"
            responsive
            pagination
            highlightOnHover
            progressPending={this.state.loading2}
          />
        </DataTableExtensions>
        <Modal
          target="addcat"
          heading={this.state.edit ? "Edit Category" : "Add a Forum Category"}
        >
          <form>
            <div className="form-group">
              <label className="form-label">Group: </label>
              <select
                className="form-control"
                value={this.state.group}
                onChange={(e) => {
                  this.setState({ group: e.target.value });
                }}
              >
                <option value="">Please select a group</option>
                {this.state.allgroups.map((group, key) => {
                  return (
                    <option value={group._id} key={key}>
                      {group.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Name: </label>
              <input
                className="form-control"
                placeholder="Eg. Engineering"
                type="text"
                value={this.state.catName}
                onChange={(e) => {
                  this.setState({ catName: e.target.value });
                }}
              />
            </div>

            {this.state.edit ? (
              <button
                className="btn btn-primary add-button mt-2"
                type="submit"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  this.editCategory();
                }}
              >
                Edit
              </button>
            ) : (
              <button
                className="btn btn-primary add-button mt-2"
                type="submit"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  this.createCategory();
                }}
              >
                Create
              </button>
            )}
          </form>
        </Modal>
        <Modal
          target="addtopic"
          heading={this.state.edit ? "Edit Topic" : "Add a Forum Topic"}
        >
          <form>
            <div className="form-group">
              <label className="form-label">Parent Category: </label>
              <select
                className="form-control"
                value={this.state.selectedCategory}
                onChange={(e) => {
                  this.setState({ selectedCategory: e.target.value });
                }}
              >
                <option value="">Please select a category</option>
                {this.state.allCategories.map((cat, key) => {
                  return (
                    <option value={cat._id} key={key}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Name: </label>
              <input
                className="form-control"
                placeholder="Eg. Dev"
                type="text"
                value={this.state.topicName}
                onChange={(e) => {
                  this.setState({ topicName: e.target.value });
                }}
              />
            </div>
            {this.state.edit ? (
              <button
                className="btn btn-primary add-button mt-2"
                type="submit"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  this.editTopic();
                }}
              >
                Edit
              </button>
            ) : (
              <button
                className="btn btn-primary add-button mt-2"
                type="submit"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  this.createTopic();
                }}
              >
                Create
              </button>
            )}
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser.user,
    categories: state.forumCategories?.categories,
  };
};
export default connect(mapStateToProps)(Forum);
