import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/LandingPage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Header from "./Components/Header";
import Admin from "./Components/Admin/Account/AdminAccount";
import AdminContent from "./Components/Admin/Content/AdminContent";
import Students from "./Components/Students/Upload/Students_Upload";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header><Home /></Header>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Admin/content" element={<AdminContent />} />
        <Route path="/student" element={<Students />} />
      </Routes>
    </Router>
  );
}

export default App;