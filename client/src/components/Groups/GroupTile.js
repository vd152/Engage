import React from 'react';

class GroupTile extends React.Component {
    render(){
        return(
            <div className="col-md-3 grouptile text-center">
                <h6>{this.props.group.name}</h6>
                <img src="/assets/images/group-hover.png" className="group-img" alt="Group"/>
                <p className="group-text ">Owner: {this.props.group.createdBy?.firstName + " "+ this.props.group.createdBy?.lastName}</p>
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary view-button m-2">View Classes</button>
                    <button className="btn btn-primary leave-button m-2">Leave</button>
                </div>
            </div>
        )
    }
}

export default GroupTile;