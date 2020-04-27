import React, { Component } from 'react'
import {apiEndpoint} from "../config";
import axios from 'axios'


const ProductContext = React.createContext();

class ProductProvider extends Component {
    state={
        products:[],
        detailProduct:[],
        cart:[],
        cartTotalAmount:0
    }

    componentDidMount(){
        this.setProducts();
    }
    setProducts = async ()=>{
        let tempProducts = [];
        const products = await this.getProducts()
        products.forEach(item=>{
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem];

        })
        this.setState(()=>{
            return {products: tempProducts}
        })
    }



    getItem = (id) =>{
        const product = this.state.products.find(item=> item.id === id)
        return product;
    }
    handleDetail = (id) =>{
      const product = this.getItem(id);
      this.setState(()=>{
          return {detailProduct:product}
      })
    }
    addToCart = (id) =>{
        let productToAdd = this.getItem(id)
        const cartItemIndex = this.state.cart.indexOf(productToAdd);
        if(cartItemIndex >= 0){
            this.state.cart[cartItemIndex].count += 1;
            const price = this.state.cart[cartItemIndex].price;
            this.state.cart[cartItemIndex].total = this.state.cart[cartItemIndex].count * price
        }else{
            productToAdd.count = 1;
            const price = productToAdd.price;
            productToAdd.total = price;
            let tempCart = this.state.cart;
            tempCart.push(productToAdd)
            this.setState(()=>{
            return { cart: [...tempCart ] }});
        }
    this.cartTotal();
    }

    increment=(id)=>{
        const tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item=> item.id === id)
        const index = tempCart.indexOf(selectedProduct);
        tempCart[index].count+=1;
        tempCart[index].total = tempCart[index].count * tempCart[index].price
        this.setState(
            ()=>{
                return{ cart: [...tempCart]}
            }
        )
                this.cartTotal(); 
    }

    decrement=(id)=>{
        const tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item=> item.id === id)
        const index = tempCart.indexOf(selectedProduct);
        tempCart[index].count -= 1;
        tempCart[index].total = tempCart[index].total - tempCart[index].price;
        if(tempCart[index].count === 0){
            this.removeItem(id)
        }else{
        this.setState(
            ()=>{
                return{ cart: [...tempCart]}
            }
        )
        this.cartTotal(); 
        }
    }

    removeItem=(id)=>{
        console.log(`Removing item with id ${id}`)
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item=> item.id === id)
        const filteredCart = tempCart.filter(function(item){
            return item !== selectedProduct;
        });
        this.setState(()=>{
                return{ cart: [...filteredCart]}
            }
   
        )
        this.cartTotal()
    }

    pay = async (token)=>{
        const userToken = `Bearer ${token}`
        const orderId = await this.getOrderId(userToken)
        const paymentId = await this.getPaymentId(userToken, orderId, this.state.cartTotalAmount)
        const createOrderResult = await this.createOrder(userToken, orderId, paymentId)
        this.setState(
            ()=>{
                return {completedOrder:createOrderResult.orderId}
            }
        )

        this.clearCart()
        return true;        
    }
    getProducts = async()=>{
        const result =  await axios.get(`${apiEndpoint}/products`)
        return  result.data.items;
    }

    getOrderId = async(token)=>{
        const result =  await axios.get(`${apiEndpoint}/orderId`,{
            headers: {
                'Authorization': `${token}`
              }
        })

        return  result.data.item;
    }
    getPaymentId = async(token, orderId, cartTotalAmount)=>{
        const options = {
            url: `${apiEndpoint}/payment`,
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': `${token}`
            },
            data: {
                "orderId": orderId,
                "orderAmount": cartTotalAmount
            }
          };
          
          const paymentId = axios(options)
            .then(response => {
              return response.data.item;
            });

            return paymentId;
    }

    createOrder = async(token, orderId, paymentId)=>{

        var cartToSubmit = JSON.parse(JSON.stringify( this.state.cart ));
    
        cartToSubmit.map(item=>{
            delete item.description;
            delete item.img;
            delete item.total;
        })

        const options = {
            url: `${apiEndpoint}/order`,
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': `${token}`
            },
            data: {
                "orderId": orderId,
                "items": cartToSubmit,
                "orderAmount": this.state.cartTotalAmount,
                "paymentId": paymentId
            }
          };
          
          const orderResponse = axios(options)
            .then(response => {
              return response.data.item;
            });

            return orderResponse;
    }

    cartTotal=()=>{
            let tempCart = [ ...this.state.cart ]
            let cartTotal = 0;
            tempCart.forEach(item=>{
                cartTotal+=item.count * item.price;
            })    
            this.setState(
                ()=>{
                    return {cartTotalAmount:cartTotal}
                }
            )   
        }    

    clearCart=()=>{
        this.setState(()=>{
            return{ cart: [], cartTotalAmount:0}
        }

    )
    }

    render(){
        return( 
            <ProductContext.Provider value={{
            ...this.state,
            handleDetail:this.handleDetail,
            addToCart:this.addToCart,
            increment:this.increment,
            decrement:this.decrement,
            removeItem:this.removeItem,
            clearCart:this.clearCart,
            cartTotal:this.cartTotal,
            pay:this.pay,
            getOrderId:this.getOrderId,
            getPaymentId: this.getPaymentId,
            createOrder:this.createOrder
         }}>
         {this.props.children}
         </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer }