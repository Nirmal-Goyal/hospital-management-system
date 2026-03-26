import express from "express"
import { bookAppointment, getDoctorAppointment, getAllAppointments, addPrescription, getPatientPrescription } from "../controllers/appointmentController.js"
import { protect, authorizeRoles } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/book", protect, authorizeRoles("patient"), bookAppointment);

router.get("/doctor", protect, authorizeRoles("doctor"), getDoctorAppointment);

router.get("/admin", protect, authorizeRoles("admin"), getAllAppointments);

router.put("/prescription/:id", protect, authorizeRoles("doctor"), addPrescription);

router.get("/my-prescriptions", protect, authorizeRoles("patient"), getPatientPrescription);

export default router;