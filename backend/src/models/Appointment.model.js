import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "approved", "completed", "cancelled"],
            default: "pending"
        },
        notes: {
            type: String
        },
        prescription: {
            medicines: [String],
            instructions: String
        }
    },
    {timestamps: true}
)

export default mongoose.model("Appointment", appointmentSchema);