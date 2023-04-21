import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage"; 
import { RegisterPage } from "./pages/RegisterPage";
import { ResetPage } from "./pages/ResetPage";
import { TaskCreatePage } from "./pages/TaskCreatePage";
import { TaskEditPage } from './pages/TaskEditPage';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/task-tracker-app" element={ <HomePage /> } />
          <Route path="/task-tracker-app/login" element={ <LoginPage /> } />
          <Route path="/task-tracker-app/register" element={ <RegisterPage /> } />
          <Route path="/task-tracker-app/reset" element={ <ResetPage /> } />
          <Route path="/task-tracker-app/create-task" element={ <TaskCreatePage /> } />
          <Route path="/task-tracker-app/edit-task" element={ <TaskEditPage /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
