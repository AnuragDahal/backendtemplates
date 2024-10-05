import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateAuthToken } from "../utils/authutils.js";
import { z } from "zod";
import {
  sendBadRequest,
  sendInternalServerError,
  sendNotFound,
  sendSuccess,
} from "../utils/statusUtils.js";

export const generateAcessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAcessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    // Save the user with the new refresh token and dont validate
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return sendInternalServerError(
      res,
      "Failed to generate access and refresh token"
    );
  }
};

// Signup handler
export const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendBadRequest(res, "User already exists");
    }
    // Create a new user instance with the hashed password
    const newUser = new User({
      name,
      email,
      password,
    });
    // Save the user to the database
    const savedUser = await newUser.save();

    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;

    // Respond with the saved user's information
    return sendSuccess(res, "User created successfully", userWithoutPassword);
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Extract and return the first error message
      return sendBadRequest(res, err.errors[0].message);
    }
    return sendInternalServerError(res);
  }
};

// Login handler
export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return sendNotFound(res, "User not found");
    }

    // Validate the password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return sendBadRequest(res, "Invalid credentials");
    }
    // generate and set cookie
    generateAuthToken(res, email);
    // Respond with the saved user's information
    return res.status(200).json({
      statusCode: 200,
      message: "User logged in successfully",
    });
  } catch (err) {
    return sendInternalServerError(res, "Failed to login");
  }
};

export const handleLogout = async (req, res) => {
  try {
    res.clearCookie("authToken");
    return res.status(200).json({
      statusCode: 200,
      message: "User logged out successfully",
    });
  } catch (err) {
    return sendInternalServerError(res, "Failed to logout");
  }
};
