import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import infoGuideline from './infoGuideline';
import lectProjectDetails from './Lecturer/lectProjectDetails';
import lectMeetings from './Lecturer/lectMeetings';
import lectFileSubmitted from './Lecturer/lectFileSubmitted';
import panelAssignMark from './LPanel/panelAssignMark';
import panelVote from './LPanel/panelVote';
import schedPanel from './Admin/schedPanel';
import rubricWeight from './Admin/rubricWeight';

export const reducers = combineReducers({ posts, auth, infoGuideline, lectProjectDetails, lectMeetings, lectFileSubmitted, panelAssignMark, panelVote, schedPanel, rubricWeight });
