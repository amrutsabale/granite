import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "components/Dashboard";
import CreateTask from "components/Tasks/CreateTask";
import { registerIntercepts } from "apis/axios";

const App = () => {
  useEffect(() => {
    registerIntercepts();
    /*eslint no-undef: "off"*/
    // initializeLogger();
    logger.info("Log from js-logger");
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/tasks/create" component={CreateTask} />
      </Switch>
    </Router>
  );
};

export default App;
