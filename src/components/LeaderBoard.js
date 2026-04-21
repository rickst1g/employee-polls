import { connect } from "react-redux";
import Error404 from "./Error-404";
import avatar from "../assets/avatar.jpg";

const LeaderBoard = (props) => {
    const leaderData = props.leaderData
    const authedUser = props.authedUser

    return (
        authedUser ? 
        <div>
            <h3 className="center">Leaderboard</h3>
            <table className="leader">
                <thead>
                    <tr>
                        <th width="50%">
                            Users
                        </th>
                        <th width="15%">
                            Answered
                        </th>
                        <th width="15%">
                            Created
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        leaderData.map((leader, index) => (
                            <tr key={leader.user}>
                                <td>
                                    <div className="leader-float-left"> 
                                        {
                                            leader.avatar ? <img className="avatar" src={leader.avatar} alt="avatar"/>
                                            :
                                            <img className="avatar" src={avatar} alt="avatar"/>
                                        }
                                    </div>
                                    <div className="leader-float-left ">
                                        <div className="leader-font-medium">{leader.name}</div>
                                        <div className="leader-font-small">{leader.user}</div>
                                    </div>
                                </td>
                                <td>
                                    {leader.answered}
                                </td>
                                <td>
                                    {leader.created}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        :
        <Error404 info={"login"} />
    )
};

const mapStateToProps = ({ users, authedUser }) => {
    const leaderData = Object.values(users)
    .map(user => ({
        user: user.id,
        name: user.name,
        avatar: user.avatarURL,
        answered: Object.values(user.answers).length,
        created: user.questions.length,
        total: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => b.total - a.total)    
    
    return {
        leaderData,
        authedUser
    };
};

export default connect(mapStateToProps)(LeaderBoard);

//Reference: Udacity Chiper project - React/Redux course and ideas from james-priest - placeholder avatar from https://www.freepik.com/free-photos-vectors/profile-avatar