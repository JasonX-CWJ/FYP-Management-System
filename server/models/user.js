import mongoose from "mongoose";
import ROLE from "../constants/userRole.js";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    // role: { type: String },
    isFirstLogin: { type: Boolean, default: true },
    role: { type: String, enum: ROLE, default: ROLE.STUDENT },
    studentData: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    lecturerData: { type: mongoose.Schema.Types.ObjectId, ref: "Lecturer" },
});

export default mongoose.model("User", userSchema);
