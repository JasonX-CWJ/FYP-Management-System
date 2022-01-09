import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//General
import userRouter from "./routes/user.js";
import postRoutes from "./routes/posts.js";
import infoGuideRouter from "./routes/infoGuide.js";

//Admin


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

//General
app.use("/user", userRouter);
app.use("/posts", postRoutes);
app.use("/info", infoGuideRouter);

//Lecturer
app.use("/lectProjectDet", lectProjectDet);
//app.use("/lectMeetings", lectMeetings); - all done just uncomment
//app.use("/lectFileSubmitted", lectFileSubmitted); - all done just uncomment
//app.use("/lectAssignMark", lectAssignMark); - all done just uncomment

//Panel
//app.use("/panelAssignMark", panelAssignMark); - progressing

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
