import { combineReducers } from "redux";


import posts from './posts';
import auth from './auth';
import infoGuideline from './infoGuideline';
// import projectRepo from './projectRepo';

import lectProjectDetails from './Lecturer/lectProjectDetails';
import lectProjectApplied from "./Lecturer/lectProjectApplied";
import lectMeetings from './Lecturer/lectMeetings';
import lectFileSubmitted from './Lecturer/lectFileSubmitted';

import panelAssignMark from './LPanel/panelAssignMark';
import panelVote from './LPanel/panelVote';

import schedPanel from './Admin/schedPanel';
import rubricWeight from './Admin/rubricWeight';
// import lecturerRepo from './Admin/lecturerRepo';
// import studentRepo from './Admin/studentRepo';

// import ProjectDetails from './Student/ProjectDetails';
// import Meetings from './Student/Meetings';

//please add commented above in export below

export const reducers = combineReducers({ posts, auth, infoGuideline, lectProjectDetails, lectProjectApplied, lectMeetings, lectFileSubmitted, panelAssignMark, panelVote, schedPanel, rubricWeight });
