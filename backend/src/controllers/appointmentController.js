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

// DOCTOR -> Add prescription

export const addPrescription = async(req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
        if(!appointment){
            res.status(404).json({
                message: "Appointment not found"
            })
        }
        if(appointment.doctor.toString() !== req.user._id.toString()){
            res.status(403).json({
                message: "Not authorized"
            })
        }

        const {medicines, instructions} = req.body;

        appointment.prescription = {
            medicines,
            instructions
        }

        appointment.status = "completed"

        await appointment.save();

        res.status(201).json({
            message: "prescription added successfully",
            appointment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// PATIENT -> veiw prescription
export const getPatientPrescription = async(req, res) => {
    try {
        const prescription = await Appointment.find(
            {
                patient: req.user._id,
                status: "completed"
            }
        )
        .populate("doctor", "name specialization")

        res.json(prescription)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// ADMIN and DOCTOR -> update status
export const updateAppointmentStatus = async(req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
        if(!appointment){
            return res.status(404).json({
                message: "Appointment not fount"
            })
        }

        const {status} = req.body;
        appointment.status = status;

        await appointment.save();

        res.status(200).json({
            message: "Appointment status updated successfully",
            appointment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}