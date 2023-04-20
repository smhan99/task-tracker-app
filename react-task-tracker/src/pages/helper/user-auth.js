import { db, auth } from "../config/firebase-config";
import { signInWithPopup,
         signInWithEmailAndPassword,
         createUserWithEmailAndPassword,
         sendPasswordResetEmail,
         signOut,
         GoogleAuthProvider
        } from "firebase/auth";
import { getDoc,
         setDoc,
         doc,
        } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const userSnap = await getDoc(doc(db, "users", user.uid));
    if (!userSnap.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        tasks: [],
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const login = async (loginEmail, loginPassword) => {
  try {
    await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
  } catch (error) {
    alert("Login Error:" + error.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      name,
      authProvider: "local",
      email,
      tasks: [],
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logUserOut = async () => {
  await signOut(auth);
};

const getUserDisplayName = async (uid) => {
  const userSnap = await getDoc(doc(db, "users", uid));
  return userSnap.data().name;
}

export {
  signInWithGoogle,
  login,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logUserOut,
  getUserDisplayName,
}