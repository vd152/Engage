import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import api from "../../apis/api";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "../Modal";

export default class User extends React.Component {
  state = {
    loading: false,
    tableData: {
      columns: [
        {
          name: "Id",
          selector: (row) => row.id,
          sortable: true,
          width: "60px",
        },
        {
          name: "Enrollment Number",
          selector: (row) => row.enrollmentNumber,
          sortable: true,
        },
        {
          name: "Name",
          selector: (row) => row.name,
          sortable: true,
        },
        {
          name: "Email",
          selector: (row) => row.email,
          sortable: true,
        },
        {
          name: "Role",
          selector: (row) => row.role,
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
                this.handleEdit(row);
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
    allroles: [],
    user: {
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      password: "",
      enrollmentNumber: "",
      contactNumber: "",
      displayPicture: null,
      role: "",
      groups: [],
    },
  };
  handleEdit = (row) => {
    console.log(row);
  };
  handleDelete = (row) => {
    api.post('/user/delete', {id: row._id, requiredPermission: "Delete Users" }).then((res) => {
      this.componentDidMount()
    }).catch(err => {
      console.log(err);
    })
  };
  componentDidMount() {
    this.setState({ loading: true });
    const datalist = [];
    var i = 0;
    api
      .post("/user", { requiredPermission: "Create Users" })
      .then((res) => {
        res.data.user.forEach((val) => {
          i++;
          let temp = {
            id: i,
            enrollmentNumber: val.enrollmentNumber,
            name: val.firstName + " " + val.lastName,
            email: val.email,
            role: val.role?.name,
            _id: val._id
          };
          datalist.push(temp);
        });
        const { tableData } = this.state;
        tableData["data"] = datalist;
        this.setState({ tableData, loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
      api
      .post("/role", { requiredPermission: "Create Roles" })
      .then((res) => {
        this.setState({allroles: res.data.role})
      })
      .catch((err) => {
        console.log(err);
      });
  }
  createUser = () => {
    const {user} = this.state;
    api.post('/user/register', {...user, requiredPermission: "Create Users"}).then((res) => {
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  }
  render() {
    return (
      <div>
        <button
          className="btn add-button"
          data-bs-toggle="modal"
          data-bs-target="#adduser"
        >
          Add a user
        </button>
        <DataTableExtensions {...this.state.tableData}>
          <DataTable
            noHeader
            defaultSortField="id"
            defaultSortAsc={true}
            filterPlaceholder="Search"
            responsive
            pagination
            highlightOnHover
            progressPending={this.state.loading}
          />
        </DataTableExtensions>
        <Modal target="adduser" heading="Add a user">
          <form>
            <div className="form-group ">
              <label className="form-label">Email: </label>
              <input
                className="form-control"
                placeholder="abc@example.com"
                type="text"
                value={this.state.user.email}
                onChange={(e) => {
                  const { user } = this.state;
                  user.email = e.target.value;
                  this.setState({ user });
                }}
              />
            </div>

            <div className="form-group ">
              <label className="form-label">Role: </label>
              <select
                className="form-control"
                type="text"
                value={this.state.user.role}
                onChange={(e) => {
                  const { user } = this.state;
                  user.role = e.target.value;
                  this.setState({ user });
                }}
              >
                <option value="">Please select a role</option>
                {this.state.allroles?.map((role, key)=>{
                  return <option value={role._id} key={key}>{role.name}</option>
                })}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Enrollment no.: </label>
              <input
                className="form-control"
                placeholder="12115002718"
                type="text"
                value={this.state.user.enrollmentNumber}
                onChange={(e) => {
                  const { user } = this.state;
                  user.enrollmentNumber = e.target.value;
                  this.setState({ user });
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password: </label>
              <input
                className="form-control"
                placeholder="***"
                type="text"
                value={this.state.user.password}
                onChange={(e) => {
                  const { user } = this.state;
                  user.password = e.target.value;
                  this.setState({ user });
                }}
              />
            </div>
            <button
              className="btn btn-primary add-button mt-2"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.createUser()
              }}
            >
              Add
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}
