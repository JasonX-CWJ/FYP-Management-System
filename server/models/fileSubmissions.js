import mongoose from "mongoose";
const Schema = mongoose.Schema;

const fileSubmissionSchema = mongoose.Schema({
    reportSubmissionFYP1: { type: String },
    reportSubmissionFYP2: { type: String },
    monitoringLinkFYP1: { type: String },
    monitoringLinkFYP2: { type: String },
    vivaLinkFYP1: { type: String },
    vivaLinkFYP2: { type: String },
    // role: { type: String },
});

export default mongoose.model("fileSubmission", fileSubmissionSchema);
