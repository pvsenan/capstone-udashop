import React, { Component } from "react";
import Title from "./Title";
import CartTotals from "./CartTotals";
import { ProductConsumer } from "../context/context";

export default class OrderConfirmation extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {value => {
              return (
                <React.Fragment>
                  <Title name="Thank you for your order" title=""/>
                  <hr></hr>
                  <Title name="Order number: " title={value.completedOrder}/>
                  <div></div>
                </React.Fragment>
              );

          }}
        </ProductConsumer>
      </section>
    );
  }
}
