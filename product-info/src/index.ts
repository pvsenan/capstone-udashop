import express from "express";
import { Request,Response } from "express"
import { storeProducts } from "./mock/products";
 
const app = express()
const port = 8081

app.get("/products",(req: Request,res: Response)=>{
  res.send(storeProducts)
})

app.listen(port,()=>{
    console.log( `server started at http://localhost:${ port }` )
})