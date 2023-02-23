import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../user/models.js";
import Role from "../role/models.js";

dotenv.config();

(async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URL);

    // Find or create the admin role
    let adminRole = await Role.findOne({ nameRole: "admin" });
    if (!adminRole) {
      adminRole = await Role.create({ nameRole: "admin" });
      console.log("Admin role created successfully!");
    }

    // Find or create the admin user
    let adminUser = await User.findOne({ username: "admin" });
    if (!adminUser) {
      adminUser = await User.create({
        username: "admin",
        password: "password123",
        role: adminRole._id,
      });
      console.log("Admin user created successfully!");
    }

    // Update username of admin role
    await Role.findByIdAndUpdate(
      adminRole._id,
      { username: adminUser.username },
      { new: true }
    );
    console.log("Username of admin role updated successfully!");

    // Disconnect from the database
    await mongoose.disconnect();
  } catch (error) {
    console.error(`Error creating default admin user: ${error}`);
  }
})();
