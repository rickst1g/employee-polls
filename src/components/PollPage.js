import { connect } from "react-redux";
import { useLocation, useParams, Navigate } from 'react-router-dom';
import { handleAnswerQuestion } from '../actions/questions';
import avatar from "../assets/avatar.jpg";

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        const location = useLocation();
        const params = useParams();

        return <Component {...props} router={{ location, Navigate, params }} />;
    };

    return ComponentWithRouterProp;
};

const PollPage = (props) => {
    const { id, authedUser, questions, users, dispatch } = props;

    const question = questions[id];

    if (!authedUser || !users[authedUser]) {
        return null;
    }

    if (!question) {
        return <Navigate to="/404" replace />;
    }

    const author = users[question.author];

    if (!author) {
        return null;
    }

    const userAnswer = users[authedUser].answers[id];
    const hasAnswered = !!userAnswer;
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

    const handleVote = (answer) => {
        if (!hasAnswered) {
            dispatch(handleAnswerQuestion(id, answer));
        }
    };

    return (
        <div className="center question-page">
            <h3>Poll by {author.name}</h3>

            <div className="question-body">
                <img
                    src={author.avatarURL || avatar}
                    alt={`Avatar of ${author.name}`}
                    className="avatar-large"
                />

                {!hasAnswered ? (
                    <div className="question-options">
                        <h4>Would You Rather</h4>

                        <div className="optionOne">
                            {question.optionOne.text}
                            <br />
                            <button
                                className="btn-option"
                                onClick={() => handleVote('optionOne')}
                            >
                                Vote
                            </button>
                        </div>

                        <div className="optionTwo">
                            {question.optionTwo.text}
                            <br />
                            <button
                                className="btn-option"
                                onClick={() => handleVote('optionTwo')}
                            >
                                Vote
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="question-results">
                        <h4>Results</h4>
                        {['optionOne', 'optionTwo'].map((ans) => {
                            const votes = question[ans].votes.length;
                            const percent = totalVotes
                                ? Math.round((votes / totalVotes) * 100)
                                : 0;
                            const isUserChoice = userAnswer === ans;

                            return (
                                <div
                                    key={ans}
                                    className={`result ${isUserChoice ? 'chosen' : ''}`}
                                >
                                    {isUserChoice && <p className="your-choice">Your choice</p>}
                                    <p>{question[ans].text}</p>
                                    <p>{votes} out of {totalVotes} votes ({percent}%)</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
    const { id } = props.router.params;

    return {
        id,
        authedUser,
        questions,
        users,
    };
};

export default withRouter(connect(mapStateToProps)(PollPage));

//Reference: Udacity Chiper project - React/Redux course and Udacity GPT for clean up