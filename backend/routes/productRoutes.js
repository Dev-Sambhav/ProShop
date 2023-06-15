import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const productRoutes = express.Router();

// fetch all products or create product
productRoutes
  .route("/")
  .get(getAllProducts)
  .post(protect, admin, createProduct);

// fetch single product or update product
productRoutes
  .route("/:id")
  .get(getSingleProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default productRoutes;
