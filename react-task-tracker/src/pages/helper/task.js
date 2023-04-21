import { db } from "../config/firebase-config";
import { collection, 
         query, 
         getDocs, 
         where, 
         Timestamp, 
         addDoc, 
         doc, 
         updateDoc, 
         arrayUnion,
         deleteDoc } from "firebase/firestore"; 

const statusMap = {
  0: "In Progress",
  1: "Completed",
}

const getUserTasks = async (uid) => {
  const taskQuery = query(collection(db, "tasks"), where("uid", "==", uid));
  const taskSnapshot = await getDocs(taskQuery);
  let tasks = [];
  taskSnapshot.forEach((doc) => {
    tasks.push({...doc.data(), id: doc.id});
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
    due: Timestamp.fromDate(new Date(due))
  }
  const taskRef = await addDoc(collection(db, "tasks"), task);
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    tasks: arrayUnion(taskRef.id)
  });
}

const updateTask = async (id, task) => {
  const taskRef = doc(db, "tasks", id);

  await updateDoc(taskRef, task);
}

const deleteTask = async (id) => {
  await deleteDoc(doc(db, "tasks", id));
}

export {
  getTaskStatus,
  getUserTasks,
  createNewTask,
  updateTask,
  deleteTask,
}