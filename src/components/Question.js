import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import avatar from "../assets/avatar.jpg";

const Question = ({id, questions, users}) => {
    const question = questions[id];
    const author = users[question.author];
    const timeStamp = question.timestamp;

    const newDate = new Date(timeStamp);

    const formattedDate =
        newDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) +
        " | " +
        (newDate.getMonth() + 1).toString().padStart(2, "0") + "/" +
        newDate.getDate().toString().padStart(2, "0") + "/" +
        newDate.getFullYear();

    return (
        <div className="question-box">
            <div className="h5-font">{author.id}</div>
            <div className="h6-font">{formattedDate}</div>
            <div>
                <button className="btn-dash"><Link to={`/questions/${id}`}>Show</Link></button>
            </div>
        </div>
    )
}

export default connect()(Question);

//Reference: Udacity Chiper project - React/Redux course. Timestamp format-coPilot