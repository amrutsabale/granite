import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { initializeLogger } from "./common/logger";
import Dashboard from "./components/Dashboard";

const App = () => {
  useEffect(() => {
    initializeLogger();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
