import httpStatus from "http-status";
import { RequestHandler } from "express";
import { ApiError, sendResponse } from "xmcrud";
import UserModel from "./user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import envConfig from "../../config/envConfig";

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");

    // Create access and refresh tokens
    const accessToken = jwt.sign({ user }, envConfig.token.access_token_secret, { expiresIn: envConfig.token.access_token_time });
    const refreshToken = jwt.sign({ user }, envConfig.token.refresh_token_secret, { expiresIn: envConfig.token.refresh_token_time });

    const userData = await UserModel.findByIdAndUpdate(user._id, { lastLogin: new Date() }, { new: true });
    const cookieOptions = { secure: true, httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 };

    const payload = {
      success: true,
      message: "User logged in successfully",
      data: {
        token: accessToken,
        user: userData,
      },
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);
    sendResponse({ req, res, status: httpStatus.OK, payload });

    return;
  } catch (error) {
    next(error);
  }
};

export const userController = { login };
