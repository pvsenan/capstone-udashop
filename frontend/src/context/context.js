import React, { Component } from 'react'
import {storeProducts,detailProduct} from '../data'
import {apiEndpoint} from "../config";
import axios from 'axios'
import Product from '../components/Product';

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
        console.log(products)
        products.forEach(item=>{
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem];

        })
        this.setState(()=>{
            return {products: tempProducts}
        })
    }

    getProducts = async()=>{
        const result =  await axios.get(`${apiEndpoint}/products`)
        return  result.data.items;
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
            const count = this.state.cart[cartItemIndex].count + 1;
            const price = this.state.cart[cartItemIndex].price;
            this.state.cart[cartItemIndex].total = count * price
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

    cartTotal=()=>{
            let tempCart = [...this.state.cart]
            let cartTotal = 0;
            console.log(tempCart)
            tempCart.forEach(item=>{
                cartTotal+=item.count * item.price;
            })    
            console.log(`cart total is ${cartTotal}`)
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
         }}>
         {this.props.children}
         </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer }