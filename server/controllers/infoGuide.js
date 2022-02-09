import express from "express";
import mongoose from "mongoose";

import InfoGuide from "../models/infoGuide.js";

const router = express.Router();

export const getInfoGuide = async (req, res) => {
    try {
        const infoGuide = await InfoGuide.find();

        res.status(200).json(infoGuide);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createInfoGuide = async (req, res) => {
    const infoGuide = req.body;
    const filetype = req.body.selectedFile.split(";")[0].split("/")[1];
    const newInfoGuide = new InfoGuide({ ...infoGuide, filetype: filetype, updatedAt: new Date().toISOString() });

    try {
        await newInfoGuide.save();

        res.status(201).json(newInfoGuide);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateInfoGuide = async (req, res) => {
    const { id } = req.params;
    const { title, selectedFile } = req.body;
    const filetype = req.body.selectedFile.split(";")[0].split("/")[1];

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No infoguide with id: ${id}`);
    const updatedInfoGuide = { title, selectedFile, filetype, updatedAt: new Date().toISOString(), _id: id };

    await InfoGuide.findByIdAndUpdate(id, updatedInfoGuide, { new: true });

    res.json(updatedInfoGuide);
};

export const deleteInfoGuide = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No infoguide with id: ${id}`);

    await InfoGuide.findByIdAndRemove(id);

    res.json({ message: "InfoGuide deleted successfully." });
};

export default router;
