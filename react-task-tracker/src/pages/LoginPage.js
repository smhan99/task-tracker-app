import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./config/firebase-config";
import { login, signInWithGoogle } from "./helper/user-auth";

import '../App.css';

export const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user] = useAuthState(auth); //, loading, error

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
    // eslint-disable-next-line
  }, [user]);
  

  const checkKeyPress = (e) => {
    const { key } = e;
    if (key === "Enter") {
      login(loginEmail, loginPassword);
    }
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <input
        type="text"
        className="login__textBox"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        placeholder="E-mail Address"
        onKeyDown={checkKeyPress} />
      <input
        type="password"
        className="login__textBox"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        placeholder="Password"
        onKeyDown={checkKeyPress} />
      <button
        className="login__btn"
        onClick={() => login(loginEmail, loginPassword)} >
        Login
      </button>

      <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
      </button>
      <div> <Link to="/reset">Forgot Password?</Link> </div>
      <div> Don't have an account? <Link to="/register">Register</Link> now.</div>

    </div>
  );
}
