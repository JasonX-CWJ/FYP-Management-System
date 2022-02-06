import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    department: String,
    // department: String,
    selectedFile: String, // Maybe for the guideline thing.
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
