import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Register User and get token
// route POST /api/users/
// access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // checking any field empty or not
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the details");
  }
  // check user already exists or not
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // create a user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login User and get token
// route POST /api/users/login
// access Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  // checking user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid Email");
  }
  // compare password
  const isValidPassword = await user.matchPassword(password);
  if (!isValidPassword) {
    res.status(401);
    throw new Error("Password do not match");
  }
  generateToken(res, user._id);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc Logout User and clear cookie
// route POST /api/users/logout
// access Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out successfully" });
});

// @desc Get User Profile
// route GET /api/users/profile
// access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update User Profile
// route PUT /api/users/profile
// access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Admin Controllers

// @desc Get all users
// route GET /api/users
// access Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc Delete User
// route DELETE /api/users/:id
// access Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get user by ID
// route GET /api/users/:id
// access Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user
// route PUT /api/users/:id
// access Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
