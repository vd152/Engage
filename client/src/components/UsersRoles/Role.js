import React from 'react';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import api from '../../apis/api'

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
              }
            ],
            data: [],
          },
    }
    componentDidMount(){
        const datalist = []
        var i = 0
        // api.post('/user', {requiredPermission: "Create User"}).then(res=>{
        //     console.log(res.data.user)
        //     res.data.user.forEach(val=>{
        //         i++;
        //         let temp = {
        //             id: i,
        //             enrollmentNumber: val.enrollmentNumber,
        //             name: val.firstName + " " + val.lastName,
        //             email: val.email, 
        //             role: val.role?.name
        //         }
        //         datalist.push(temp)
        //     })
        //     const { tableData } = this.state;
        //     tableData["data"] = datalist;
        //     this.setState({ tableData });
        // }).catch(err=>{
        //     console.log(err)
        // })
    }
    render(){
        return(
            <div>
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
