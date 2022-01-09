import mongoose from "mongoose";

const lectFileSubmittedSchema = mongoose.Schema({
    creator: String, //takes the userId
    title: String,
    description: String,
    studname: String,
    selectedFile: String, //should fetch the file of the student submitted (from Student module)
});

var lectFileSubmitted = mongoose.model("lectFileSubmitted", lectFileSubmittedSchema);

export default lectFileSubmitted;