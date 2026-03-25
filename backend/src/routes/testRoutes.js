import express from "express"
import { protect, authorizeRoles } from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/admin-dashboard", protect, authorizeRoles("admin"), (req, res) => {
    res.json({
        message: "welcome to admin dashboard"
    })
})

router.get("/doctor-dashboard", protect, authorizeRoles("doctor"), (req, res) => {
    res.json({
        message: "welcome to doctor-dashboard"
    })
})

router.get("/patient-dashboard", protect, authorizeRoles("patient"), (req, res) => {
    res.json({
        message: "welcome to patient dashboard"
    })
})

export default router;