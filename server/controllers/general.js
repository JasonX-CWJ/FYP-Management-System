import express from "express";
import mongoose from "mongoose";

import Lecturer from "../models/lecturer.js";
import Student from "../models/student.js";

const router = express.Router();

export const getLecturers = async (req, res) => {
    try {
        const lecturer = await Lecturer.find();

        res.status(200).json(lecturer);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getStudents = async (req, res) => {
    try {
        const student = await Student.find();

        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
