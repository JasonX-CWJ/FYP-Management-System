import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


import userRouter from "./routes/user.js";

//General
import postRoutes from "./routes/posts.js"; //announcement (jason)
import infoGuideRouter from "./routes/infoGuide.js"; //this suppose to be view for all - change name to infoGuideView soon (zana)
//import projectRepo from "./routes/projectRepo.js"; - no route, controller and models yet (jason)

//Admin
//import lecturerRepo from "./routes/lecturerRepo.js"; - no route, controller and models yet (jason)
//import studentRepo from "./routes/studentRepo.js"; - no route, controller and models yet (jason)
//import rubricWeight from "./routes/rubricWeight.js"; - all done just uncomment (zana)
//import guideUpdate from "./routes/guideUpdate.js"; - the current infoGuide; currently unfix (zana) though might just able to be removed instead entirely
//import reports from "./routes/reports.js"; - no route, controller and models yet (jason)
//import schedPanel from "./routes/schedPanel.js"; - progressing (zana)


// Lecturer
import lectProjectDet from "./routes/lectProjectDet.js";
//import lectMeetings from "./routes/lectMeetings.js"; 
//import lectFileSubmitted from "./routes/lectFileSubmitted.js"
//import lectAssignMark from "./routes/lectAssignMark.js"

//Panel
//import panelAssignMark from "./routes/panelAssignMark.js"

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRouter);

//General
app.use("/posts", postRoutes);
app.use("/info", infoGuideRouter);
//app.use("/projectRepo", projectRepo);

//Lecturer
app.use("/lectProjectDet", lectProjectDet);
//app.use("/lectMeetings", lectMeetings); - all done just uncomment
//app.use("/lectFileSubmitted", lectFileSubmitted); - all done just uncomment
//app.use("/lectAssignMark", lectAssignMark); - all done just uncomment

//Panel
//app.use("/panelAssignMark", panelAssignMark); - all done just uncomment

//Admin
//app.use("/lecturerRepo", lecturerRepo);
//app.use("/studentRepo", studentRepo);
//app.use("/rubricWeight", rubricWeight);
//app.use("/guideUpdate", guideUpdate);
//app.use("/reports", reports);
//app.use("/schedPanel", schedPanel);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
