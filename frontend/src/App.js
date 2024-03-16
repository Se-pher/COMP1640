import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/LandingPage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Header from "./Components/Header";
import Admin from "./Components/Admin/Account/AdminAccount";
import Students from "./Components/Students/Upload/Students_Upload";
import ForgotPassword from "./Components/ForgotPassword";
import AdminCategories from "./Components/Admin/Categories/AdminCategories"
import AdminFaculty from "./Components/Admin/Faculty/AdminFaculty";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header><Home /></Header>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/student" element={<Students />} />
        <Route path="/Admin/Category" element={<AdminCategories />} />
        <Route path="/Admin/Faculty" element={<AdminFaculty />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;