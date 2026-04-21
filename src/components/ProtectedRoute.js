import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ authedUser, children }) {
    const location = useLocation();

    if (!authedUser) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    return children;
}

//https://www.robinwieruch.de/react-router-private-routes/ Robin Wieruch