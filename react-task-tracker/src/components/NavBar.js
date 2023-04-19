import { Link } from "react-router-dom";
import { db, auth } from "../pages/config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";

export const NavBar = () => {
  const [user] = useAuthState(auth); //loading, error
  const navigate = useNavigate();

  const [currUser, setCurrUser] = useState({
    email: "",
    name: "",
    remaining: 0,
    id: ""
  });

  const getCurrentUser = async (id) => {
    const memberRef = doc(db, "members", id);
    const data = await getDoc(memberRef);
    const currUser = {
      ...data.data(),
      id: id
    };
    localStorage.setItem("currUser", JSON.stringify(currUser));
    setCurrUser(currUser);
  }

  const logUserOut = async () => {
    await signOut(auth);
    const emptyUser = {
      email: "",
      name: "",
      remaining: 0,
      id: ""
    };
    localStorage.setItem("currUser", JSON.stringify(emptyUser))
    setCurrUser(emptyUser);
    navigate("/");
  };

  useEffect(() => {
    const handleUserChange = async (id) => {
      await getCurrentUser(id);
    }
    if (user) handleUserChange(user.uid);
  }, [user]);

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Home </Link>
        {!user ? (
          <Link to="/login"> Login </Link>
        ) : (
          <Link to="/suggest"> Make Suggestion </Link>
        )}
        {user && ( <Link to="/profile"> Profile </Link> )}
        {user && ( <Link to="/vote"> Vote </Link> )}
        {user && ( <Link to="/rank"> Rankings </Link> )}
      </div>
      <div className="user">
        {user && (
          <>
            <p> { currUser.name } </p>
            <button onClick={logUserOut}> Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};