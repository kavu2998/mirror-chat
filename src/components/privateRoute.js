import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {
    const user = useSelector(state => state.userReducer.user)

    return user.name !== undefined ? (children) : <Navigate to="/" />
};

export default PrivateRoute;