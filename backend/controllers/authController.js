const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const UserService = require("../services/authService");
const ApiResponse = require('../responses/apiResponses')
const ApiResponseMessages = require('../responses/apiResponseMessage')

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await UserService.findExistingUser(username, email);
    if (existingUser) {
      ApiResponse.conflict(res, ApiResponseMessages.USER_ALREADY_EXISTS) 
    }
    const savedUser = await UserService.createAUser(username, email, password);

   ApiResponse.success(res, ApiResponseMessages.USER_CREATED_SUCCESSFULLY) 
  } catch (error) {
    console.error("Error:", error);
   ApiResponse.internalServerError(res, ApiResponseMessages.USER_NOT_FOUND) 
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.findExistingUserByEmail(email);

    if (!user) {
     ApiResponse.internalServerError(res, ApiResponseMessages.INTERNAL_SERVER_ERROR)
    }

    const passwordMatch = await UserService.checkUserPassword(
      password,
      user.password
    );

    if (!passwordMatch) {
     ApiResponse.internalServerError(res, ApiResponseMessages.INTERNAL_SERVER_ERROR)
    }

    const token = await UserService.createToken(user._id);

    ApiResponse.success(res, {token}, ApiResponseMessages.LOGIN_SUCCESSFULLY)
  } catch (error) {
    console.error("Error:", error);
    ApiResponse.internalServerError(res, ApiResponseMessages.INTERNAL_SERVER_ERROR, e)
  }
};

module.exports = { registerUser, loginUser };
