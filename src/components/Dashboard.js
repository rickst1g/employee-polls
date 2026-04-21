import { connect } from "react-redux";
import { useState } from "react";
import TableGrid from "./TableGrid";

const Dashboard = ({ authedUser, questions, users }) => {
    const [showAnswered, setShowAnswered] = useState(false);

    const currentUser = authedUser ? users[authedUser] : null;

    if (!authedUser) return null;
    if (!currentUser) return null;

    const answeredIds = Object.keys(currentUser.answers);
    const sortedIds = Object.keys(questions).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp
    );

    const unanswered = sortedIds.filter((id) => !answeredIds.includes(id));
    const answered = sortedIds.filter((id) => answeredIds.includes(id));

    const visibleData = {
        questions,
        users,
        data: showAnswered ? answered : unanswered,
        perRow: 4,
    };


    return (
        <div>
            
            <h3 className="center">Dashboard</h3>
            <div className="dashboard-tabs center">
                <button className={!showAnswered ? "tab active-tab" : "tab"} onClick={() => setShowAnswered(false)}><strong>Unanswered ({unanswered.length})</strong></button>
                <button className={showAnswered ? "tab active-tab" : "tab"} onClick={() => setShowAnswered(true)}><strong>Answered ({answered.length})</strong></button>
            </div>
            <div className="pad-20">
                <table className="dashboard-table center">
                    <thead>
                        <tr>
                            <th colSpan="4">{showAnswered ? "ANSWERED" : "UNANSWERED"}</th>
                        </tr>
                    </thead>
                    <TableGrid info={visibleData} />
                </table>
            </div>
        </div>
    );
};

const mapStateToProps = ({ authedUser, users, questions }) => ({
  questions,
  users,
  authedUser,
});

export default connect(mapStateToProps)(Dashboard);

//Reference: Udacity Chiper project - React/Redux course.