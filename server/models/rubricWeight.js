import mongoose from "mongoose";

const rubricWeightSchema = mongoose.Schema({
    creator: String, //takes the userId
    fypSess: String, //change to array to accepf FYP1 and FYP2 i think
    submSess: String, //change to array to accept Monitor and Viva i think
    dimension: String, //change to array to accept dimension technical and softskills i think
    rubric: String, //the dimensions prolly array
    weight: String, //prolly array
});

var rubricWeight = mongoose.model("RubricWeight", rubricWeightSchema);

export default rubricWeight;
