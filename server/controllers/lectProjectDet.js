import express from "express";
import mongoose from "mongoose";

import LectProjectDet from "../models/lectProjectDet.js";
import LectProjectApplied from "../models/lectProjectApplied.js";
import Student from "../models/student.js";
import STATUS from "../constants/projectStatus.js";

const router = express.Router();
const toId = mongoose.Types.ObjectId;

export const getLectProjectDet = async (req, res) => {
    try {
        const lectProjectDet = await LectProjectDet.find().populate("studentApplied").populate("studentAssigned");

        res.status(200).json(lectProjectDet);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createLectProjectDet = async (req, res) => {
    const lectProjectDet = req.body;
    const newLectProjectDet = new LectProjectDet({ ...lectProjectDet, creator: req.userId });

    try {
        await newLectProjectDet.save();

        res.status(201).json(newLectProjectDet);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateLectProjectDet = async (req, res) => {
    const { id } = req.params;
    const { department, semester, session, title, description, creator, potStakeholder, tool, noOfStud } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectProjectDet with id: ${id}`);
    const updatedLectProjectDet = { department, semester, session, title, description, creator, potStakeholder, tool, noOfStud, _id: id };

    await LectProjectDet.findByIdAndUpdate(id, updatedLectProjectDet, { new: true });

    res.json(updatedLectProjectDet);
};

export const deleteLectProjectDet = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectProjectDet with id: ${id}`);

    await LectProjectDet.findByIdAndRemove(id);

    res.json({ message: "LectProjectDet deleted successfully." });
};

//ADMIN RELATED

export const approveLectProjectDet = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectProjectDet with id: ${id}`);
    const updatedLectProjectDet = await LectProjectDet.findByIdAndUpdate(id, { status: STATUS.ACCEPT });

    res.json(updatedLectProjectDet);
};

//Student related

export const applyLectProject = async (req, res) => {
    //get id of project
    const projectid = req.params.projectid;
    // //assume students received is an array of id;
    // const students = req.body.studentarray;
    // //convert each students into toID;
    // const studentid = students.map((a) => toId(a));
    const newLectProjectApplied = new LectProjectApplied({ projectID: toId(projectid) });

    try {
        await newLectProjectApplied.save();
        res.status(201).json(newLectProjectApplied);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getLectProjectApplied = async (req, res) => {
    try {
        const lectProjectApplied = await LectProjectApplied.find().populate("projectID").populate("studentID");

        res.status(200).json(lectProjectApplied);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const approveLectProjectApplied = async (req, res) => {
    try {
        //get the project
        const projectApplied = await LectProjectApplied.findById(req.params.projectid);
        // console.log(projectApplied);
        // const project = await LectProjectDet.findById(toId(projectApplied.projectID));
        // console.log(project);
        // const student = await Student.find({ _id: { $in: projectApplied.studentID } });
        // console.log(student);
        // console.log(projectApplied.studentID);

        const project2 = await LectProjectDet.findByIdAndUpdate(toId(projectApplied.projectID), {
            status: STATUS.ACTIVE,
            $push: { studentAssigned: { $each: projectApplied.studentID } },
            $pullAll: { studentApplied: projectApplied.studentID },
        });

        // const lect = await LectProjectDet.findById(toId(projectApplied.projectID))
        const student = await Student.updateMany({ _id: { $in: projectApplied.studentID } }, { projectActive: toId(projectApplied.projectID) });
        await LectProjectApplied.findByIdAndRemove(req.params.projectid);
        // // console.log("hi");
        res.status(200).json(req.params.projectid);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export default router;
