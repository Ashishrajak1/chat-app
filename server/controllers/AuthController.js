import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import fs from "fs/promises"; // Ensure you're using the async version
import path from "path";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send("Email and Password is required");
    }
    const user = await User.create({ email, password });
    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return response.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(505).send("Internel server error");
  }
};

export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send("Email and Password is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).send("User with given email not found.");
    }

    const auth = await compare(password, user.password);
    if (!auth) {
      return response.status(400).send("Password in incorrect.");
    }
    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return response.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(505).send("Internel server error");
  }
};

export const userinfo = async (request, response, next) => {
  try {
    const userData = await User.findById(request.userId);
    if (!userData) {
      return response.status(404).send("User with given id not found.");
    }
    return response.status(200).json({
      user: {
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(505).send("Internel server error");
  }
};

export const updateProfile = async (request, response, next) => {
  try {
    const { firstName, lastName } = request.body;
    // Validate required fields
    if (!firstName || !lastName) {
      return response
        .status(400)
        .json({ message: "First Name and Last Name are required" });
    }

    const userData = await User.findByIdAndUpdate(
      request.userId,
      { firstName, lastName, profileSetup: true },
      { new: true, runValidators: true }
    );

    return response.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};

export const addProfileImage = async (request, response) => {
  try {
    if (!request.file) {
      return response.status(400).json({ message: "No image uploaded" });
    }

    console.log("Old image path:", request.body.oldimage);

    if (request.body.oldimage) {
      const oldImagePath = path.join(process.cwd(), request.body.oldimage); // Ensure absolute path
      try {
        await fs.unlink(oldImagePath); // Correct usage
        console.log("Old image deleted:", oldImagePath);
      } catch (err) {
        console.error("Failed to delete old image:", err.message);
      }
    }

    const imagePath = path.join("uploads/profile", request.file.filename);

    // Update user in database with the new image path
    const userData = await User.findByIdAndUpdate(
      request.userId,
      { image: imagePath },
      { new: true, runValidators: true }
    );

    if (!userData) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).json({
      message: "Profile image updated successfully",
      user: {
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
