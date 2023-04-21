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
          <Route path="/" element={ <HomePage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/reset" element={ <ResetPage /> } />
          <Route path="/create-task" element={ <TaskCreatePage /> } />
          <Route path="/edit-task" element={ <TaskEditPage /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
