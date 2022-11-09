import React, { createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPage from "./AdminPage";

export const UserContext = createContext();

function App() {

  return (
    <Router>
      <Switch>
          <Route exact path="/" component={AdminPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
