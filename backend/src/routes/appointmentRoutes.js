import express from "express"
import { bookAppointment, getDoctorAppointment, getAllAppointments } from "../controllers/appointmentController.js"
import { protect, authorizeRoles } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/book", protect, authorizeRoles("patient"), bookAppointment);

router.get("/doctor", protect, authorizeRoles("doctor"), getDoctorAppointment);

router.get("/admin", protect, authorizeRoles("admin"), getAllAppointments);

export default router;