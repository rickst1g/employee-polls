import { SHOW_LOADING, HIDE_LOADING } from "../actions/loadingBar";
const DEFAULT_SCOPE = "default";

export default function loadingBar(state = 0, action) {
    switch (action.type) {
        case SHOW_LOADING:
            return state + 1;
        case HIDE_LOADING:
            return Math.max(0, state - 1)
        default:
            return state;
    }
};

//Reference: Udacity Chiper project - React/Redux course.