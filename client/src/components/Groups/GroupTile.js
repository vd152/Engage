import React from 'react';
import api from '../../apis/api'
class GroupTile extends React.Component {
    leaveGroup = (code) =>{ 
        api.post('/group/leave', {code}).then(res=>{
            console.log(res);
            window.location.reload();
          }).catch(err=>{
            console.log(err);
          })
    }
    render(){
        return(
            <div className="col-md-3 grouptile text-center">
                <h6>{this.props.group.name}</h6>
                <img src="/assets/images/group-hover.png" className="group-img" alt="Group"/>
                <p className="group-text ">Owner: {this.props.group.createdBy?.firstName + " "+ this.props.group.createdBy?.lastName}</p>
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary view-button m-2">View Classes</button>
                    <button className="btn btn-primary leave-button m-2" onClick={(e)=>{
                        e.preventDefault();
                        this.leaveGroup(this.props.group.code)
                    }}>Leave</button>
                </div>
            </div>
        )
    }
}

export default GroupTile;