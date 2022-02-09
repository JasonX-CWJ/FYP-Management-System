import express from "express";
import mongoose from "mongoose";

import LectMeetings from "../models/lectMeetings.js";

const router = express.Router();

const toId = mongoose.Types.ObjectId;
export const getLectMeetings = async (req, res) => {
    try {
        const lectMeetings = await LectMeetings.find()
            .populate({
                path: "studentID",
                populate: [{ path: "projectActive" }, { path: "supervisor" }],
            })
            .populate("supervisorID");

        res.status(200).json(lectMeetings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createLectMeetings = async (req, res) => {
    // const lectMeetings = req.body;
    // const newLectMeetings = new LectMeetings({ ...lectMeetings, creator: req.userId });
    console.log(req.body);
    try {
        const newLectMeetings = new LectMeetings({
            creator: req.userId,
            title: req.body.title,
            link: req.body.link,
            date: req.body.date,
            time: req.body.time,
            status: req.body.status,
            studentID: toId(req.body.studentID),
            supervisorID: toId(req.body.supervisorID),
        });

        await newLectMeetings.save();

        res.status(201).json(newLectMeetings);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    // try {
    //     await newLectMeetings.save();

    //     res.status(201).json(newLectMeetings);
    // } catch (error) {
    //     res.status(409).json({ message: error.message });
    // }
};

export const updateLectMeetings = async (req, res) => {
    const { id } = req.params;
    // const { creator, title, projecttitle, studname, link, date, time, status } = req.body;

    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectMeetings with id: ${id}`);
    // const updatedLectMeetings = { creator, title, projecttitle, studname, link, date, time, status, _id: id };

    // await LectMeetings.findByIdAndUpdate(id, updatedLectMeetings, { new: true });

    res.json(updatedLectMeetings);
};

export const deleteLectMeetings = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectMeetings with id: ${id}`);

    await LectMeetings.findByIdAndRemove(id);

    res.json({ message: "LectMeetings deleted successfully." });
};

export const changeLectMeetingsStatus = async (req, res) => {
    const id = req.params.id;
    console.log(req.body.status);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No LectMeetings with id: ${id}`);
    const updatedLectMeeting = await LectMeetings.findByIdAndUpdate(id, { status: req.body.status });

    res.json(updatedLectMeeting);
};

export default router;
