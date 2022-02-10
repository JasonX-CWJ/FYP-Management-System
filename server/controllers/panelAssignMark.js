import express from "express";
import mongoose from "mongoose";

import PanelAssignMark from "../models/panelAssignMark.js";

const router = express.Router();

export const getPanelAssignMark = async (req, res) => {
    try {
        const panelAssignMark = await PanelAssignMark.find();

        res.status(200).json(panelAssignMark);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPanelAssignMark = async (req, res) => {
    const panelAssignMark = req.body;
    const newPanelAssignMark = new PanelAssignMark({ ...panelAssignMark, creator: req.userId });

    try {
        await newPanelAssignMark.save();

        res.status(201).json(newPanelAssignMark);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePanelAssignMark = async (req, res) => {
    const { id } = req.params;
    const { creator, title, studname, selectedFile, fypSess, submSess, dimension, rubric, monEval1, vivaMark1, vivaMark2, monEval2 } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No PanelAssignMark with id: ${id}`);
    const updatedPanelAssignMark = { creator, title, studname, selectedFile, fypSess, submSess, dimension, rubric, monEval1, vivaMark1, vivaMark2, monEval2, _id: id };

    await PanelAssignMark.findByIdAndUpdate(id, updatedPanelAssignMark, { new: true });

    res.json(updatedPanelAssignMark);
};

export const deletePanelAssignMark = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No PanelAssignMark with id: ${id}`);

    await PanelAssignMark.findByIdAndRemove(id);

    res.json({ message: "PanelAssignMark deleted successfully." });
};

export default router;