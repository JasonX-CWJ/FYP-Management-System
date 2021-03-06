import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Projects from "./project.js";

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    matricNo: { type: String, required: true },
    department: { type: String, required: true },
    semester: { type: String, required: true },
    session: { type: String, required: true },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "Lecturer" },
    projectApplied: { type: mongoose.Schema.Types.ObjectId, ref: "LectProjectDet" },
    projectActive: { type: mongoose.Schema.Types.ObjectId, ref: "LectProjectDet" },
    fileSubmission: { type: mongoose.Schema.Types.ObjectId, ref: "fileSubmission" },
    // reportSubmissionFYP1: { type: String },
    // reportSubmissionFYP2: { type: String },
    // monitoringLinkFYP1: { type: String },
    // monitoringLinkFYP2: { type: String },
    // vivaLinkFYP1: { type: String },
    // vivaLinkFYP2: { type: String },
    // role: { type: String },
});

export default mongoose.model("Student", studentSchema);
