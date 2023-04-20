import { db } from "../config/firebase-config";
import { collection, query, getDocs, where, Timestamp, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore"; 

const statusMap = {
  0: "In Progress",
  1: "Completed",
}

const getUserTasks = async (uid) => {
  const taskQuery = query(collection(db, "tasks"), where("uid", "==", uid));
  const taskSnapshot = await getDocs(taskQuery);
  let tasks = [];
  taskSnapshot.forEach((doc) => {
    tasks.push(doc.data());
  })
  return tasks;
}

const getTaskStatus = (status) => {
  return statusMap[status];
}


const createNewTask = async (uid, title, description, due) => {
  let task = {
    title: title,
    description: description,
    uid: uid,
    status: 0,
    created: Timestamp.fromDate(new Date()),
    due: Timestamp.fromDate(due)
  }
  const taskRef = await addDoc(collection(db, "tasks"), task);
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    tasks: arrayUnion(taskRef.id)
  });
}

export {
  getTaskStatus,
  getUserTasks,
  createNewTask
}