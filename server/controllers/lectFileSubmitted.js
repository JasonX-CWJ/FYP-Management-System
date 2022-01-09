import express from "express";
import mongoose from "mongoose";

import LectFileSubmitted from "../models/lectFileSubmitted.js";

const router = express.Router();

export const getLectFileSubmitted = async (req, res) => {
    try {
        const lectFileSubmitted = await LectFileSubmitted.find();

        res.status(200).json(lectFileSubmitted);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createLectFileSubmitted = async (req, res) => {
    const lectFileSubmitted = req.body;
    const newLectFileSubmitted = new LectFileSubmitted({ ...lectFileSubmitted, creator: req.userId });

    try {
        await newLectFileSubmitted.save();

        res.status(201).json(newLectFileSubmitted);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateLectFileSubmitted = async (req, res) => {
    const { id } = req.params;
    const { creator, title, description, studname, selectedFile } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectFileSubmitted with id: ${id}`);
    const updatedLectFileSubmitted = { creator, title, description, studname, selectedFile, _id: id };

    await LectFileSubmitted.findByIdAndUpdate(id, updatedLectFileSubmitted, { new: true });

    res.json(updatedLectFileSubmitted);
};

export const deleteLectFileSubmitted = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectFileSubmitted with id: ${id}`);

    await LectFileSubmitted.findByIdAndRemove(id);

    res.json({ message: "LectFileSubmitted deleted successfully." });
};

export default router;