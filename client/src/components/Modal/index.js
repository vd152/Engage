import React from 'react';
import './index.css'
class Modal extends React.Component {
    render(){
        return (
            <div
            className="modal fade"
            id={this.props?.target}
            tabIndex={-1}
            aria-labelledby="ModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header text-center">
                  <h5 className="modal-title" id="exampleModalLabel">
                    {this.props?.heading}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                    {this.props.children}
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default Modal