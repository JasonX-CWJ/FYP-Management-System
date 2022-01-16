import mongoose from "mongoose";

const panelVoteSchema = mongoose.Schema({
    //prolly needs connection with title from projectrepo
    //this models is not final
    creator: String, //takes the userId
    title: String, //takes title that wants to assign mark
    vote: String, //vote the title - similar to like from video
});

var panelVote = mongoose.model("PanelVote", panelVoteSchema);

export default panelVote;