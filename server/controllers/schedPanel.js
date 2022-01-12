import express from "express";
import mongoose from "mongoose";

import SchedPanel from "../models/schedPanel.js";

const router = express.Router();

export const getSchedPanel = async (req, res) => {
    try {
        const schedPanel = await SchedPanel.find();

        res.status(200).json(schedPanel);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createSchedPanel = async (req, res) => {
    const schedPanel = req.body;
    const newSchedPanel = new SchedPanel({ ...schedPanel, creator: req.userId });

    try {
        await newSchedPanel.save();

        res.status(201).json(newSchedPanel);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateSchedPanel = async (req, res) => {
    const { id } = req.params;
    const { creator, lectName, lectDept, studTitle, studName, fypSess, submSess, date, time } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No SchedPanel with id: ${id}`);
    const updatedSchedPanel = { creator, lectName, lectDept, studTitle, studName, fypSess, submSess, date, time, _id: id };

    await SchedPanel.findByIdAndUpdate(id, updatedSchedPanel, { new: true });

    res.json(updatedSchedPanel);
};

export const deleteSchedPanel = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No SchedPanel with id: ${id}`);

    await SchedPanel.findByIdAndRemove(id);

    res.json({ message: "SchedPanel deleted successfully." });
};

export default router;