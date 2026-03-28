import express from "express"
import { registerUser, loginUser, createDoctor, getAllDoctors } from "../controllers/authController.js"
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)

router.post("/create-doctor", protect, authorizeRoles("admin"), createDoctor)
router.get("/doctors", protect, getAllDoctors)

export default router