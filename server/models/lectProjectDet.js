import mongoose from "mongoose";

const lectProjectDetSchema = mongoose.Schema({
    department: String,
    semester: String,
    session: String,
    name: String, //fetch the profile first name and last name
    creator: String, //takes the userId
    title: String,
    description: String,
    potStakeholder: String, //pot = potential
    tool: String,
    noOfStud: Number,
    status: String, //to know if it is approved or not by admin - not included anywhere yet
    studentAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], //whoever accepted gets dumped into this list
    studentApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], //whoever accepted gets dumped into this list
});

var lectProjectDet = mongoose.model("LectProjectDet", lectProjectDetSchema);

export default lectProjectDet;
