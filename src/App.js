import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CareerRecommendation from './pages/CareerRecommendation';
import ResumeBuilder from './pages/ResumeBuilder';
import LearningSkill from './pages/LearningAndSkillDevelopment';
import JobInternship from './pages/JobInternship';
import Community from './pages/Community';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import CareerRoadmap from './pages/careerRoadmap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />  {/* This will be the homepage */}

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/career-recommendation"
          element={
            <ProtectedRoute>
              <CareerRecommendation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume-builder"
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-skill"
          element={
            <ProtectedRoute>
              <LearningSkill />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-internship"
          element={
            <ProtectedRoute>
              <JobInternship />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />
        <Route
          path="/career-roadmap"
          element={
            <ProtectedRoute>
              <CareerRoadmap />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
