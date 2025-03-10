import { Router } from "express";
import {
  signup,
  login,
  userinfo,
  updateProfile,
  addProfileImage,
} from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
const authRouters = Router();

authRouters.post("/signup", signup);
authRouters.post("/login", login);
authRouters.get("/userinfo", verifyToken, userinfo);
authRouters.post("/update-profile", verifyToken, updateProfile);

authRouters.post(
  "/add-profile-image",
  verifyToken,
  upload.single("image"),
  addProfileImage
);
export default authRouters;
