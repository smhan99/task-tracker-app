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
    navigate("/task-tracker-app");
  }

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/task-tracker-app"> Home </Link>
        {user ? (
            <>
              <strong className="greetings">Hi, {name}</strong>
              <button className="logout-button" onClick={signout}> Log Out</button>
            </>
        ) : (
          <Link to="/task-tracker-app/login"> Login </Link>
        )}
      </div>
    </div>
  );
};