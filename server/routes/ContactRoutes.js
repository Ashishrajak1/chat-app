import { Router } from "express";
import { search } from "../controllers/ContactController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const contactRouters = Router();

contactRouters.post("/search", verifyToken, search);

export default contactRouters;
