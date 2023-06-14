import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc fetch all products
// route GET api/products
// access Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc fetch single product
// route GET api/products/:id
// access Public
export const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.status(200).json(product);
  else res.status(404).json({ message: "Product not found" });
});

// @desc Create product
// route POST api/products/create
// access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;
  const product = new Product({
    name,
    price,
    user: req.user._id,
    image,
    brand,
    category,
    countInStock,
    description,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
