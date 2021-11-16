import React from 'react';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import api from '../../apis/api'
import {format} from 'timeago.js'
export default class Role extends React.Component {
    state={
        tableData: {
            columns: [
              {
                name: "Id",
                selector: row=>row.id,
                sortable: true,
                width: "60px"
              },
              {
                name: "Role",
                selector: row=>row.role,
                sortable: true,
              },
              {
                name: "Created",
                selector: row=>row.created,
                sortable: true,
              }
            ],
            data: [],
          },
    }
    componentDidMount(){
        const datalist = []
        var i = 0
        api.post('/role', {requiredPermission: "Create Role"}).then(res=>{
            res.data.role.forEach(val=>{
                i++;
                let temp = {
                    id: i,
                    role: val.name,
                    created: format(val.createdAt)
                }
                datalist.push(temp)
            })
            const { tableData } = this.state;
            tableData["data"] = datalist;
            this.setState({ tableData });
        }).catch(err=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                              <button className="btn add-button">Add a role</button>
            <DataTableExtensions {...this.state.tableData}>
                <DataTable
                  noHeader
                  defaultSortField="id"
                  defaultSortAsc={true}
                  filterPlaceholder="Search"
                  onSelectedRowsChange={(selected) => {
                    
                  }}
                  responsive
                  pagination
                  selectableRows
                  onRowClicked={(index) => {
                    
                  }}
                  pointerOnHover
                  highlightOnHover
                />
              </DataTableExtensions>
            </div>
        )
    }
}
