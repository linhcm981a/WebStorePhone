import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../user/models.js";
import TokenModel from "../token/models.js";
import hashPassword from "../services/bcrypt.js";
import { isValidEmail, isValidUsername } from "../services/validation.js";
import verifyToken from "../services/verifyToken.js";

export const createNewUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    if (!isValidUsername(username)) {
      return res.status(400).json({ message: "Invalid username" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      username,
      password: hashedPassword,
      email,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    "my_secret_key",
    { expiresIn: "1h" }
  );

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

  const newToken = new TokenModel({
    token,
    expiresAt,
    userId: user._id,
  });

  await newToken.save();


  res.json({ message: "Login successful", email, token });
};

export const logoutUser = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = verifyToken(token);

      const tokenExists = await TokenModel.findOne({ token });
      if (!tokenExists) {
        return res.status(401).json({ message: "Token not found" });
      }
      await TokenModel.deleteOne({ token });

      res.json({ message: "Logout successful" });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'email username');
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get users" });
  }
};
