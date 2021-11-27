import React from "react";
import { Link } from "react-router-dom";
import './index.css'

class Permission extends React.Component{

  setDefault = (perm, value) =>{
    if(this.props.editPermissions){
      const found = this.props.editPermissions.find(elem=>{
        return elem.name == perm
      })
      if(found && found.value == value){
        return true
      }
      return false
    }else{
      return false
    }
  }
    getAttributes = (name, key)=>{
        return(
            <div className="permission-row" key={key}>
                        <div className="row">
                          <div className="col-md-5 col-sm-4 col-6">
                            <span className="permission-label">
                              {name+ " "+this.props.suffix}
                            </span>
                          </div>
                          <div className="col-md-7 col-sm-8 col-6">
                            <div className="row">
                              <div className="radio-btn clearfix">
                                <div className="radio">
                                  <input
                                    type="radio"
                                    id={this.props.heading + "."+name+"-deny"}
                                    name={name+ " "+this.props.suffix}
                                    className="permission-deny"
                                    defaultChecked={this.setDefault(name+ " " +this.props.suffix, false)}
                                    value={false}
                                    onChange={(e)=>this.props.setVal(e.target.value, e.target.name)}

                                  />
                                  <label htmlFor={this.props.heading + "."+name+"-deny"}>
                                    Deny
                                  </label>
                                </div>
                                <div className="radio">
                                  <input
                                    type="radio"
                                    id={this.props.heading + "."+name+"-allow"}
                                    name={name+" "+this.props.suffix}
                                    className="permission-allow"
                                    value={true}
                                    defaultChecked={this.setDefault(name+ " " +this.props.suffix, true)}
                                    onChange={(e)=>this.props.setVal( e.target.value, e.target.name)}

                                  />
                                  <label htmlFor={this.props.heading + "."+name+"-allow"}>
                                    Allow
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
        );
    }
    render(){
        return(
            <div className="permission-group">
                <div className="row">
                  <div className="col-md-12">
                    <div className="permission-group-head">
                      <div className="row align-items-center">
                        <div className="col-md-5 col-sm-4 col-6">
                          <h6 className="m-0">{this.props.heading}</h6>
                        </div>
                        <div className="col-md-7 col-sm-8 col-6">
                          {/* <div className="btn-group permission-group-actions pull-right"> */}
                          <button
                              type="button"
                              className="btn btn-default deny-all"
                              onClick={()=>{
                                const arr = document.querySelectorAll('[id ^="' + this.props.heading +'"][id $="-deny"]' )
                                for(var i = 0; i < arr.length; i++){
                                  arr[i].click()
                                }
                              }}
                            >
                              Deny all
                            </button>
                            <button
                              type="button"
                              className="btn btn-default allow-all"
                              onClick={()=>{
                                const arr = document.querySelectorAll('[id ^="' + this.props.heading +'"][id $="-allow"]' )
                                for(var i = 0; i < arr.length; i++){
                                  arr[i].click()
                                }
                              }}
                            >
                              Allow all
                            </button>
                         

                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      {this.props.attributes.map((attribute, key)=>{
                          return this.getAttributes(attribute, key)

                      })}

                    </div>
                  </div>
                </div>
              </div>
        )
    }
}

export default Permission;