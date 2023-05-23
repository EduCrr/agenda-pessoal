import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const RequiredAuth = ({ children }) => {
  let user = useSelector((state) => state.user);
  if (user.token !== "") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
