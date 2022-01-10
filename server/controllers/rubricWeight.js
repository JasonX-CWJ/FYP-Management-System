import express from "express";
import mongoose from "mongoose";

import RubricWeight from "../models/rubricWeight.js";

const router = express.Router();

export const getRubricWeight = async (req, res) => {
    try {
        const rubricWeight = await RubricWeight.find();

        res.status(200).json(rubricWeight);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createRubricWeight = async (req, res) => {
    const rubricWeight = req.body;
    const newRubricWeight = new RubricWeight({ ...rubricWeight, creator: req.userId });

    try {
        await newRubricWeight.save();

        res.status(201).json(newRubricWeight);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateRubricWeight = async (req, res) => {
    const { id } = req.params;
    const { creator, fypSess, submSess, dimension, rubric, weight } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No RubricWeight with id: ${id}`);
    const updatedRubricWeight = { creator, fypSess, submSess, dimension, rubric, weight, _id: id };

    await RubricWeight.findByIdAndUpdate(id, updatedRubricWeight, { new: true });

    res.json(updatedRubricWeight);
};

export const deleteRubricWeight = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No RubricWeight with id: ${id}`);

    await RubricWeight.findByIdAndRemove(id);

    res.json({ message: "RubricWeight deleted successfully." });
};

export default router;