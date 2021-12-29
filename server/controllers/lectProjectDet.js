import express from "express";
import mongoose from "mongoose";

import LectProjectDet from "../models/lectProjectDet.js";

const router = express.Router();

export const getLectProjectDet = async (req, res) => {
    try {
        const lectProjectDet = await LectProjectDet.find();

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
    const { department, title, description, creator, potStakeholder, tool, noOfStud } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectProjectDet with id: ${id}`);
    const updateLectProjectDet = { department, title, description, creator, potStakeholder, tool, noOfStud, _id: id };

    await LectProjectDet.findByIdAndUpdate(id, updateLectProjectDet, { new: true });

    res.json(updateLectProjectDet);
};

export const deleteLectProjectDet = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectProjectDet with id: ${id}`);

    await LectProjectDet.findByIdAndRemove(id);

    res.json({ message: "LectProjectDet deleted successfully." });
};

export default router;
