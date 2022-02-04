import mongoose from "mongoose";

const lectProjectAppliedSchema = mongoose.Schema({
    projectID: { type: mongoose.Schema.Types.ObjectId, ref: "LectProjectDet" },
    studentID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], //whoever applied through form will be added to this list
});

var lectProjectApplied = mongoose.model("LectProjectApplied", lectProjectAppliedSchema);

export default lectProjectApplied;
