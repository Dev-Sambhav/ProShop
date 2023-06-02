import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

export const getSingleProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product) res.status(200).json(product);
    else res.status(404).json({message: "Product not found"})
})