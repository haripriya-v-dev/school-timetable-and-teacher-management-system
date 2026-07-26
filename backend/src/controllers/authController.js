import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username,
      password
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    res.json({
      success: true,
      message: "Login Successful",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const register = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};