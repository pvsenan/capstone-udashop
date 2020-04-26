import React, { Component } from "react";
import { ProductConsumer } from "../context/context";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth0} from "../react-auth0-spa";


const Details = () =>  {
  const { isAuthenticated } = useAuth0()
    return (
      <ProductConsumer>
        {value => {
          const {
            id,
            img,
            description,
            price,
            name,
          } = value.detailProduct;

          return (
            <div className="container py-5">
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{name}</h1>
                </div>
              </div>
              {/* end of title */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={img} className="img-fluid" alt="" />
                </div>
                {/* prdoduct info */}
                <div className="col-10 mx-auto col-md-6 my-3">
                  <h4 className="red">
                    <strong>
                      Price : <span>SEK </span>
                      {price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Product description :
                  </p>
                  <p className="text-muted lead">{description}</p>
                  {/* buttons */}
                  <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="m-3">
                    <Link to="/">
                     <Button color="secondary">back to products</Button>
                     </Link>
                     </div>
                    <div className="m-3">
                    <Button
                      cart
                      color={isAuthenticated?"success":"secondary"}  
                      disabled={isAuthenticated ? false : true}
                      onClick={() => {
                        value.addToCart(id);
      
                      }}
                    >
                      Add to cart
                    </Button>
                    </div>  
               

                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
}

export default Details