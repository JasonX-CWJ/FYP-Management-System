import mongoose from "mongoose";

const panelAssignMarkSchema = mongoose.Schema({
    //prolly needs connection with title from projectrepo
    //this models is not final
    creator: String, //takes the userId
    title: String, //takes title that wants to assign mark
    vote: String, //vote the title - similar to like from video
});

var panelAssignMark = mongoose.model("PanelAssignMark", panelAssignMarkSchema);

export default panelAssignMark;