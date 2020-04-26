import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context/context";
import { useAuth0} from "../react-auth0-spa";
import { Button } from "reactstrap";



const Product =({product})=> {

    const { id, name, img, price } = product;
    const { isAuthenticated } = useAuth0()

    return (
      <div className="col-9 mx-auto col-md-6 col-lg-4 my-3 ">
        <div className="card shadow-sm rounded">
          <ProductConsumer >
            {
            value => {
              return (
                
                <div
                  className="img-container p-5"
                  onClick={() => value.handleDetail(id)}
                >
                  <Link to="/details">
                    <img src={img} alt="" className="card-img-top" />
                  </Link>
                  <Button 
                    className="fa fas-shopping-cart" 
                    color={isAuthenticated?"success":"secondary"}                   
                    disabled={isAuthenticated ? false : true}
                    onClick={() => {
                      value.addToCart(id);
                    }}
                  >
                  Buy
                  </Button>
                </div>
              );
            }}
          </ProductConsumer>

          <div className="card-header d-flex justify-content-between">
            <p className="align-self-center mb-0">{name}</p>
            <h5 className="text-blue font-italic mb-0">
              <span className="mr-1">SEK </span>
              {price}
            </h5>
          </div>
        </div>
      </div>
    );
  }
export default Product

