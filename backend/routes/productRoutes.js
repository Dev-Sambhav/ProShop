import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  getTopProducts
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const productRoutes = express.Router();

// fetch all products or create product
productRoutes
  .route("/")
  .get(getAllProducts)
  .post(protect, admin, createProduct);

// fetch top rated products
productRoutes.get('/top',getTopProducts);

// fetch single product or update product or delete product
productRoutes
  .route("/:id")
  .get(getSingleProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// create a review
productRoutes.route("/:id/reviews").post(protect, createProductReview);

export default productRoutes;
