import { connect } from "react-redux";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import AvatarDropdown from "./AvatarDropdown";
import { useLocation, useNavigate } from 'react-router-dom';
import { saveUser } from "../utils/api";
import { addUser } from "../actions/users";

const LoginPage = (props) => {
    const [userId, setUserId] = useState('');
    
    const users = props.users;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    function handleNewUser(e) {
        e.preventDefault();
        const id = e.target.userName.value
        const name = e.target.name.value
        const password = e.target.password.value
        
        const info = { id, name, password };
        
        saveUser(info).then((user) => {
            dispatch(addUser(user));
            dispatch(setAuthedUser(user.id));
            navigate(from, { replace: true });
        });
    }

    return (
        <div className="login">
            <div>
                <p className="center"><span className="h3-font">Employee Polls</span></p>
            </div>
            <div>
                <h3 className="center">Login</h3>
            </div>
            <div className="center">
                <AvatarDropdown
                    users={users}
                    onSelect={(user) => {
                        dispatch(setAuthedUser(user));
                        navigate(from, { replace: true });
                    }}
                />
            </div>
            <div className="center">
                <h3>Add New User</h3>
                <form onSubmit={handleNewUser}>
                    <div className="pad-5">
                        <input type="text" name="userName" id="userName" placeholder="User Name" required />
                    </div>
                    <div className="pad-5">
                        <input type="text" name="name" id="name" placeholder="First and Last Name" required />
                    </div>
                    <div className="pad-5">
                        <input type="password" name="password" id="password" placeholder="Password" required />
                    </div>
                    <div className="pad-5">
                        <button type="submit" >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = ({ users }) => ({
    users,
});

export default connect(mapStateToProps)(LoginPage);

//Reference: Udacity Chiper project - React/Redux course. Check code with Udacity GPT 