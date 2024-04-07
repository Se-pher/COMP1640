import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Admin from "./Components/Admin/Account/AdminAccount";
import Students from "./Components/Students/Upload/Students_Upload";
import CoordinatorDashboard from "./Components/Coordinator/Dashboard/Coordinator_Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Components/LandingPage";
import Register from "./Components/Register";
import Header from "./Components/Header";
import ForgotPassword from "./Components/ForgotPassword";
import AdminFaculty from "./Components/Admin/Faculty/AdminFaculty";
import ArticleDetailPage from "./Components/ArticleDetailPage";
import Profile from "./Components/Admin/Profile/Admin_Profile";
import CoordinatorArticles from "./Components/Coordinator/Articles/Coordinator_Articles";
import CoordinatorArticlesDetails from "./Components/Coordinator/Articles/Coordinator_Articles_Details";
import StudentsView from "./Components/Students/View_Articles/Students_View";
import StudentArticleDetails from "./Components/Students/View_Articles/Student_Article_Details";
import ManagerArticlesView from "./Components/Manager/Articles/Manager_Articles_View";
import Error404 from "./Components/Error404";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Header>
              <Home />
            </Header>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute component={Admin} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute component={Students} allowedRoles={["student"]} />
          }
        />
        <Route
          path="/coordinator"
          element={
            <ProtectedRoute
              component={CoordinatorDashboard}
              allowedRoles={["coordinator"]}
            />
          }
        />
        <Route
          path="/manager"
          element={
            <ProtectedRoute
              component={ManagerArticlesView}
              allowedRoles={["manager"]}
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
            <ProtectedRoute component={AdminFaculty} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/setting/profile"
          element={
            <ProtectedRoute
              component={Profile}
              allowedRoles={["admin", "student", "coordinator", "manager"]}
            />
          }
        />
        <Route
          path="/coordinator/articles"
          element={
            <ProtectedRoute
              component={CoordinatorArticles}
              allowedRoles={["coordinator"]}
            />
          }
        />
        <Route
          path="/coordinator/articles/:id"
          element={
            <ProtectedRoute
              component={CoordinatorArticlesDetails}
              allowedRoles={["coordinator"]}
            />
          }
        />
        <Route
          path="/student/view"
          element={
            <ProtectedRoute
              component={StudentsView}
              allowedRoles={["student"]}
            />
          }
        />
        <Route
          path="/student/view/article/:id"
          element={
            <ProtectedRoute
              component={StudentArticleDetails}
              allowedRoles={["student"]}
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
