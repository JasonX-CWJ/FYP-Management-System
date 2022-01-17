import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import infoGuideline from './infoGuideline';
import lectProjectDetails from './Lecturer/lectProjectDetails';
import lectMeetings from './Lecturer/lectMeetings';
import panelAssignMark from './LPanel/panelAssignMark';
import panelVote from './LPanel/panelVote'

export const reducers = combineReducers({ posts, auth, infoGuideline, lectProjectDetails, lectMeetings, panelAssignMark, panelVote });
