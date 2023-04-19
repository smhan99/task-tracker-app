import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../pages/config/firebase-config";
import { logUserOut, getUserDisplayName } from "../pages/helper/user-auth";
import './NavBar.css'

export const NavBar = () => {
  const [name, setName] = useState("");
  const [user] = useAuthState(auth); //, loading, error

  useEffect(() => {
    if (user) getUserDisplayName(user.uid).then((displayName) => setName(displayName))
  }, [user])

  return (
    <div className="navbar">
      <div className="links-nav">
        <Link to="/"> Home </Link>
        {user ? (
          <>
          <div>Hi, {name}</div>
          <button onClick={logUserOut} className="logoutBtn"> Log Out</button>
          </>
        ) : (
          <Link to="/login"> Login </Link>
        )}
      </div>
    </div>
  );
};
