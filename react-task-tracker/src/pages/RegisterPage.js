import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./config/firebase-config";
import { logUserOut, registerWithEmailAndPassword, signInWithGoogle } from './helper/user-auth';

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user] = useAuthState(auth); //, loading, error
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  
  useEffect(() => {
    if (user) {
      logUserOut();
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [user]);

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
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}