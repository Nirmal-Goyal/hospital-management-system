import Appointment from "../models/Appointment.model.js"

// patient -> book appointment

export const bookAppointment = async(req, res) => {
    try {
        const {doctorId, date} = req.body;

        const appointment = await Appointment.create(
            {
                patient: req.user._id,
                doctor: doctorId,
                date
            }
        )

        res.status(201).json({
            message: "appointment booked successfully",
            appointment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// doctor -> view their appointment

export const getDoctorAppointment = async(req, res) => {
    try {
        const appointment = await Appointment.find({doctor: req.user._id})
        .populate("patient", "name email")

        res.json(appointment)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// ADMIN -> get all appointments
export const getAllAppointments = async(req, res) => {
    try {
        const appointment = await Appointment.find()
        .populate("doctor", "name specialization")
        .populate("patient", "name email")

        res.json(appointment)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
