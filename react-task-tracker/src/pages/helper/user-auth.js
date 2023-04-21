import { db, auth } from "../config/firebase-config";
import { signInWithPopup,
         signInWithEmailAndPassword,
         createUserWithEmailAndPassword,
         sendPasswordResetEmail,
         signOut,
         GoogleAuthProvider,
        } from "firebase/auth";
import { getDoc,
         setDoc,
         doc,
         getDocs,
         collection,
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
        username: "",
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const login = async (loginUsername, loginPassword) => {
  const emailSnap = await getDoc(doc(db, "username-email", loginUsername));
  if (emailSnap.exists()) {
    let loginEmail = emailSnap.data().email;
    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch (error) {
      alert("Invalid Credentials");
    }
  } else {
    alert("Invalid Credentials");
  }
};

const registerWithEmailAndPassword = async (name, username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      name,
      authProvider: "local",
      email,
      username,
      tasks: [],
    })
    await setDoc(doc(db, "username-email", username), {email});
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

const getUsernames = async () => {
  const querySnapshot = await getDocs(collection(db, "username-email"));
  let usernameList = []
  querySnapshot.forEach((doc) => {
    usernameList.push(doc.id);
  });
  return usernameList;
}

export {
  signInWithGoogle,
  login,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logUserOut,
  getUserDisplayName,
  getUsernames,
}