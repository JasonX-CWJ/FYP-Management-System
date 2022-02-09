import express from "express";
import mongoose from "mongoose";

import FileSubmissions from "../models/fileSubmissions.js";
import Student from "../models/student.js";

const router = express.Router();

const toId = mongoose.Types.ObjectId;
export const getFileSubmissions = async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findById(id);

        //check if student have it or not
        if (student.fileSubmission === null) {
            const newFileSubmission = new FileSubmissions({
                reportSubmissionFYP1: "",
                reportSubmissionFYP2: "",
                monitoringLinkFYP1: "",
                monitoringLinkFYP2: "",
                vivaLinkFYP1: "",
                vivaLinkFYP2: "",
            });
            try {
                await newFileSubmission.save();
            } catch (error) {
                res.status(409).json({ message: error.message });
            }
            student.findByIdAndUpdate(id, { fileSubmission: toId(newFileSubmission._id) });
        }

        const files = await FileSubmissions.findById(student.fileSubmission._id);

        console.log(files);
        // const files = await FileSubmissions.find();

        res.status(200).json(files);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createFileSubmissions = async (req, res) => {
    const infoGuide = req.body;
    const filetype = req.body.selectedFile.split(";")[0].split("/")[1];
    const newFileSubmissions = new FileSubmissions({ ...infoGuide, filetype: filetype, updatedAt: new Date().toISOString() });

    try {
        await newInfoGuide.save();

        res.status(201).json(newInfoGuide);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateFileSubmissions = async (req, res) => {
    const { id } = req.params;
    const { title, selectedFile } = req.body;
    const filetype = req.body.selectedFile.split(";")[0].split("/")[1];

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No FileSubmissions with id: ${id}`);
    const updatedFileSubmissions = { title, selectedFile, filetype, updatedAt: new Date().toISOString(), _id: id };

    await FileSubmissions.findByIdAndUpdate(id, updatedFileSubmissions, { new: true });

    res.json(updatedFileSubmissions);
};

export const deleteFileSubmissions = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No FileSubmissions with id: ${id}`);

    await FileSubmissions.findByIdAndRemove(id);

    res.json({ message: "FileSubmissions deleted successfully." });
};

export default router;
