import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import api from "../../apis/api";
import { format } from "timeago.js";
import Modal from "../Modal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Permission from "./Permissions";
import Loader from "../Main/Loader";
import { toast } from "react-toastify";
export default class Role extends React.Component {
  state = {
    loading: false,
    loader: false,
    edit: false,
    editid: "",
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
                const { role } = this.state;
                role.name = row.role;
                role.permissions = role.permissions;
                this.setState({ role, editid: row._id, edit: true }, () => {
                  document.querySelector("#editrolebtn").click();
                });
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

    this.setState({ role });
  };
  componentDidMount() {
    this.getRoles();
  }
  getRoles = () => {
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
        toast.error(`${err.response?.data?.message}`);

        this.setState({ loading: false });
      });
  };
  createRole = () => {
    this.setState({ loading: true });
    api
      .post("/role/add", {
        name: this.state.role.name,
        permissions: this.state.role.permissions,
        requiredPermission: "Create Roles",
      })
      .then((res) => {
        this.getRoles();
        toast("Role created.");
        this.setState({ loading: false });
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);

        this.setState({ loading: false });
      });
  };
  deleteRole = (row) => {
    this.setState({ loading: true });

    api
      .post("/role/delete", { id: row._id, requiredPermission: "Delete Roles" })
      .then((res) => {
        this.getRoles();
        toast("Role deleted.");
        this.setState({ loading: false });
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);

        this.setState({ loading: false });
      });
  };
  editRole = () => {
    this.setState({ loading: true });

    let url = "/role/" + this.state.editid;
    api
      .put(url, { role: this.state.role, requiredPermission: "Edit Roles" })
      .then((res) => {
        this.getRoles();
        toast("Role edited.");
        this.setState({ loading: false });
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);

        this.setState({ loading: false });
      });
  };
  getPermission = () => {
    return (
      <React.Fragment>
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
          heading="Schedule"
          attributes={["Create", "Edit", "Delete"]}
          suffix="Schedule"
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
      </React.Fragment>
    );
  };
  render() {
    if (this.state.loader) return <Loader />;
    return (
      <div>
        <button
          className="btn add-button"
          id="addrolebtn"
          data-bs-toggle="modal"
          data-bs-target="#addrole"
          onClick={(e) => {
            const { role } = this.state;
            role.name = "";
            role.permissions = [];
            this.setState({ edit: false, role });
          }}
        >
          Add a role
        </button>
        <button
          className="btn add-button"
          id="editrolebtn"
          style={{ visibility: "hidden" }}
          data-bs-toggle="modal"
          data-bs-target="#addrole"
        ></button>

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
        <Modal
          target="addrole"
          heading={this.state.edit ? "Edit Role" : "Add Role"}
        >
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
            {this.state.edit && (
              <p className="mb-0 mt-2 mx-0">Permissions will be overwritten</p>
            )}
            <div className="form-group py-2">
              <label className="form-label">Permissions: </label>
              {this.getPermission()}
            </div>
            {this.state.edit ? (
              <button
                className="btn btn-primary add-button mt-2"
                type="submit"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  this.editRole();
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
                  this.createRole();
                }}
              >
                Add
              </button>
            )}
          </form>
        </Modal>
      </div>
    );
  }
}
