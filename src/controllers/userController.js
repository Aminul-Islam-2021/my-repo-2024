const User = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    console.log("User register successfully");
  } catch (error) {
    console.log(error);
    return res.json("Something went wrong");
  }
};

const loginUser = async (req, res) => {
  try {
    console.log("User login successfully");
  } catch (error) {
    console.log(error);
    return res.json("Something went wrong");
  }
};

const logoutUser = async (req, res) => {
  try {
    console.log("User logout successfully");
  } catch (error) {
    console.log(error);
    return res.json("Something went wrong");
  }
};

module.exports = { registerUser,loginUser,logoutUser };
