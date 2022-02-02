import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";
import students from "./student";

export const reducers = combineReducers({ posts, auth, students });
