import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import Home from "../components/Home";
import PrivateRoute from "./privateRoutes";
import PublicRoute from "./publicRoutes";
import { connect } from "react-redux";
import { currentUser } from "../redux/actions/UserActions";
import { getForumCategories } from "../redux/actions/ForumActions";
import { getUser } from "../utils/localStorage";
import Groups from "../components/Groups";
import Schedule from "../components/Schedule";
import Forum from "../components/Forum";
import Profile from "../components/Profile";
import Manage from "../components/UsersRoles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Main/Loader";
class router extends React.Component {
  componentDidMount() {
    if (getUser()) {
      this.props.currentUser(getUser());
      this.props.getForumCategories();
    }
  }
  render() {
    if(this.props.loading) return <Loader />
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <PublicRoute exact path="/login" component={Auth} />
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/groups" component={Groups} />
            <PrivateRoute exact path="/schedule" component={Schedule} />
            <PrivateRoute exact path="/forum" component={Forum} />
            <PrivateRoute exact path="/manage" component={Manage} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </Router>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="dark"
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.currentUser.user,
    loading: state.currentUser.loading
  };
};
export default connect(mapStateToProps, { currentUser, getForumCategories })(
  router
);
