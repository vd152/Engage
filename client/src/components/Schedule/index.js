import React from "react";
import { FaAngleDown, FaTrashAlt } from "react-icons/fa";
import { connect } from "react-redux";
import Modal from "../Modal";
import DateTimePicker from "react-datetime-picker";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import api from "../../apis/api";
import { setActive } from "../../redux/actions/SidebarActions";
import Loader from "../Main/Loader";
import { toast } from "react-toastify";
class Schedule extends React.Component {
  state = {
    selectedSchedule: "",
    loader: false,
    mode: "online",
    loading: false,
    selectedGroupName: "",
    selectedGroup: {},
    from: new Date(),
    to: new Date(),
    totalSeats: "",
    tableData: {
      columns: [
        {
          name: "Starts on",
          selector: (row) => row.from,
          sortable: true,
        },
        {
          name: "Ends at",
          selector: (row) => row.to,
          sortable: true,
        },
        {
          name: "Owner",
          selector: (row) => row.createdBy,
          sortable: true,
        },
        {
          name: "Mode",
          selector: (row) => row.mode,
          cell: (row) => (
            <button
              className="row-btn"
              data-bs-toggle="modal"
              data-bs-target={row.mode == "owner" ? "#viewvotes" : "#castvote"}
              onClick={(e) => {
                e.preventDefault();
                this.setState({ selectedSchedule: row._id }, () => {
                  if (row.mode === "owner") this.getVotes();
                });
              }}
            >
              {row.mode == "owner" ? "View Selections" : "Select Mode"}
            </button>
          ),
        },
        {
          cell: (row) =>
            this.props.user._id === row.owner?._id ||
            this.props.user.isAdmin ? (
              <button
                className="row-btn"
                onClick={(e) => {
                  e.preventDefault();
                  this.deleteSchedule(row);
                }}
              >
                <FaTrashAlt />
              </button>
            ) : (
              ""
            ),
        },
      ],
      data: [],
    },
    offlinevotes: [],
    onlinevotes: [],
  };
  componentDidMount() {
    if (this.props.location.groupid) {
      this.props.setActive("Schedule");

      let group = this.props.user?.groups.find(
        (ele) => ele._id === this.props.location.groupid
      );
      this.setState(
        { selectedGroup: group, selectedGroupName: group.name },
        () => this.handleSelect()
      );
    }
  }
  createSchedule = () => {
    this.setState({ loader: true });
    api
      .post("/schedule", {
        from: this.state.from,
        to: this.state.to,
        group: this.state.selectedGroup._id,
        totalSeats: this.state.selectedGroup.users.length,
        requiredPermission: "Create Schedule",
      })
      .then((res) => {
        this.handleSelect();
        toast("Schedule created");
        this.setState({ loader: false });
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);

        this.setState({ loader: false });
      });
  };
  handleSelect = () => {
    this.setState({ loading: true, loader: true });
    const datalist = [];
    let url = "/schedule/" + this.state.selectedGroup._id;
    api
      .get(url)
      .then((res) => {
        res.data.schedule.forEach((val) => {
          let temp = {
            from:
              new Date(val.from).toLocaleDateString("en-GB") +
              " " +
              new Date(val.from).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }),
            to:
              new Date(val.to).toLocaleDateString("en-GB") +
              " " +
              new Date(val.to).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }),
            _id: val?._id,
            createdBy: val.createdBy?.firstName + " " + val.createdBy?.lastName,
            owner: val.createdBy,
          };
          if (val.createdBy?._id == this.props.user?._id) {
            temp.mode = "owner";
          }
          datalist.push(temp);
        });
        const { tableData } = this.state;
        tableData["data"] = datalist;
        this.setState({ tableData, loading: false, loader: false });
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);

        this.setState({ loading: false, loader: false });
      });
  };
  vote = () => {
    this.setState({ loader: true });

    api
      .post("/schedule/vote", {
        id: this.state.selectedSchedule,
        mode: this.state.mode,
      })
      .then((res) => {
        toast("Voted successfully");
        this.setState({ loader: false });
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);

        this.setState({ loader: false });
      });
  };
  getVotes = () => {
    api
      .post("/schedule/vote/get", { id: this.state.selectedSchedule })
      .then((res) => {
        this.setState({
          offlinevotes: res.data?.offline,
          onlinevotes: res.data?.online,
        });
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);
      });
  };
  deleteSchedule = (row) => {
    this.setState({ loader: true });
    if (this.props.user?._id === row.owner?._id) {
      let url = "/schedule/" + row._id;
      api
        .delete(url)
        .then((res) => {
          toast("Scheduled class deleted");
          this.handleSelect();
          this.setState({ loader: false });
        })
        .catch((err) => {
          toast.error(`${err.response?.data?.message}`);
          this.setState({ loader: false });
        });
    } else if (this.props.user.isAdmin) {
      let url = "/schedule/admin/" + row._id;
      api
        .post(url, { requiredPermission: "Delete Schedule" })
        .then((res) => {
          toast("Scheduled class deleted");
          this.handleSelect();
          this.setState({ loader: false });
        })
        .catch((err) => {
          toast.error(`${err.response?.data?.message}`);
          this.setState({ loader: false });
        });
    }
  };
  render() {
    if (this.state.loader) return <Loader />;
    return (
      <div
        className={
          window.innerHeight < window.innerWidth
            ? "center-container "
            : "center-container-bottom"
        }
      >
        <div className="d-flex justify-content-between">
          <h3 className="page-heading">My Schedule</h3>
          <div className="btn-container">
            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle p-2"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {this.state.selectedGroupName != ""
                  ? this.state.selectedGroupName
                  : "Choose group"}
                <FaAngleDown />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="dropdownMenuButton2"
              >
                {this.props.user?.groups?.map((group, key) => {
                  return (
                    <li
                      key={key}
                      onClick={(e) => {
                        this.setState(
                          {
                            selectedGroup: group,
                            selectedGroupName: group.name,
                          },
                          () => {
                            this.handleSelect();
                          }
                        );
                      }}
                    >
                      <p className="dropdown-item">
                        {group.name + " (" + group.code + ")"}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center m-0">
          {this.state.selectedGroupName == "" ? (
            <p className="w-auto">Please choose a group</p>
          ) : (
            <React.Fragment>
              <div className="col-12">
                <button
                  className="btn add-button"
                  data-bs-toggle="modal"
                  data-bs-target="#createclass"
                >
                  Create Class
                </button>
              </div>
              <div className="col-12 my-2">
                <DataTableExtensions {...this.state.tableData}>
                  <DataTable
                    noHeader
                    defaultSortField="from"
                    defaultSortAsc={true}
                    filterPlaceholder="Search"
                    responsive
                    pagination
                    highlightOnHover
                    progressPending={this.state.loading}
                  />
                </DataTableExtensions>
              </div>
            </React.Fragment>
          )}
        </div>
        <Modal target="createclass" heading="Create Class">
          <form>
            <div className="form-group">
              <label className="form-label">From: </label>
              <DateTimePicker
                className="form-control"
                onChange={(value) => {
                  this.setState({ from: value });
                }}
                value={this.state.from}
              />
            </div>
            <div className="form-group">
              <label className="form-label">To: </label>
              <DateTimePicker
                className="form-control"
                onChange={(value) => {
                  this.setState({ to: value });
                }}
                value={this.state.to}
              />
            </div>
            <button
              className="btn btn-primary add-button mt-2"
              data-bs-dismiss="modal"
              onClick={(e) => {
                e.preventDefault();
                this.createSchedule();
              }}
            >
              Schedule
            </button>
          </form>
        </Modal>
        <Modal target="viewvotes" heading="Class Mode Selections">
          <div className="row  justify-content-between">
            <div className="col-6 text-center">
              <h6>Offline ({this.state.offlinevotes.length})</h6>
              {this.state.offlinevotes?.map((vote, key) => {
                return (
                  <p key={key}>
                    {vote.id?.firstName + " " + vote.id?.lastName}
                  </p>
                );
              })}
            </div>
            <div className="col-6 text-center">
              <h6>Online ({this.state.onlinevotes.length})</h6>
              {this.state.onlinevotes?.map((vote, key) => {
                return (
                  <p key={key}>
                    {vote.id?.firstName + " " + vote.id?.lastName}
                  </p>
                );
              })}
            </div>
          </div>
        </Modal>
        <Modal target="castvote" heading="Select Class Mode">
          <form>
            <div className="form-group">
              <label className="form-label">choose mode: </label>

              <select
                className="form-control"
                value={this.state.mode}
                onChange={(e) => {
                  this.setState({ mode: e.target.value });
                }}
              >
                <option value="online">Online</option>
                {this.props.user?.vaccinationStatus && (
                  <option value="offline">Offline</option>
                )}
              </select>
              <span className="text-muted">Students with verified vaccination status can only vote for offline classes.</span>
            </div>
            <button
              className="btn btn-primary add-button mt-2"
              data-bs-dismiss="modal"
              onClick={(e) => {
                e.preventDefault();
                this.vote();
              }}
            >
              Vote
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
export default connect(mapStateToProps, { setActive })(Schedule);
