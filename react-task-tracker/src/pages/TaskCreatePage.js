import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

import { createNewTask } from "./helper/task";
import { auth } from "./config/firebase-config";

import "./TaskCreatePage.css";

export const TaskCreatePage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState(Date.now());

  const onCreate = async () => {
    if (due <= Date.now()) alert("Cannot create due date in the past");
    else  {
      await createNewTask(user.uid, title, description, due);
      navigate("/");
    }
  }

  return (
    <div>
      <h1>Create a new task</h1>

      <label htmlFor="title" className="label">Title:</label><br/>
      <br></br>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"/><br/>

      <label htmlFor="description" className="label">Description:</label><br/>
      <br></br>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="description-field"/><br/>
      <br></br>
      
      <label htmlFor="due" className="label">Due Date:</label><br/>
      <br></br>
      <input
        type="date" 
        id="due"
        value={moment(due).format('YYYY-MM-DD')}
        onChange={(e) => setDue(new Date(e.target.value))}/><br/>
      
      <button onClick={onCreate} className="create-button">
          Create!
      </button>
    </div>
  )
}