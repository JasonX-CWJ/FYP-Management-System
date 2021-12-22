import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "Lecturer" },
    stakeholders: { type: String },
    totalStudent: { type: Number, required: true },
    totalVacancy: { type: Number },
    studentAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    // role: { type: String },
});

export default mongoose.model("Project", projectSchema);
