import React from 'react';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import api from '../../apis/api'
import {FaEdit,FaTrashAlt } from 'react-icons/fa'

export default class User extends React.Component {
    state={
      loading: false,
        tableData: {
            columns: [
              {
                name: "Id",
                selector: row=>row.id,
                sortable: true,
                width: "60px"
              },
              {
                name: "Enrollment Number",
                selector: row=>row.enrollmentNumber,
                sortable: true,
              },
              {
                name: "Name",
                selector: row=>row.name,
                sortable: true,
              },
              {
                name: "Email",
                selector: row=>row.email,
                sortable: true,
              },
              {
                name: "Role",
                selector: row=>row.role,
                sortable: true,
              },
              { 
                name: "Edit",
                width: "60px",
                cell: (row)=> <button className=" row-btn" onClick={(e)=>{e.preventDefault();
                  this.handleEdit(row)
                }}><FaEdit /></button>
              },
              { 
                name: "Delete",
                width: "60px",
                cell: (row)=> <button className=" row-btn" onClick={(e)=>{e.preventDefault();
                  this.handleDelete(row)
                }}><FaTrashAlt /></button>
              }
            ],
            data: [],
          },
    }
    handleEdit = (row) => {
      console.log(row)
    }
    handleDelete = (row) =>{
      
    }
    componentDidMount(){
      this.setState({loading: true})
        const datalist = []
        var i = 0
        api.post('/user', {requiredPermission: "Create Users"}).then(res=>{
            res.data.user.forEach(val=>{
                i++;
                let temp = {
                    id: i,
                    enrollmentNumber: val.enrollmentNumber,
                    name: val.firstName + " " + val.lastName,
                    email: val.email, 
                    role: val.role?.name
                }
                datalist.push(temp)
            })
            const { tableData } = this.state;
            tableData["data"] = datalist;
            this.setState({ tableData, loading: false});
        }).catch(err=>{
            console.log(err)
            this.setState({loading: false});

        })
    }
    render(){
        return(
            <div>
                <button className="btn add-button">Add a user</button>
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
            </div>
        )
    }
}
