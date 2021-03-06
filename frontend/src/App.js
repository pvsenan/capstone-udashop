import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import Details from "./components/Details";
import Cart from './components/Cart'
import Orders from "./components/Orders";
import OrderConfirmation from "./components/OrderConfirmation";
initFontAwesome();

const App = () => {
  const { loading, isAuthenticated, token } = useAuth0();
  
  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar auth={isAuthenticated}/>
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/details" component={Details}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/orders" component={()=><Orders value={token}/>} />
            <Route path="/confirm" component={OrderConfirmation}/>
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
};

export default App;
