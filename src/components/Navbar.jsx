import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import '../static/style/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (err) {
      console.error('Logout Error:', err);
    }
  };

  const toggleMobileNav = () => {
    setMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <span className="brand-icon">🚀 Career Mentor</span>
        </Link>

        <div className="navbar-icon-links">
          <Link to="/dashboard" className="nav-icon-link" title="Dashboard">
            <span className="nav-icon">📊</span>
            <span className="nav-tooltip">Dashboard</span>
          </Link>
          <Link to="/career-recommendation" className="nav-icon-link" title="Career">
            <span className="nav-icon">🎯</span>
            <span className="nav-tooltip">Career</span>
          </Link>
          <Link to="/career-roadmap" className="nav-icon-link" title="Roadmap">
            <span className="nav-icon">🗺️</span>
            <span className="nav-tooltip">Roadmap</span>
          </Link>
          <Link to="/resume-builder" className="nav-icon-link" title="Resume">
            <span className="nav-icon">📝</span>
            <span className="nav-tooltip">Resume</span>
          </Link>
          <Link to="/learning-skill" className="nav-icon-link" title="Learning">
            <span className="nav-icon">🎓</span>
            <span className="nav-tooltip">Learning</span>
          </Link>
          <Link to="/job-internship" className="nav-icon-link" title="Jobs">
            <span className="nav-icon">💼</span>
            <span className="nav-tooltip">Jobs</span>
          </Link>
          <Link to="/community" className="nav-icon-link" title="Community">
            <span className="nav-icon">🌐</span>
            <span className="nav-tooltip">Community</span>
          </Link>
        </div>

        <button onClick={handleLogout} className="logout-icon-btn" title="Logout">
          <span className="logout-icon">⎋</span>
          <span className="nav-tooltip">Logout</span>
        </button>

        <div 
          className={`mobile-menu-icon ${isMobileNavOpen ? 'open' : ''}`} 
          onClick={toggleMobileNav}
        >
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-nav ${isMobileNavOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          {[
            { path: "/dashboard", icon: "📊", name: "Dashboard" },
            { path: "/career-recommendation", icon: "🎯", name: "Career" },
            { path: "/career-roadmap", icon: "🗺️", name: "Roadmap" },
            { path: "/resume-builder", icon: "📝", name: "Resume" },
            { path: "/learning-skill", icon: "🎓", name: "Learning" },
            { path: "/job-internship", icon: "💼", name: "Jobs" },
            { path: "/community", icon: "🌐", name: "Community" }
          ].map((link, index) => (
            <Link 
              key={index}
              to={link.path} 
              className="mobile-nav-link" 
              onClick={toggleMobileNav}
            >
              <span className="mobile-nav-icon">{link.icon}</span>
            </Link>
          ))}
          
          <button onClick={handleLogout} className="mobile-logout-btn">
            <span className="mobile-logout-icon">⎋</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;