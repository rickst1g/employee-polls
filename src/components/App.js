import { connect } from "react-redux";
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Nav from './Nav';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import PollPage from './PollPage';
import Poll from './Poll';
import LeaderBoard from './LeaderBoard';
import Error404 from './Error-404';
import ProtectedRoute from './ProtectedRoute';
import LoadingBar from './LoadingBar';

const App = (props) => {
    const authedUser = props.authedUser;
   
    useEffect(() => {
        props.dispatch(handleInitialData());
    }, [props.dispatch]);

    return (
        <Router>
            <LoadingBar />
            <div className="container">
                <Nav />
                <div className="component-container">
                    <hr />
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute authedUser={authedUser}>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/questions/:id"
                            element={
                                <ProtectedRoute authedUser={authedUser}>
                                    <PollPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/add"
                            element={
                                <ProtectedRoute authedUser={authedUser}>
                                    <Poll />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/leaderboard"
                            element={
                                <ProtectedRoute authedUser={authedUser}>
                                    <LeaderBoard />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/404" element={<Error404 info={"err"} />} />
                        <Route path="*" element={<Error404 info={"path"} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

const mapStateToProps = ({ authedUser }) => ({
    authedUser: authedUser,
});

export default connect(mapStateToProps)(App);

//Reference: Udacity Chiper project - React/Redux course and https://www.robinwieruch.de/react-router-private-routes/ Robin Wieruch