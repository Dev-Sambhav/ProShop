import express from "express";
import {
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController.js";

const productRoutes = express.Router();

// fetch all products
productRoutes.get("/", getAllProducts);

// fetch single product
productRoutes.get("/:id", getSingleProduct);

export default productRoutes;
