import express from "express";
import mongoose from "mongoose";

import PanelVote from "../models/panelVote.js";

const router = express.Router();

export const getPanelVote = async (req, res) => {
    try {
        const panelVote = await PanelVote.find();

        res.status(200).json(panelVote);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPanelVote = async (req, res) => {
    const panelVote = req.body;
    const newPanelVote = new PanelVote({ ...panelVote, creator: req.userId });

    try {
        await newPanelVote.save();

        res.status(201).json(newPanelVote);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePanelVote = async (req, res) => {
    const { id } = req.params;
    const { creator, title, vote } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No PanelVote with id: ${id}`);
    const updatedPanelVote = { creator, title, vote, _id: id };

    await PanelVote.findByIdAndUpdate(id, updatedPanelVote, { new: true });

    res.json(updatedPanelVote);
};

export const deletePanelVote = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No PanelVote with id: ${id}`);

    await PanelVote.findByIdAndRemove(id);

    res.json({ message: "PanelVote deleted successfully." });
};

export default router;