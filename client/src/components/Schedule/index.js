import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { connect } from "react-redux";
import Modal from "../Modal";
import DateTimePicker from "react-datetime-picker";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import api from "../../apis/api";
import {setActive} from '../../redux/actions/SidebarActions'
class Schedule extends React.Component {
  state = {
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
              data-bs-target={row.mode == "owner"?"#viewvotes": "#castvote"}
            >{row.mode == "owner"? "View Selections": "Select Mode"}</button>
          ),
        },
      ],
      data: [],
    },
  };
  componentDidMount() {
    if(this.props.location.groupid){
      this.props.setActive("Schedule");

      let group = this.props.user?.groups.find(ele=> ele._id === this.props.location.groupid)
      this.setState({selectedGroup: group, selectedGroupName: group.name},()=>this.handleSelect())

    }
  }
  createSchedule = () => {
    api
      .post("/schedule", {
        from: this.state.from,
        to: this.state.to,
        group: this.state.selectedGroup._id,
        totalSeats: this.state.selectedGroup.users.length ,
        requiredPermission: "Create Schedule",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });
  };
  handleSelect = () => {
    this.setState({ loading: true });
    const datalist = [];
    let url = "/schedule/" + this.state.selectedGroup._id;
    api
      .get(url)
      .then((res) => {
        res.data.schedule.forEach((val) => {
          let temp = {
            from: new Date(val.from).toLocaleDateString("en-GB") + " " +new Date(val.from).toLocaleTimeString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true }),
            to: new Date(val.to).toLocaleDateString("en-GB") + " " +new Date(val.to).toLocaleTimeString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true }),
            _id: val._id,
            createdBy: val.createdBy?.firstName + " " + val.createdBy?.lastName,
          };
          if(val.createdBy._id == this.props.user._id){
            temp.mode = "owner"
          }
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
              onClick={(e) => {
                e.preventDefault();
                this.createSchedule();
              }}
            >
              Schedule
            </button>
          </form>
        </Modal>
        <Modal target="viewvotes" heading="Class Mode Selections"></Modal>
        <Modal target="castvote" heading="Select Class Mode"></Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.currentUser.user,
  };
};
export default connect(mapStateToProps, {setActive})(Schedule);
