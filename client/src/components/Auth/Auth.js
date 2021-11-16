import React from "react";
import "./auth.css";
import api from '../../apis/api';
import {setAuthToken, setUser} from '../../utils/localStorage'
import {Redirect} from 'react-router-dom'
class Auth extends React.Component {
  state={
    email: "",
    password: "",
    redirect: false
  }

  handleLogin = () =>{
    api.post('/user/login', {email: this.state.email, password: this.state.password}).then(res=>{
      setAuthToken(res.data.token)
      setUser(res.data.user._id)
      this.setState({redirect: true})
    }).catch(err=>{
      console.log(err)
    })
  }
  render() {
    if(this.state.redirect) window.location.reload()
    return (
      <div className="auth">
        <div className="auth__header">
          <div className="auth__logo">
            <img
              height={100}
              src="/assets/images/user-default.png"
              alt="user"
            />
          </div>
        </div>
        <div className="auth__body">
          <form className="auth__form">
            <div className="auth__form_body">
              <h3 className="auth__form_title">Sign in</h3>
              <div>
                <div className="form-group my-2">
                  <label className=" small">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={(e)=>this.setState({email: e.target.value})}
                  />
                </div>
                <div className="form-group my-2">
                  <label className=" small">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e)=>this.setState({password: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="auth__form_actions">
              <button className="btn btn-primary btn-lg btn-block" onClick={(e)=>{
                e.preventDefault();
                this.handleLogin()
              }}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default (Auth);
