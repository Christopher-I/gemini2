import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./Pages/Dashboard";
import "./App.scss";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./State/Reducers";

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <Router>
      <div className="App">
        <Route exact path="/" component={App} />
        <Route exact path="/dashboard" component={Dashboard} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
