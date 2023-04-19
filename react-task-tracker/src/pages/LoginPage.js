import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { useNavigate } from "react-router-dom";

import '../App.css';

export const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      navigate("/");
    } catch (error) {
      alert("Login Error:" + error.message);
      navigate("/login");
    }
  };

  const checkKeyPress = (e) => {
    const { key } = e;
    if (key === "Enter") {
      login();
    }
  };


  return (
    <div className="login-form">
      <h1>Login</h1>
      <div className="form-group row">
        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input className="form-control" id="inputEmail" placeholder="Email..." 
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
          onKeyDown={checkKeyPress}/>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
          <input type="password" className="form-control" id="inputPassword" placeholder="Password" 
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
          onKeyDown={checkKeyPress}/>
        </div>
      </div>
      <div className="form-group">
        <button onClick={login} className="btn btn-primary mb-2"> Login </button>
      </div>
    </div>
  );
}