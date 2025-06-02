// pages/Dashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../static/style/Dashboard.css';

const Dashboard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <>
      <Navbar />
      <div className="bento-container">
        {/* Animated Hero Section */}
        <div className="bento-tile bento-hero">
          <div className="hero-content">
            <h2>
              <span className="hero-greeting">Hello,</span>
              Welcome to Your Career Dashboard
            </h2>
            <p className="hero-subtitle">Your personalized career growth companion</p>
            <div className="hero-stats">
              {[
                { number: '5', label: 'New Opportunities', icon: '🔍' },
                { number: '3', label: 'Recommended Skills', icon: '📚' },
                { number: '1', label: 'Upcoming Event', icon: '📅' }
              ].map((stat, index) => (
                <div className="stat-item" key={index}>
                  <span className="stat-icon">{stat.icon}</span>
                  <div>
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-pattern"></div>
        </div>

        {/* Dynamic Bento Grid */}
        <div className="bento-grid">
          {/* About Card with Expandable Feature */}
          <div className="bento-tile bento-about">
            <div className="tile-header">
              <div className="tile-icon-wrapper">
                <span className="tile-icon">🚀</span>
              </div>
              <h3>About Career Mentor</h3>
            </div>
            <p className="tile-content">
              Your trusted career navigator, guiding your professional journey with AI-powered insights.
            </p>
            <div className="expandable-content">
              <p>Backed by career experts and hiring managers to keep you ahead of industry trends.</p>
            </div>
          </div>

          {/* About the Platform Card */}
<div className="bento-tile bento-platform">
  <div className="tile-header">
    <div className="tile-icon-wrapper">
      <span className="tile-icon">💡</span>
    </div>
    <h3>How Career Mentor Works</h3>
  </div>
  <p className="tile-content">
    Career Mentor is an AI-driven platform that connects your profile with real-time career data, 
    industry trends, and skill recommendations to personalize your professional growth.
  </p>
  <ul className="platform-features">
    <li>⚙️ AI-based Career Mapping</li>
    <li>📊 Skill Gap Analysis</li>
    <li>🔔 Real-time Job & Internship Alerts</li>
    <li>📚 Free Courses & Certifications</li>
    <li>🤝 Community Mentorship</li>
  </ul>
</div>

          {/* Tips Card with Interactive List */}
          <div className="bento-tile bento-tips">
            <div className="tile-header">
              <div className="tile-icon-wrapper">
                <span className="tile-icon">✅</span>
              </div>
              <h3>Quick Tips</h3>
            </div>
            <ul className="interactive-list">
              {[
                "Complete your profile",
                "Update your skills",
                "Engage with community",
                "Bookmark favorites",
                "Join webinars"
              ].map((tip, index) => (
                <li key={index}>
                  <span className="list-check">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Career Action Cards */}
          {[
            { path: "/career-recommendation", icon: "📊", title: "Recommendations", color: "purple" },
            { path: "/career-roadmap", icon: "🗺️", title: "Roadmap", color: "peach" },
            { path: "/resume-builder", icon: "📝", title: "Resume", color: "pink" },
            { path: "/learning-skill", icon: "🎓", title: "Learning", color: "blue" },
            { path: "/job-internship", icon: "💼", title: "Jobs", color: "teal" },
            { path: "/community", icon: "🌐", title: "Network", color: "sky" }
          ].map((card, index) => (
            <Link 
              to={card.path} 
              className={`bento-tile bento-card card-${index + 1} ${hoveredCard === index ? 'hovered' : ''}`}
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-content">
                <div className="card-icon-wrapper">
                  <span className="card-icon">{card.icon}</span>
                </div>
                <h4>{card.title}</h4>
                <div className="card-hover-indicator">→</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Personal Progress Tracker */}
<div className="bento-tile bento-progress">
  <div className="tile-header">
    <div className="tile-icon-wrapper">
      <span className="tile-icon">📈</span>
    </div>
    <h3>Your Progress</h3>
  </div>
  <div className="progress-content">
    <div className="progress-circle">
      <svg viewBox="0 0 36 36" className="circular-chart">
        <path
          className="circle-bg"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="circle"
          strokeDasharray="70, 100" // 70% complete
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" className="percentage">70%</text>
      </svg>
    </div>
    <ul className="progress-steps">
      <li className="step completed">✔ Complete Profile</li>
      <li className="step completed">✔ Resume Uploaded</li>
      <li className="step">🔄 Skills Updated</li>
      <li className="step">🔲 Applied to Jobs</li>
      <li className="step">🔲 Attended Webinar</li>
    </ul>
  </div>
</div>


        {/* Activity Feed with Real-time Updates */}
        <div className="bento-tile bento-activity">
          <div className="tile-header">
            <h3>Recent Activity</h3>
            <div className="activity-filters">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Updates</button>
              <button className="filter-btn">Tasks</button>
            </div>
          </div>
          <div className="activity-feed">
            {[
              { icon: "📅", action: "Completed profile setup", time: "2h ago", status: "complete" },
              { icon: "🎯", action: "New career recommendations", time: "1d ago", status: "new" },
              { icon: "📢", action: "Webinar: Interview Tips", time: "Tomorrow", status: "upcoming" }
            ].map((activity, index) => (
              <div className={`activity-item ${activity.status}`} key={index}>
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-details">
                  <p>{activity.action}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
                <div className="activity-status"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;