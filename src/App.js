import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
    <Switch>
      {/* <PrivateRoute path="/admin">
        <Admin />
      </PrivateRoute> */}
      {/* <PrivateRoute path="/panel/:adminPanel">
        <Admin />
      </PrivateRoute> */}
      {/* <Route path="/login">
        <Login />
      </Route> */}
      <div>
        <Header/>
        <Route exact path="/">
          
        </Route>
        <Route path="/deals">
          <Home />
        </Route>
        {/* <PrivateRoute path="/checkout">
          
        </PrivateRoute>
        <PrivateRoute path="/Orderss">
          
        </PrivateRoute> */}
      </div>
    </Switch>
  </Router>
  );
}

export default App;
