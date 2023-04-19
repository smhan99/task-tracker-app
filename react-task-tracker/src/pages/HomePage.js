// import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../pages/config/firebase-config";

export const HomePage = (props) => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <h1>Home Page</h1>
      {user ? (
        <div>
          Logged in
        </div>
      ) : (
        <div>Not logged in yet</div>
      )}
    </div>
  );
}