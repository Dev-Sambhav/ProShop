import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// User must be authenticated
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  // Get JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // checking user authorized or not
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, No token");
  }
});

// User must be an admin
export const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});
