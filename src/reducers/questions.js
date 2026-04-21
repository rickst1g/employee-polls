import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions';

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            };
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
            };
        case ANSWER_QUESTION: {
            const { authedUser, qid, answer } = action;
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser]),
                    },
                },
            };
        }
        default:
            return state;
    }
}

//Reference: Udacity Chiper project - React/Redux course.














/*import { RECEIVE_QUESTIONS, SELECT_ANSWER, SAVE_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            };
        case SELECT_ANSWER:  //Needs work to determine which item was selected
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    likes: 
                    action.hasLiked === true 
                    ? 
                    state[action.id].likes.filter((uid) => uid !== action.authedUser)
                    : 
                    state[action.id].likes.concat([action.authedUser]),
                },
            };
        case SAVE_QUESTION:
            const { question } = action;
            let replyingTo = {};
            if (question.replyingTo !== null) {
                replyingTo = {
                    [question.replyingTo]: {
                        ...state[question.replyingTo],
                        replies: state[question.replyingTo].replies.concat([question.id]),
                    },
                };
            }
            return {
                ...state,
                [action.question.id]: action.question,
                ...replyingTo,

            };
        default:
            return state;
    }
};*/