import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.less";
import Content from "./Content";
import Login from "./components/Login";
import GlobalStyles from "./utils/GlobalStyles";

const App = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route exact path="/login/:userType" component={Login} />
        <Route exact path="/signup/:userType" component={Login} />
        <Route path="/" component={Content} />
      </Switch>
    </Router>
    <GlobalStyles />
  </div>
);

export default App;
