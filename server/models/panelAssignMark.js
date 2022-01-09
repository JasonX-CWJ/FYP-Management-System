import mongoose from "mongoose";

const panelAssignMarkSchema = mongoose.Schema({
    creator: String, //takes the userId
    title: String, //takes title that wants to assign mark
    vote: String, //vote the title
});

var panelAssignMark = mongoose.model("PanelAssignMark", panelAssignMarkSchema);

export default panelAssignMark;