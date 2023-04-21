import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Timestamp } from "firebase/firestore"; 
import moment from "moment";

import { updateTask, getTaskStatus } from "./helper/task";

export const TaskEditPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(0);
  const [due, setDue] = useState(Date.now());

  const location = useLocation();
  const { task } = location.state;

  const navigate = useNavigate();
  
  const onEdit = async () => {
    const newTask = {
      title: title,
      description: description,
      status: status,
      due: Timestamp.fromDate(due),
      created: new Timestamp(task.created.seconds, task.created.nanoseconds),
      uid: task.uid,
    }
    await updateTask(task.id, newTask);
    navigate("/");
  }

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setDue(new Date(task.due.seconds * 1000));
  }, [task])

  return (
    <div>
    <h1>Create a new task</h1>

      <label htmlFor="title" className="label">Title:</label><br/>
      <br></br>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}/>
        <br/>

      <label htmlFor="description" className="label">Description:</label><br/>
      <br></br>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="description-field"/><br/>
      <br></br>

      <label htmlFor="status" className="label">Status:</label><br/>
      <br></br>
      <select id="status" size="2" value={status.toString()} onChange={(e) => setStatus(parseInt(e.target.value))}>
        <option value="0">{getTaskStatus(0)}</option>
        <option value="1">{getTaskStatus(1)}</option>
      </select><br/>
      <br></br>
      
      <label htmlFor="due" className="label">Due Date:</label><br/>
      <br></br>
      <input
        type="date" 
        id="due"
        value={moment(due).format('YYYY-MM-DD')}
        onChange={(e) => setDue(new Date(e.target.value))}/><br/>
      
      <button onClick={onEdit} className="edit-button">
      Save Changes!
      </button>
    </div>
  )
}

