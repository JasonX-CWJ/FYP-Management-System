import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRouter from "./routes/user.js";
import infoGuideRouter from "./routes/infoGuide.js";

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

app.use("/posts", postRoutes);
app.use("/user", userRouter);
app.use("/info", infoGuideRouter);

//Lecturer
app.use("/lectProjectDet", lectProjectDet);
//app.use("/lectMeetings", lectMeetings); - all done just uncomment
//app.use("/lectFileSubmitted", lectFileSubmitted); - progressing
//app.use("/lectAssignMark", lectAssignMark); - untouched

//Panel
//app.use("/panelAssignMark", panelAssignMark); - untouched

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
