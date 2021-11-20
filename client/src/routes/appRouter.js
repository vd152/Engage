import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import Main from "../components/Main";
import UserRoles from "../components/UsersRoles";
import PrivateRoute from "./privateRoutes";
import PublicRoute from "./publicRoutes";
import { connect } from "react-redux";
import {currentUser} from '../redux/actions/UserActions'
import {getUser} from '../utils/localStorage'
import Groups from "../components/Groups";
import Schedule from "../components/Schedule";
import Forum from "../components/Forum";
class router extends React.Component {
  componentDidMount() {
    if(getUser())
      this.props.currentUser(getUser())
  }
  render(){
    return (
      <Router>
      <Switch>
        <PublicRoute exact path="/login" component={Auth} />
        <PrivateRoute exact path="/" component={Main} />
        <PrivateRoute exact path="/groups" component={Groups}/>
        <PrivateRoute exact path="/schedule" component={Schedule}/>
        <PrivateRoute exact path="/forum" component={Forum}/>
        <PrivateRoute exact path="/user-role" component={UserRoles}/>
      </Switch>
    </Router>
    )
  }
}
const mapStateToProps = (state) =>{
  return {
    user: state.currentUser.user
  }
}
export default connect(mapStateToProps, {currentUser})(router);
