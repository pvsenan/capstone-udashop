import React from "react";
import { Button } from "reactstrap";
import '../App.css'

function ProductDetail( {product} ) {
    console.log(`info is ${product}`)
    return (
                <h6 className="">
                <div className="productDetail shadow" >
                <h4>{product.title}</h4> 
                <div><img src='https://assets.icanet.se/t_product_medium_v1,f_auto/7318690164364.jpg'/></div> 
                <div>
                 {product.info}   
                </div>
                <Button color="secondary"
                className="btn-margin">Buy</Button>
                </div> 
               </h6>
    );
}

export default ProductDetail;
