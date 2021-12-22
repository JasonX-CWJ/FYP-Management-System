import express from "express";
import mongoose from "mongoose";

import Students from "../models/student.js";
import Lecturers from "../models/lecturer.js";
import Projects from "../models/project.js";

const router = express.Router();
const toId = mongoose.Types.ObjectId;
// import auth from "../middleware/auth.js";

router.get("/", async (req, res) => {
    try {
        res.status(200).json("Hello world!");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get("/seed", async (req, res) => {
    try {
        //Student Names
        const students = [
            {
                name: "Cheng Wai Jun",
                matricNo: "WIC180010",
                department: "Computer Systems and Networking",
                semester: "1",
                year: "2020/2021",
            },
            {
                name: "Syazana binti Roziana",
                matricNo: "WIC180057",
                department: "Computer Systems and Networking",
                semester: "1",
                year: "2020/2021",
            },
        ];
        const lecturers = [
            {
                name: "Lecturer Example",
                matricNo: "12312412",
                department: "Computer Systems and Networking",
            },
            {
                name: "Coordinator Example",
                matricNo: "111111111",
                department: "Computer Systems and Networking",
                isCoordinator: true,
            },
        ];

        const project = [
            {
                title: "This is a test title for FYP",
                totalStudent: 2,
                totalVacancy: 2,
            },
        ];

        const newStudent = await Students.create(students);
        const newLecturer = await Lecturers.create(lecturers);
        const newProject = await Projects.create(project);

        res.json({ newStudent, newLecturer, newProject });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get("/view", async (req, res) => {
    try {
        const studentList = await Students.find().populate("supervisor");
        const lecturerList = await Lecturers.find().populate("students");
        const projectList = await Projects.find().populate("supervisor").populate("studentAssigned");

        const result2 = await Students.findById("61c3039b36ae9c04a0696d56").populate("supervisor");
        // const result = result2.supervisor;
        // console.log(result[0].name);
        res.json({ studentList, lecturerList, projectList });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get("/delete", async (req, res) => {
    try {
        await Students.deleteMany({});
        await Lecturers.deleteMany({});
        await Projects.deleteMany({});

        const studentList = await Students.find();
        const lecturerList = await Lecturers.find();
        const projectList = await Projects.find();

        res.json({ studentList, lecturerList, projectList });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get("/studenttest", async (req, res) => {
    try {
        const studentID = toId("61c3039b36ae9c04a0696d57");
        const lecturerID = toId("61c3039b36ae9c04a0696d58");

        // remove student and lectuer
        const result = await Students.findByIdAndUpdate(studentID, {
            $pull: {
                supervisor: lecturerID,
            },
        });
        const result2 = await Lecturers.findByIdAndUpdate(lecturerID, {
            $pull: {
                students: studentID,
            },
        });

        res.status(200).json(result2);
        // res.json({ studentList, lecturerList });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get("/assign/:studentid/:lecturerid", async (req, res) => {
    try {
        req.params.lecturerid = toId(req.params.lecturerid);

        //code to assign student to lecturer and lecturer to student:
        const student = await Students.findById(req.params.studentid);
        student.supervisor.push(req.params.lecturerid);
        student.save();

        const lecturer = await Lecturers.findById(req.params.lecturerid);
        lecturer.students.push(req.params.studentid);
        lecturer.save();

        res.json({ lecturer, student });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//Step 1: add the project to the student's pending project list
export default router;
