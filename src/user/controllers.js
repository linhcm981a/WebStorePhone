import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import hashPassword from "../services/bcrypt.js";
import User from "../user/models.js";
import Role from "../role/models.js";
import TokenModel from "../token/models.js";
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

    let defaultRole = await Role.findOne({ nameRole: "customer" });
    if (!defaultRole) {
      const newRole = new Role({ nameRole: "customer" });
      await newRole.save();
      defaultRole = newRole;
    }

    const user = new User({
      username,
      password: hashedPassword,
      email,
      role: defaultRole._id,
    });

    await user.save();
   // Update the corresponding Role document with the username of the new user
   await Role.updateOne(
    { _id: defaultRole._id },
    { $push: { usernames: username } }
  );

  res.status(201).json({
    message: "User created successfully",
    user: await User.findById(user._id)
      .select("-password")
      .populate("role", "")
  });
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
    const users = await User.find({}, "email username");
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get users" });
  }
};

export const getAUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get user" });
  }
};

export const updateUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { username: req.body.username, email: req.body.email },
      { new: true, select: "-password" }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
