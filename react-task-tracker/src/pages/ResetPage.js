import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./config/firebase-config";
import { sendPasswordReset } from './helper/user-auth';

export const ResetPage = () => {
  const [email, setEmail] = useState("");
  const [user] = useAuthState(auth); //, loading, error
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"/>
        <button
          className="reset__btn"
          onClick={() => sendPasswordReset(email)}>
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  )
}

export default ResetPage