import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { setUserInfo } from "../../redux/reducers/rootSlice";
import { useDispatch } from "react-redux";
export const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  if (!token) {
    return (
      <Navigate
        to={"/"}
        replace={true}
      ></Navigate>
    );
  }
const decoded =jwtDecode(token)
console.log(decoded)
dispatch(setUserInfo(decoded));
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

