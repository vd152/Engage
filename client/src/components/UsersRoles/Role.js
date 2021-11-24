import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import api from "../../apis/api";
import { format } from "timeago.js";
import Modal from "../Modal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Permission from "./Permissions";
export default class Role extends React.Component {
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
          name: "Role",
          selector: (row) => row.role,
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
                this.deleteRole(row);
              }}
            >
              <FaTrashAlt />
            </button>
          ),
        },
      ],
      data: [],
    },
    role: {
      name: "",
      permissions: [],
    },
  };
  handleEdit = (row) => {
    console.log(row);
  };

  setVal = (val, permName) => {
    const { role } = this.state;
    var flag = true;
    const { permissions } = this.state.role;
    permissions.map((perm, index) => {
      if (perm["name"] == permName) {
        // Permissions.splice(perm, index)
        perm["value"] = JSON.parse(val);
        flag = false;
      }
    });
    if (flag) {
      permissions.push({ name: permName, value: JSON.parse(val) });
    }

    console.log(role);
    this.setState({ role });
  };
  componentDidMount() {
    this.setState({ loading: true });
    const datalist = [];
    var i = 0;
    api
      .post("/role", { requiredPermission: "Create Roles" })
      .then((res) => {
        res.data.role.forEach((val) => {
          i++;
          let temp = {
            id: i,
            role: val.name,
            _id: val._id,
            permission: val.permissions,
            created: format(val.createdAt),
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
  }
  createRole = () => {
    api.post('/role/add', {name: this.state.role.name, permissions: this.state.role.permissions, requiredPermission: "Create Roles"}).then(res=>{
      this.componentDidMount()
    }).catch((err) =>{
      console.log(err);
    })
  };
  deleteRole = (row) => {
    api.post('/role/delete', {id: row._id, requiredPermission: "Delete Roles"}).then(res=>{
      this.componentDidMount()
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
          data-bs-target="#addrole"
        >
          Add a role
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
        <Modal target="addrole" heading="Add Role">
          <form>
            <div className="form-group">
              <label className="form-label">Name: </label>
              <input
                className="form-control"
                placeholder="Eg. admin"
                type="text"
                value={this.state.role.name}
                onChange={(e) => {
                  const { role } = this.state;
                  role.name = e.target.value;
                  this.setState({ role });
                }}
              />
            </div>

            <div className="form-group py-2">
              <label className="form-label">Permissions: </label>
              <Permission
                heading="Users"
                attributes={["Create", "Edit", "Delete"]}
                suffix="Users"
                setVal={this.setVal}
                editPermissions={this.state.role.permissions}
              />
              <Permission
                heading="Roles"
                attributes={["Create", "Edit", "Delete"]}
                suffix="Roles"
                setVal={this.setVal}
                editPermissions={this.state.role.permissions}
              />
              <Permission
                heading="Groups"
                attributes={["Create", "Edit", "Delete"]}
                suffix="Groups"
                setVal={this.setVal}
                editPermissions={this.state.role.permissions}
              />
              <Permission
                heading="Forum Categories"
                attributes={["Create", "Edit", "Delete"]}
                suffix="Categories"
                setVal={this.setVal}
                editPermissions={this.state.role.permissions}
              />
              <Permission
                heading="Forum Topics"
                attributes={["Create", "Edit", "Delete"]}
                suffix="Topics"
                setVal={this.setVal}
                editPermissions={this.state.role.permissions}
              />
              <Permission
                heading="Forum Posts"
                attributes={["Create", "Edit", "Delete"]}
                suffix="Posts"
                setVal={this.setVal}
                editPermissions={this.state.role.permissions}
              />
              <Permission
                heading="Forum Comments"
                attributes={["Create", "Edit", "Delete"]}
                suffix="Comments"
                setVal={this.setVal}
                editPermissions={this.state.role.permissions}
              />
            </div>
            <button
              className="btn btn-primary add-button mt-2"
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                this.createRole();
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
