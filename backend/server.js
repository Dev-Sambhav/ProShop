import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Api is Running!!!");
});

app.use("/api/products",productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on Port ${PORT}`));
