import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

import { createNewTask } from "./helper/task";
import { auth } from "./config/firebase-config";


export const TaskCreatePage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState(Date.now());

  const onCreate = async () => {
    await createNewTask(user.uid, title, description, due);
    navigate("/");
  }

  return (
    <div>
      <h1>Create a new task</h1>
      <label htmlFor="title">Title:</label><br/>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"/><br/>
      <label htmlFor="description">Description:</label><br/>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"/><br/>
      <label htmlFor="due">Due Date:</label><br/>
      <input
        type="date" 
        id="due"
        value={moment(due).format('YYYY-MM-DD')}
        onChange={(e) => setDue(new Date(e.target.value))}/><br/>
      
      <button onClick={onCreate}>
          Create!
      </button>
    </div>
  )
}