//this might get separated in viva and moitoring instead or fyp1 and fyp2 instead
import mongoose from "mongoose";

const panelAssignMarkSchema = mongoose.Schema({
    //recheck models. assign mark is for panel to assign during monitor and viva which views link of video and slide
    creator: String, //takes the userId
    title: String,
    studname: String,
    selectedFile: String, //should fetch the file of the student submitted (from Student module)
    fypSess: String, //change to array to accepf FYP1 and FYP2 i think
    submSess: String, //change to array to accept Monitor and Viva i think
    dimension: String, //take from admin dimension
    rubric: String, //take from admin rubric, should be array maybe
    monEval1: [String], //drop down for satis or unsatis
    monEval2: [String],
    vivaMark1: String, //assign mark base on weightage of admin for viva
    vivaMark2: String,
});

var panelAssignMark = mongoose.model("PanelAssignMark", panelAssignMarkSchema);

export default panelAssignMark;