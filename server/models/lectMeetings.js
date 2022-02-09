import mongoose from "mongoose";

const lectMeetingsSchema = mongoose.Schema({
    creator: String, //takes the userId
    title: String, //should be dropdown in the future and take from existing titles
    // projecttitle: String,
    // studname: String,
    link: String,
    date: String,
    time: String,
    // count: String, //not added yet
    // totalcount: String, //not added yet
    status: String, //not added yet
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    supervisorID: { type: mongoose.Schema.Types.ObjectId, ref: "Lecturer" },
});

var lectMeetings = mongoose.model("LectMeetings", lectMeetingsSchema);

export default lectMeetings;
