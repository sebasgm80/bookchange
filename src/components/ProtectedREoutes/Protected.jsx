import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export const Protected = ({ children }) => {
    const { user } = useAuth();
    if (user == null || user?.check == false) {
        return <Navigate to="/login" />;
    }

    return children;
};
