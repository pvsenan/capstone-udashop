import React, { Component } from "react";
import axios from 'axios'
import {apiEndpoint} from '../config'
import Title from "./Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class Orders extends Component {
  state = {
    orders: []
  }
  async componentDidMount(){
    const token = this.props.value
    const userToken = `Bearer ${token}`
    await this.fetchOrders(userToken)
  }

  async fetchOrders(userToken){
    const result =  await axios.get(`${apiEndpoint}/order`,{
      headers: {
          'Authorization': `${userToken}`
        }})

    this.setState(() => ({ orders:result.data.item }))
  }

  async deleteOrder(orderId){
    const token = this.props.value
    const userToken = `Bearer ${token}`
    await axios.delete(`${apiEndpoint}/order/${orderId}`,{
      headers: {
          'Authorization': `${userToken}`,
        },})
     
    await this.fetchOrders(userToken);
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
          <div className="col-md border">
           Delete Order
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
                <div className="col-md border align-center">
                 <button onClick={()=>this.deleteOrder(item.orderId)}>Delete</button>
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
