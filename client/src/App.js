import logo from "./logo.svg";
import "./App.css";
import Home from "./component/pages/home/Home";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

import NotFound from "./component/NotFound";
import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";
import Footer from "./component/Footer";
import Feeds from "./component/pages/feeds/Main";
import Post from "./component/pages/feeds/Post";
import OTP from "./component/auth/OTP";
import Profile from "./component/pages/user/Profile";
import PetDetail from "./component/pages/feeds/cards/PetDetails";
import { useState } from "react";
import { Protected } from "./component/auth/route";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const isOTPPage = location.pathname === "/Signup";

  return (
    <div className="bg-[#FEFAE0] h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signup/OTP" element={<OTP />} />
        <Route
          path="/feeds"
          element={
            <Protected>
              <Feeds />
            </Protected>
          }
        />
        <Route
          path="/add-post"
          element={
            <Protected>
              <Post />
            </Protected>
          }
        />
        <Route
          path="/user/:activepage"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/pet/:id"
          element={
            <Protected>
              <PetDetail />
            </Protected>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {!isOTPPage && <Footer />}
    </div>
  );
}

export default App;
