import React from "react";

class SinglePost extends React.Component {
    render() {
        return (
            
            <div><button onClick={(e) => {
                e.preventDefault();
                this.props.back("");
              }}>Back</button></div>
        )
    }
}
export default SinglePost;