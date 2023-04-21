import { useState, useEffect, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { Table, TableBody, TableHead, TableCell, TableContainer, TableRow, Paper, 
         Button } from '@mui/material';

import { getTaskStatus, getUserTasks, deleteTask } from "../pages/helper/task";
import { getUserDisplayName } from "./helper/user-auth";
import { auth } from "../pages/config/firebase-config";
import { DeleteButton } from "./DeleteButton";

export const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  const [user] = useAuthState(auth);

  const sortedTasks = useMemo(() => {
    let unsortedTasks = [...tasks];
    if (sort !== null) {
      unsortedTasks.sort((a, b) => {
        if (a[sort.key] < b[sort.key]) {
          return sort.direction === 'asc' ? -1 : 1;
        }
        if (a[sort.key] > b[sort.key]) {
          return sort.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return unsortedTasks;
  }, [tasks, sort]);

  const setSortConfig = (key) => {
    let direction = 'asc';
    if (sort && sort.key === key && sort.direction === 'asc') {
      direction = 'desc';
    }
    setSort({ key, direction });
  };

  useEffect(() => {
    if (user) {
      getUserTasks(user.uid).then((tasks) => setTasks(tasks));
      getUserDisplayName(user.uid).then((displayName) => setName(displayName));
    }
  }, [user])

  const handleDelete = async (taskId, index) => {
    await deleteTask(taskId);
    tasks.splice(index, 1);
    setTasks(tasks);
    setSort({ key:'title', direction:'asc' });
    setOpen(false);
  }

  return (
    <div align="center">
      <h1>Home Page</h1>
      {user ? (
        <div>
          Logged in as <strong>{name}</strong>
          <h2> Your Tasks: </h2>
          <TableContainer component={Paper} style={{width:"90%", marginLeft:"auto", marginRight:"auto"}}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><Button type="button" onClick={() => setSortConfig('title')}>Title</Button></TableCell>
                  <TableCell align="right"><Button type="button" onClick={() => setSortConfig('description')}>Description</Button></TableCell>
                  <TableCell align="right"><Button type="button" onClick={() => setSortConfig('status')}>Status</Button></TableCell>
                  <TableCell align="right"><Button type="button" onClick={() => setSortConfig('created')}>Created On</Button></TableCell>
                  <TableCell align="right"><Button type="button" onClick={() => setSortConfig('due')}>Due</Button></TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks && sortedTasks.map((task, index) => (
                  <TableRow key={task.id} >
                    <TableCell component="th" scope="row">{task.title}</TableCell>
                    <TableCell align="right">{task.description}</TableCell>
                    <TableCell align="right">{getTaskStatus(task.status)}</TableCell>
                    <TableCell align="right">{task.created.toDate().toDateString()}</TableCell>
                    <TableCell align="right">{task.due.toDate().toDateString()}</TableCell>
                    <TableCell align="right"><Button><Link to="/edit-task" state={{ task: task }}>Edit Task</Link></Button></TableCell>
                    <TableCell align="right"><DeleteButton taskId={task.id} index={index} handleDelete={handleDelete} open={open} setOpen={setOpen}/></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Link to="/create-task"><Button>New Task</Button></Link>
          
        </div>
      ) : (
        <div>Not logged in yet</div>
      )}
    </div>
  );
}