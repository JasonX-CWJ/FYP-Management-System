import express from "express";
import mongoose from "mongoose";

import LectAssignMark from "../models/lectAssignMark.js";

const router = express.Router();

export const getLectAssignMark = async (req, res) => {
    try {
        const lectAssignMark = await LectAssignMark.find();

        res.status(200).json(lectAssignMark);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createLectAssignMark = async (req, res) => {
    const lectAssignMark = req.body;
    const newLectAssignMark = new LectAssignMark({ ...lectAssignMark, creator: req.userId });

    try {
        await newLectAssignMark.save();

        res.status(201).json(newLectAssignMark);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateLectAssignMark = async (req, res) => {
    const { id } = req.params;
    const { creator, title, studname, selectedFile, fypSess, submSess, dimension, rubric, monEval, vivaMark } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectAssignMark with id: ${id}`);
    const updatedLectAssignMark = { creator, title, studname, selectedFile, fypSess, submSess, dimension, rubric, monEval, vivaMark, _id: id };

    await LectAssignMark.findByIdAndUpdate(id, updatedLectAssignMark, { new: true });

    res.json(updatedLectAssignMark);
};

export const deleteLectAssignMark = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectAssignMark with id: ${id}`);

    await LectAssignMark.findByIdAndRemove(id);

    res.json({ message: "LectAssignMark deleted successfully." });
};

export default router;