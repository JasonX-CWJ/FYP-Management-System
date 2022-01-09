//this might get separated in viva and moitoring instead or fyp1 and fyp2 instead
import mongoose from "mongoose";

const lectAssignMarkSchema = mongoose.Schema({
    creator: String, //takes the userId
    title: String,
    studname: String,
    selectedFile: String, //should fetch the file of the student submitted (from Student module)
    fypSess: String, //change to array to accepf FYP1 and FYP2 i think
    submSess: String, //change to array to accept Monitor and Viva i think
    dimension: String, //take from admin dimension
    rubric: String, //take from admin rubric, should be array maybe
    monEval: String, //drop down for satis or unsatis
    vivaMark: String, //assign mark base on weightage of admin for viva
});

var lectAssignMark = mongoose.model("lectAssignMark", lectAssignMarkSchema);

export default lectAssignMark;