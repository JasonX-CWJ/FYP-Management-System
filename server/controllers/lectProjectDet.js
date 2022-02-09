import express from "express";
import mongoose from "mongoose";

import LectProjectDet from "../models/lectProjectDet.js";
import LectProjectApplied from "../models/lectProjectApplied.js";
import Student from "../models/student.js";
import Lecturer from "../models/lecturer.js";
import STATUS from "../constants/projectStatus.js";
import User from "../models/user.js";

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

        const project2 = await LectProjectDet.findByIdAndUpdate(toId(projectApplied.projectID), {
            status: STATUS.ACTIVE,
            $push: { studentAssigned: { $each: projectApplied.studentID } },
            $pullAll: { studentApplied: projectApplied.studentID },
        });
        // const project2 = await LectProjectDet.findById(toId(projectApplied.projectID));

        //find the lecturer
        const user = await User.findById(toId(project2.creator));
        const supervisor = await Lecturer.findById(user?.lecturerData);

        const student = await Student.updateMany({ _id: { $in: projectApplied.studentID } }, { projectActive: toId(projectApplied.projectID), supervisor: toId(supervisor._id) });
        await Lecturer.findByIdAndUpdate(toId(supervisor._id), {
            $push: { students: { $each: projectApplied.studentID } },
        });
        await LectProjectApplied.findByIdAndRemove(req.params.projectid);

        res.status(200).json(req.params.projectid);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export default router;
