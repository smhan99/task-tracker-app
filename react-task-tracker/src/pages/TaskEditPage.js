import { useState } from "react";
import moment from "moment";
import { doc, updateDoc, Timestamp } from "firebase/firestore";

import { db } from "./config/firebase-config";

export const TaskEditPage = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(0);
  const [due, setDue] = useState(Date.now());
  
  const onEdit = async () => {
    const taskRef = doc(db, "tasks", "FFarU4wvlZ7yySK5MycN"); //prop.taskId

    // Set the "capital" field of the city 'DC'
    await updateDoc(taskRef, {
      title: title,
      description: description,
      status: status,
      created: Timestamp.fromDate(new Date()),
      due: due,
      uid: uid,
    });
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
      <input
        type="number"
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="status-field"/><br/>
      <br></br>
      
      <label htmlFor="due" className="label">Due Date:</label><br/>
      <br></br>
      <input
        type="date" 
        id="due"
        value={moment(due).format('YYYY-MM-DD')}
        onChange={(e) => setDue(new Date(e.target.value))}/><br/>
      
      <button onClick={onEdit} className="create-button">
      Create!
      </button>
    </div>
  )
}

