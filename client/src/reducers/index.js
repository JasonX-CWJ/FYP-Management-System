import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import infoGuideline from './infoGuideline';
import lectProjectDetails from './Lecturer/lectProjectDetails';

export const reducers = combineReducers({ posts, auth, infoGuideline, lectProjectDetails });
