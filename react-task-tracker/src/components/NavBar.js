import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../pages/config/firebase-config";
import { logUserOut, getUserDisplayName } from "../pages/helper/user-auth";

import "./NavBar.css";


export const NavBar = () => {
  const [name, setName] = useState("");
  const [user] = useAuthState(auth); //, loading, error
  const navigate = useNavigate();

  useEffect(() => {
    if (user) getUserDisplayName(user.uid).then((displayName) => setName(displayName))
  }, [user])

  const signout = () => {
    logUserOut();
    navigate("/");
  }

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Home </Link>
        {user ? (
          <>
          Hi, {name}
          <button onClick={signout} className="logout-button">Log Out</button>
          </>
        ) : (
          <Link to="/login"> Login </Link>
        )}
      </div>
    </div>
  );
};