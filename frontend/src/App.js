import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/LandingPage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Header from "./Components/Header";
import Admin from "./Components/Admin/Account/AdminAccount";
import Students from "./Components/Students/Upload/Students_Upload";
import ForgotPassword from "./Components/ForgotPassword";
import AdminFaculty from "./Components/Admin/Faculty/AdminFaculty";
import ArticleDetailPage from './Components/ArticleDetailPage';
import CoordinatorDashboard from "./Components/Coordinator/Dashboard/Coordinator_Dashboard";
import Profile from "./Components/Admin/Profile/Admin_Profile";
import CoordinatorArticles from "./Components/Coordinator/Articles/Coordinator_Articles";
import CoordinatorArticlesDetails from "./Components/Coordinator/Articles/Coordinator_Articles_Details"; // Import the component
import StudentsView from "./Components/Students/View_Articles/Students_View";
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
        <Route path="/articles/:id" element={<Header><ArticleDetailPage /></Header>} />
        <Route path="/student" element={<Students />} />
        <Route path="/Admin/Faculty" element={<AdminFaculty />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Coordinator" element={<CoordinatorDashboard />} />
        <Route path="/Coordinator/Articles" element={<CoordinatorArticles />} />
        <Route path="/Coordinator/Articles/:id" element={<CoordinatorArticlesDetails />} /> {/* Add this line */}
        <Route path="/Setting/Profile" element={<Profile />} />
        <Route path="/student/View" element={<StudentsView />} />
      </Routes>
    </Router>
  );
}

export default App;