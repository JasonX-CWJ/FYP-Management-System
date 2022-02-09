import mongoose from "mongoose";

const infoGuideSchema = mongoose.Schema({
    title: String,
    selectedFile: String,
    filetype: String,
    updatedAt: {
        type: Date,
        default: new Date(),
    },
});

var infoGuide = mongoose.model("InfoGuide", infoGuideSchema);

export default infoGuide;
