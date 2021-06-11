import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { initializeLogger } from "./common/logger";

const App = () => {
  useEffect(() => {
    initializeLogger();
  }, []);

  return (
    // <Router>
    //   <Switch>
    //     <Route exact path="/" render={() => <div>Home</div>} />
    //     <Route exact path="/about" render={() => <div>About</div>} />
    //   </Switch>
    // </Router>
    <h1>This is App.js</h1>
  );
};

export default App;
