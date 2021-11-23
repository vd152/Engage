import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import api from "../../apis/api";
import { format } from "timeago.js";
import Modal from "../Modal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {connect } from "react-redux"

 class Forum extends React.Component {
  state = {
    loading1: false,
    loading2: false,
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
              //   onClick={(e) => {
              //     e.preventDefault();
              //     this.handleEdit(row);
              //   }}
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
              //   onClick={(e) => {
              //     e.preventDefault();
              //     this.deleteRole(row._id);
              //   }}
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
                //   onClick={(e) => {
                //     e.preventDefault();
                //     this.handleEdit(row);
                //   }}
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
                //   onClick={(e) => {
                //     e.preventDefault();
                //     this.deleteRole(row._id);
                //   }}
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
    allgroups: []
  };
  componentDidMount() {
      this.setState({loading1: true, loading2: true});
      const {allCategories} = this.state
      api.get('/forum/category').then(res=>{
        const datalist = [];
        var i = 0;
          res.data.categories.forEach(val =>{
            i++;
            let temp = {
              id: i,
              name: val.name,
              group: val.group?.name?val.group?.name:"General",
              _id: val._id,
              created: format(val.createdAt),
            };
            datalist.push(temp);
            allCategories.push(val)
          })

          const { tableDataCat } = this.state;
          tableDataCat["data"] = datalist;
          this.setState({ tableDataCat, allCategories, loading1: false });
      }).catch(err => {
          console.log(err)
          this.setState({loading1: false})
      })

      api.get('/forum/topic').then(res=>{
        const datalist = [];
        var i = 0;
          res.data.topics.forEach(val =>{
            i++;
            let temp = {
              id: i,
              name: val.name,
              category: val.parentCategory?.name,
              _id: val._id,
              created: format(val.createdAt),
            };
            datalist.push(temp);
          })

          const { tableDataTopic } = this.state;
          tableDataTopic["data"] = datalist;
          this.setState({ tableDataTopic, loading2: false });
      }).catch(err => {
          console.log(err)
          this.setState({loading2: false})
      })

      api.get('/group').then(res=>{
        this.setState({allgroups : res.data?.groups})
      }).catch(err=>{
        console.log(err)
      })
  }
  createCategory = () => {
      api.post('/forum/category', {name: this.state.catName, group: this.state.group == ""?null:this.state.group, requiredPermission: "Create Categories"}).then(res=>{
          console.log(res)
      }).catch(err=>{
          console.log(err)
      })
  }
  createTopic = () => {
    api.post('/forum/topic', {name: this.state.topicName, parentCategory: this.state.selectedCategory, requiredPermission: "Create Topics"}).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })

  }
  render() {
    return (
      <div>
        <button
          className="btn add-button"
          data-bs-toggle="modal"
          data-bs-target="#addcat"
        >
          Add a category
        </button>
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
        >
          Add a topic
        </button>
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
        <Modal target="addcat" heading="Add a Forum Category">
        <form>
          <div className="form-group">
            <label className="form-label">Group: </label>
            <select className="form-control" value={this.state.group} onChange={(e)=>{this.setState({group: e.target.value})}}>
              <option value="">Please select a group</option>
              {this.state.allgroups.map((group, key)=>{
                return <option value={group._id} key={key}>{group.name}</option>
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
                onChange={(e)=>{this.setState({catName: e.target.value})}}
              />
            </div>

            
            <button
              className="btn btn-primary add-button mt-2"
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                this.createCategory()
              }}
            >
              Create
            </button>
          </form>
        </Modal>
        <Modal target="addtopic" heading="Add a Forum Topic">
        <form>
            <div className="form-group">
            <label className="form-label">Parent Category: </label>
                <select className="form-control"
                    value={this.state.selectedCategory}
                    onChange={(e)=>{this.setState({selectedCategory: e.target.value})}}
                >
                    <option value="">Please select a category</option>  
                    {this.state.allCategories.map((cat,key)=>{
                        return <option value={cat._id} key={key}>{cat.name}</option>
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
                onChange={(e)=>{this.setState({topicName: e.target.value})}}
              />
            </div>
            <button
              className="btn btn-primary add-button mt-2"
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                this.createTopic()
              }}
            >
              Create
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
    return {
      user: state.currentUser.user,
      categories: state.forumCategories?.categories
    }
  }
  export default connect(mapStateToProps)(Forum);
