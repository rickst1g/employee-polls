import { thunk } from "redux-thunk";
import logger from "./logger";
import { applyMiddleware } from "redux";

export default applyMiddleware(thunk, logger);

//Reference: Udacity Chiper project - React/Redux course.