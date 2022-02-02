import express from "express";
import mongoose from "mongoose";

import LectMeetings from "../models/lectMeetings.js";

const router = express.Router();

export const getLectMeetings = async (req, res) => {
    try {
        const lectMeetings = await LectMeetings.find();

        res.status(200).json(lectMeetings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createLectMeetings = async (req, res) => {
    const lectMeetings = req.body;
    const newLectMeetings = new LectMeetings({ ...lectMeetings, creator: req.userId });

    try {
        await newLectMeetings.save();

        res.status(201).json(newLectMeetings);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateLectMeetings = async (req, res) => {
    const { id } = req.params;
    const { creator, title, projecttitle, studname, link, date, time, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectMeetings with id: ${id}`);
    const updatedLectMeetings = { creator, title, projecttitle, studname, link, date, time, status, _id: id };

    await LectMeetings.findByIdAndUpdate(id, updatedLectMeetings, { new: true });

    res.json(updatedLectMeetings);
};

export const deleteLectMeetings = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectMeetings with id: ${id}`);

    await LectMeetings.findByIdAndRemove(id);

    res.json({ message: "LectMeetings deleted successfully." });
};


export default router;
