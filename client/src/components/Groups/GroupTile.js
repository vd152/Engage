import React from 'react';

class GroupTile extends React.Component {
    render(){
        return(
            <div className="col-md-3 grouptile text-center">
                <h6>name</h6>
                <img src="/assets/images/group-hover.png" className="group-img" alt="Group"/>
                <p className="group-text ">Owner: </p>
            </div>
        )
    }
}

export default GroupTile;