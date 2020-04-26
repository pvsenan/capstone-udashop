import React, { Fragment } from "react";
import { useAuth0 } from '../react-auth0-spa'
import Hero from "../components/Hero";
import Content from "../components/ProductList";


const Home = () => (
  <Fragment>
    <Content/>
  </Fragment>
);

export default Home;
