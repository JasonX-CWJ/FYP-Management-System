import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Students from "../models/student.js";
import Lecturers from "../models/lecturer.js";
import Projects from "../models/project.js";
import User from "../models/user.js";
import csvtojson from "csvtojson";

import ROLE from "../constants/userRole.js";

import multer from "multer";
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "./uploads/");
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname);
//     },
// });

const upload = multer({ storage: multer.memoryStorage() });

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
        const userList = await User.find().populate("studentData").populate("lecturerData");

        const result2 = await Students.findById("61c3039b36ae9c04a0696d56").populate("supervisor");
        // const result = result2.supervisor;
        // console.log(result[0].name);
        res.json({ studentList, lecturerList, projectList, userList });
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
        const studentID = toId("61c315a88b455319cc087d5e");
        const lecturerID = toId("61c315a88b455319cc087d60");

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

        res.status(200).json(result);
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

        const lecturer = await Lecturers.findById(req.params.lecturerid);
        lecturer.students.push(req.params.studentid);

        student.save();
        lecturer.save();

        res.json({ lecturer, student });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// DRAFT FOR BATCH UPDATE LIST OF USERS

//ROUTE 1: create and upload user list
router.post("/upload-student-list", upload.single("file"), async (req, res) => {
    //check if its from admin, to be done
    console.log(req.body?.userrole);

    //read and check file validity
    const jsonObj = await csvtojson().fromString(req.file.buffer.toString());
    for (var i in jsonObj) {
        //check if student exists, if exists, just update the user detail instead.
        const student = await Students.findOne({ matricNo: jsonObj[i].matricNo });
        if (student !== null) {
            await Students.findByIdAndUpdate(student._id, jsonObj[i], { new: true });
        } else {
            //if does not exist, create the new student instead.
            const newStudent = await Students.create(jsonObj[i]);
            const hashedPassword = await bcrypt.hash(newStudent.matricNo, 12);
            const user = await User.create({ ...jsonObj[i], password: hashedPassword, role: ROLE.STUDENT, studentData: newStudent._id });
        }
    }
    res.status(200).json({ message: "Upload Success!" });
});

//ROUTE 2: Fetch all students list
router.get("/fetch-student-list", async (req, res) => {
    try {
        const studentList = await Students.find().populate("supervisor");

        res.status(200).json(studentList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//ROUTE 3: Fetch all lecturer list
router.get("/fetch-lecturer-list", async (req, res) => {
    const lecturerList = await Lecturers.find().populate("students");
    res.status(200).json(lecturerList);
});

export const getPosts = async (req, res) => {};

//ROUTE 4: Edit one student
router.post("/upload-student-list", async (req, res) => {
    //check if its from admin, to be done
    console.log(req.body?.userrole);

    const student = await Students.findById();
    res.status(200).json({ message: "Upload Success!" });
});

// DRAFT FOR ASSIGNING PROJECT
router.post("/request-project", async (req, res) => {
    //assume
});

router.get("/assignUser/:id/:userid", async (req, res) => {
    try {
        req.params.userid = toId(req.params.userid);
        //code to assign student to lecturer and lecturer to student:
        const user = await User.findById(req.params.userid);
        const student = await Students.findById(req.params.id);
        console.log("yes");
        console.log(user.role);
        console.log(ROLE.STUDENT);
        if (user.role === ROLE.STUDENT) {
            user.studentData = req.params.id;
        } else if (user.role === ROLE.LECTURER) {
            user.lecturerData = req.params.id;
        }
        user.save();
        res.json({ user, student });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//Step 1: add the project to the student's pending project list
export default router;
