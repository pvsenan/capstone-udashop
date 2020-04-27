import React, { Component } from "react";
import axios from 'axios'
import {apiEndpoint} from '../config'
import Title from "./Title";


export default class Orders extends Component {
  state = {
    orders: []
  }
  async componentDidMount(){
    const token = this.props.value
    const userToken = `Bearer ${token}`
    console.log(userToken)
    const result =  await axios.get(`${apiEndpoint}/order`,{
      headers: {
          'Authorization': `${userToken}`
        }})

    this.setState(() => ({ orders:result.data.item }))
  }
  
  render() {
    const orders = this.state.orders;
    return (   
      <div>
        <Title name="My orders" title="" />
        <div className="container shadow">
        <div className="row min-height">
        <div className="col-md border">
          Order Number
        </div>
          <div className="col-md border">
           Created At
            </div>
         <div className="col-md border">
           Status
          </div>
        </div>
        
        {
          orders.map(item=>{
            return(
              <div className="row" key={item.orderId}>
              <div className="col-md border">
                {item.orderId}
              </div>
                <div className="col-md border">
                 {item.createdAt}
                  </div>
               <div className="col-md border">
                 Pending
                </div>
              </div>

            )
          })
        }
        </div>
      </div>
    );
  }
}
