import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { logoutAuthedUser } from '../actions/authedUser';
import avatar from "../assets/avatar.jpg";

const Nav = (props) => {
    const authedUser = props.authedUser;
    const users = props.users;

    const handleLogout = () => {
        props.dispatch(logoutAuthedUser());
    };

    const user = authedUser ? users[authedUser] : null;
    
    return (
        <nav className="nav">
            <ul className="ul-left">
                <li>
                    <NavLink to="/" end>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/leaderboard">Leaderboard</NavLink>
                </li>
                <li>
                    <NavLink to="/add">New</NavLink>
                </li>
            </ul>
            {user && (
                <ul className="ul-right">
                    <li className="li-img">
                        {user.avatarURL ? <img className="avatar-small" src={user.avatarURL} alt="avatar" /> : <img className="avatar-small" src={avatar} alt="avatar" />}
                    </li> 
                    <li className="nav-user">
                        { user.name }
                    </li>
                    <li onClick={handleLogout} >
                        Logout
                    </li>
                </ul>
            )}
        </nav>
    );
}

const mapStateToProps = ({ users, authedUser }) => ({
    users: users,
    authedUser: authedUser,
});

export default connect(mapStateToProps)(Nav);

//Reference: Udacity Chiper project - React/Redux course.