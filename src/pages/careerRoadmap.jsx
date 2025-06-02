import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../static/style/CareerRoadmap.css';

const CareerRoadmap = () => {
  const [careerGoal, setCareerGoal] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [, setUserId] = useState(null);
  const roadmapRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRoadmap('');

    try {
      const response = await axios.post('http://localhost:5001/roadmap', { careerGoal });
      setRoadmap(response.data.roadmap);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch roadmap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = async () => {
    const canvas = await html2canvas(roadmapRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, 'PNG', 10, 10, width - 20, height);
    pdf.save(`Career_Roadmap_${careerGoal}.pdf`);
  };

  return (
    <>
      <Navbar />
      <div className="career-roadmap-page">
        <div className="roadmap-header">
          <h1>🗺️ Career Path Navigator</h1>
          <p>Generate a personalized step-by-step guide to reach your dream career</p>
        </div>

        <div className="roadmap-container">
          <div className="roadmap-generator">
            <div className="generator-card">
              <h2>✨ Create Your Roadmap</h2>
              <form onSubmit={handleSubmit} className="roadmap-form">
                <div className="input-group">
                  <span className="input-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Enter your desired career (e.g. AI Engineer, UX Designer)"
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="generate-btn" disabled={loading}>
                  {loading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    <>
                      <span className="btn-icon">🚀</span>
                      Generate Roadmap
                    </>
                  )}
                </button>
              </form>
            </div>

            {roadmap && (
  <div className="generated-roadmap" ref={roadmapRef}>
    <div className="roadmap-header">
      <h2>🚀 Your <span className="highlight">{careerGoal}</span> Roadmap</h2>
      <p>Follow these steps to achieve your career goals</p>
    </div>
    
    <div className="roadmap-content">
      {roadmap.map((line, index) => {
        // Handle section headers
        if (line.startsWith('====================')) {
          return <div key={index} className="section-divider"></div>;
        }
        
        // Handle phase headers
        if (line.startsWith('🔹 PHASE')) {
          return (
            <div key={index} className="phase-header">
              <h3>{line.replace('🔹', '⭐')}</h3>
            </div>
          );
        }
        
        // Handle bullet points
        if (line.startsWith('•') || line.startsWith('-')) {
          return (
            <div key={index} className="roadmap-item">
              <span className="bullet-point">•</span>
              <span>{line.substring(1).trim()}</span>
            </div>
          );
        }
        
        // Handle regular text
        return (
          <div key={index} className="roadmap-text">
            <p>{line}</p>
          </div>
        );
      })}
    </div>
    
    <div className="roadmap-actions">
      <button className="action-btn primary" onClick={exportPDF}>
        <span className="btn-icon">📄</span>
        Export as PDF
      </button>
      
    </div>
  </div>
)}
        </div>

            {error && (
              <div className="error-card">
                <span className="error-icon">⚠️</span>
                <p>{error}</p>
              </div>
            )}
          </div>

          <div className="sample-roadmaps">
            <h2>📋 Example Roadmaps</h2>
            <p>Get inspired by these common career paths</p>
            
            <div className="roadmap-grid">
              {[
                {
                  title: "AI Engineer",
                  icon: "🤖",
                  steps: [
                    "Learn Python & Math for ML",
                    "Complete ML & Deep Learning Courses",
                    "Build Projects (Chatbot, Classifier)",
                    "Earn Certifications (Google, IBM)",
                    "Apply for Internships & Junior Roles"
                  ]
                },
                {
                  title: "Frontend Developer",
                  icon: "💻",
                  steps: [
                    "Learn HTML, CSS, JavaScript",
                    "Master React or Vue Framework",
                    "Build Portfolio Websites",
                    "Contribute to Open Source",
                    "Apply for Web Dev Roles"
                  ]
                },
                {
                  title: "Data Analyst",
                  icon: "📊",
                  steps: [
                    "Learn Excel, SQL, Python",
                    "Master Data Visualization Tools",
                    "Learn Statistics & Business Intelligence",
                    "Analyze Real Datasets",
                    "Apply for Analyst Positions"
                  ]
                },
                {
                  title: "Cybersecurity Specialist",
                  icon: "🛡️",
                  steps: [
                    "Understand Networking & Operating Systems",
                    "Learn Security Fundamentals (CIA Triad, Threats)",
                    "Get Certified (CompTIA Security+, CEH)",
                    "Practice with Labs & Simulations (TryHackMe, Hack The Box)",
                    "Apply for Security Analyst or SOC roles"
                  ]
                }
              ].map((roadmap, index) => (
                <div className="sample-card" key={index}>
                  <div className="card-header">
                    <span className="card-icon">{roadmap.icon}</span>
                    <h3>{roadmap.title}</h3>
                  </div>
                  <div className="card-body">
                    <ol className="roadmap-steps">
                      {roadmap.steps.map((step, i) => (
                        <li key={i}>
                          <span className="step-number">{i + 1}</span>
                          <span className="step-text">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
      </div>
    </>
  );
};

export default CareerRoadmap;