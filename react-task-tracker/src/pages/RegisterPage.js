import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./config/firebase-config";
import { registerWithEmailAndPassword, signInWithGoogle, getUsernames } from './helper/user-auth';

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameList, setUsernameList] = useState([]);
  const [usenameExist, setUsernameExist] = useState(false);

  const [user] = useAuthState(auth); //, loading, error
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    if (!email) alert("Please enter email");
    if (!password) alert("Please enter password");
    if (!username) alert("Please enter username");
    if (usenameExist) alert("Username already exists, please try another one");
    else registerWithEmailAndPassword(name, username, email, password);
  };
  
  useEffect(() => {
    getUsernames().then((list) => setUsernameList(list));
  }, [])

  useEffect(() => {
    if (user)
      navigate("/task-tracker-app/");
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (username && usernameList.includes(username)) setUsernameExist(true);
    else setUsernameExist(false);
    // eslint-disable-next-line
  }, [username])

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"/>

        <input
          type="text"
          className="register__textBox"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"/>
        <div>{usenameExist && <p style={{color: "red"}}>Username Already Exists. Please try another one.</p>}</div>

        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"/>

        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" />

        <button className="register__btn" onClick={register}>
          Register
        </button>

        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}>
          Register with Google
        </button>

        <div>
          Already have an account? <Link to="/task-tracker-app/login">Login</Link>
        </div>
      </div>
    </div>
  )
}