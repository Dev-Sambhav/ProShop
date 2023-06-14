import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const productRoutes = express.Router();

// fetch all products
productRoutes.get("/", getAllProducts);

// fetch single product
productRoutes.get("/:id", getSingleProduct);

// create product
productRoutes.post("/create", protect, admin, createProduct);
export default productRoutes;
