import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Admin from "./Components/Admin/Account/AdminAccount";
import Students from "./Components/Students/Upload/Students_Upload";
import CoordinatorDashboard from "./Components/Coordinator/Dashboard/Coordinator_Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Components/LandingPage";
import Header from "./Components/Header";
import ForgotPassword from "./Components/ForgotPassword";
import AdminFaculty from "./Components/Admin/Faculty/AdminFaculty";
import ArticleDetailPage from "./Components/ArticleDetailPage";
import AdminProfile from "./Components/Admin/Profile/Admin_Profile";
import CoordinatorArticles from "./Components/Coordinator/Articles/Coordinator_Articles";
import CoordinatorArticlesDetails from "./Components/Coordinator/Articles/Coordinator_Articles_Details";
import Coordinator_Profile from "./Components/Coordinator/Profile/Coordinator_Profile";
import Student_Profile from "./Components/Students/Profile/Student_Profile";
import StudentsView from "./Components/Students/View_Articles/Students_View";
import StudentArticleDetails from "./Components/Students/View_Articles/Student_Article_Details";
import StudentEditArticle from "./Components/Students/Edit/EditArticle";
import ManagerArticlesView from "./Components/Manager/Articles/Manager_Articles_View";
import Manager_Profile from "./Components/Manager/Profile/Manager_Profile";
import ManagerArticleDetails from "./Components/Manager/Articles/Manager_Article_Details";
import Error404 from "./Components/Error404";
import axios from "axios";


axios.defaults.baseURL = "https://comp1640-io6i.onrender.com";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <Header>
              <ProtectedRoute component={Home} allowedRoles={["Guest"]} />
            </Header>
          }
        />
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute component={Admin} allowedRoles={["Admin"]} />
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute component={Students} allowedRoles={["Student"]} />
          }
        />
        <Route
          path="/coordinator"
          element={
            <ProtectedRoute
              component={CoordinatorDashboard}
              allowedRoles={["Coordinator"]}
            />
          }
        />
        <Route
          path="/manager"
          element={
            <ProtectedRoute
              component={ManagerArticlesView}
              allowedRoles={["Manager"]}
            />
          }
        />
        <Route
          path="/articles/:id"
          element={
            <Header>
              <ArticleDetailPage />
            </Header>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/admin/faculty"
          element={
            <ProtectedRoute component={AdminFaculty} allowedRoles={["Admin"]} />
          }
        />
        <Route
          path="/setting/profile"
          element={
            <ProtectedRoute component={AdminProfile} allowedRoles={["Admin"]} />
          }
        />
        <Route
          path="/coordinator/setting/profile"
          element={
            <ProtectedRoute
              component={Coordinator_Profile}
              allowedRoles={["Coordinator"]}
            />
          }
        />
        <Route
          path="/student/setting/profile"
          element={
            <ProtectedRoute
              component={Student_Profile}
              allowedRoles={["Student"]}
            />
          }
        />
        <Route
          path="/manager/setting/profile"
          element={
            <ProtectedRoute
              component={Manager_Profile}
              allowedRoles={["Manager"]}
            />
          }
        />
        <Route
          path="/coordinator/articles"
          element={
            <ProtectedRoute
              component={CoordinatorArticles}
              allowedRoles={["Coordinator"]}
            />
          }
        />
        <Route
          path="/Coordinator/article/:id"
          element={
            <ProtectedRoute
              component={CoordinatorArticlesDetails}
              allowedRoles={["Coordinator"]}
            />
          }
        />
        <Route
          path="/Manager/article/:id"
          element={
            <ProtectedRoute
              component={ManagerArticleDetails}
              allowedRoles={["Manager"]}
            />
          }
        />
        <Route
          path="/student/view"
          element={
            <ProtectedRoute
              component={StudentsView}
              allowedRoles={["Student"]}
            />
          }
        />
        <Route
          path="/student/view/article/:id"
          element={
            <ProtectedRoute
              component={StudentArticleDetails}
              allowedRoles={["Student"]}
            />
          }
        />
        <Route
          path="/student/edit/article/:id"
          element={
            <ProtectedRoute
              component={StudentEditArticle}
              allowedRoles={["Student"]}
            />
          }
        />
        <Route
          path="*"
          element={<ProtectedRoute component={Error404} allowedRoles={[]} />}
        />
      </Routes>
    </Router>
  );
}
export default App;
