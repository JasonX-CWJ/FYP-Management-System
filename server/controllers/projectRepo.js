import express from "express";
import mongoose from "mongoose";

import LectProjectDet from "../models/lectProjectDet.js";
import LectProjectApplied from "../models/lectProjectApplied.js";
import STATUS from "../constants/projectStatus.js";

const router = express.Router();
const toId = mongoose.Types.ObjectId;

export const getProjectRepo = async (req, res) => {
    try {
        const lectProjectDet = await LectProjectDet.find().populate("studentApplied").populate("studentAssigned");

        res.status(200).json(lectProjectDet);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createProjectRepo = async (req, res) => {
    const lectProjectDet = req.body;
    const newLectProjectDet = new LectProjectDet({ ...lectProjectDet, creator: req.userId });

    try {
        await newLectProjectDet.save();

        res.status(201).json(newLectProjectDet);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateProjectRepo = async (req, res) => {
    const { id } = req.params;
    const { department, semester, session, title, description, creator, potStakeholder, tool, noOfStud } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectProjectDet with id: ${id}`);
    const updatedLectProjectDet = { department, semester, session, title, description, creator, potStakeholder, tool, noOfStud, _id: id };

    await LectProjectDet.findByIdAndUpdate(id, updatedLectProjectDet, { new: true });

    res.json(updatedLectProjectDet);
};

export const deleteProjectRepo = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectProjectDet with id: ${id}`);

    await LectProjectDet.findByIdAndRemove(id);

    res.json({ message: "LectProjectDet deleted successfully." });
};

export const applyProject = async (req, res) => {
    const projectID = req.params.projectid;
    const studentID = req.params.studentid;

    //change project status
    await LectProjectDet.findByIdAndUpdate(toId(projectID), { status: STATUS.APPLIED, $push: { studentApplied: toId(studentID) } });
    const newProjectApp = new LectProjectApplied({ projectID: toId(projectID), studentID: [toId(studentID)] });
    try {
        await newProjectApp.save();
        res.status(201).json({ message: "successfully applied" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const approveProject = async (req, res) => {
    // console.log(req.body.status);
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectProjectDet with id: ${id}`);
    const updatedLectProjectDet = await LectProjectDet.findByIdAndUpdate(id, { status: req.body.status });

    res.json(updatedLectProjectDet);
};

export default router;
