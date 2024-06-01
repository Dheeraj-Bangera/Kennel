import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { setUserInfo } from "../../redux/reducers/rootSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
export const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      dispatch(setUserInfo(decoded));
    }
  }, [token, dispatch]);

  if (!token) {
    return <Navigate to={"/"} replace={true} />;
  }

  return children;
};

export const Public = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return children;
  }
  return (
    <Navigate
      to={"/"} 
      replace={true}
    ></Navigate>
  );
};

