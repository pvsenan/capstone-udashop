import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import {useAuth0} from '../react-auth0-spa'
import { useHistory } from 'react-router-dom';


const CartTotals = ({value}) => {
    const {
      cartTotalAmount,
      cart,
      clearCart,
      pay,
      completedOrder
    } = value;
    const emptyCart = cart.length === 0 ? true : false;
    const { token } = useAuth0()
    let history = useHistory()

    return (
      <React.Fragment>
        {!emptyCart && (
          <div className="container">
            <div className="row">
              <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                <Link to="/">
                  <button
                    className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    type="button"
                    onClick={() => {
                      clearCart();
                    }}
                  >
                    clear cart
                  </button>
                </Link>
                <h5>
                  <span className="text-title"> total :</span>{" "}
                  <strong>SEK {cartTotalAmount} </strong>
                </h5>
                <div><Button color="success" onClick={ async ()=>{
                  const result = await pay(token)
                  if(result)
                   {history.push("/confirm")}
                }
                  } >Pay</Button></div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }

export default CartTotals