import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NavComp from "./components/NavComp";
import "bootstrap/dist/css/bootstrap.min.css";
import Student from "./components/Student";
import Mentor from "./components/Mentor";
import AssignStudent from "./components/AssignStudent";
import AssignMentor from "./components/AssignMentor";

function App() {
  return (
    <>
      <Router>
        <NavComp />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/student">
            <Student />
          </Route>
          <Route exact path="/mentor">
            <Mentor />
          </Route>
          <Route exact path="/assign-student">
            <AssignStudent />
          </Route>
          <Route exact path="/assign-mentor">
            <AssignMentor />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
