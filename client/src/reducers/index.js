import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import infoGuideline from './infoGuideline';
import lectProjectDetails from './Lecturer/lectProjectDetails';
import panelAssignMark from './LPanel/panelAssignMark';
import panelVote from './LPanel/panelVote'

export const reducers = combineReducers({ posts, auth, infoGuideline, lectProjectDetails, panelAssignMark, panelVote });
