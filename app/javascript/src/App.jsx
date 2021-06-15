import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { either, isEmpty, isNil } from "ramda";
import Dashboard from "components/Dashboard";
import PageLoader from "components/PageLoader";
import CreateTask from "components/Tasks/CreateTask";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import ShowTask from "components/Tasks/ShowTask";
import EditTask from "components/Tasks/EditTask";
import Signup from "components/Authentication/Signup";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import { getFromLocalStorage } from "helpers/storage";
import { initializeLogger } from "common/logger";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    registerIntercepts();
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/tasks/:slug/edit" component={EditTask} />
        <Route exact path="/tasks/:slug/show" component={ShowTask} />
        <Route exact path="/tasks/create" component={CreateTask} />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
};

export default App;
