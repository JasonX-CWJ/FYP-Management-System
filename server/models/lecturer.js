import mongoose from "mongoose";
const Schema = mongoose.Schema;

const lecturerSchema = mongoose.Schema({
    name: { type: String, required: true },
    matricNo: { type: String, required: true },
    department: { type: String, required: true },
    isCoordinator: { type: Boolean, default: false },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    isPanel: { type: Boolean, default: false },
    panelStudents: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    projectSupervised: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProjectRepo" }],
    // role: { type: String },
});

export default mongoose.model("Lecturer", lecturerSchema);
