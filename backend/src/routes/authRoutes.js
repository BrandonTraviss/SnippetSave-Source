import express from "express";
import { loginUser,registerUser,logoutUser,getMe } from "../controllers/authControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser)

// LOGOUT
router.post("/logout",logoutUser)

//GET CURRENT USER (protected)
router.get("/me",protect,getMe);

export default router;