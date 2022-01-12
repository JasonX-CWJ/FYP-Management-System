import mongoose from "mongoose";

const schedPanelSchema = mongoose.Schema({
    // prolly need connection with lectrepo and lectprojectdets
    creator: String, //takes the userId
    lectName: String, //eventually need to take from lect-repo
    lectDept: String, //eventually need to take from lect-repo
    studTitle: String, //eventually need to take from lect-repo
    studName: String, //eventually need to take from lect-repo
    fypSess: String, 
    submSess: String, //choose monitor or viva
    date: String,
    time: String,
});

var schedPanel = mongoose.model("SchedPanel", schedPanelSchema);

export default schedPanel;