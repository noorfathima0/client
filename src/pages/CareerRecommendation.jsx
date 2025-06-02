import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase/config';
import '../static/style/CareerRecommendation.css';
import Navbar from '../components/Navbar';

const branches = ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Electronics'];
const workStyles = ['Remote', 'Onsite', 'Hybrid'];
const industriesByBranch = {
  'Computer Science': ['Software', 'IT Services', 'AI/ML', 'Cybersecurity'],
  'Electrical': ['Power', 'Electronics', 'Automation'],
  'Mechanical': ['Manufacturing', 'Automobile', 'Aerospace'],
  'Civil': ['Construction', 'Urban Planning', 'Infrastructure'],
  'Electronics': ['Semiconductor', 'Telecom', 'Consumer Electronics']
};

const technicalInterestsByBranch = {
  'Computer Science': ['Web Development', 'Data Science', 'AI/ML', 'Cloud Computing'],
  'Electrical': ['Power Systems', 'Circuit Design', 'Embedded Systems'],
  'Mechanical': ['Thermodynamics', 'CAD Design', 'Robotics'],
  'Civil': ['Structural Analysis', 'Surveying', 'Geotechnical Engineering'],
  'Electronics': ['Signal Processing', 'Microcontrollers', 'VLSI']
};

const softSkills = ['Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Time Management'];

const CareerRecommendation = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    branch: '',
    currentSemester: '',
    cgpa: '',
    technicalInterests: [],
    softSkills: [],
    extraSkills: '',
    preferredWorkStyle: '',
    preferredIndustry: '',
    postGraduationGoal: '',
    experience: '',
    extraCurricular: ''
  });

  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [activeSection, setActiveSection] = useState('basic');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
        setForm(prev => ({ ...prev, email: currentUser.email || '' }));
      } else {
        setError('User is not authenticated');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'technicalInterests' || name === 'softSkills') {
      let updatedArr = [...form[name]];
      if (e.target.checked) {
        updatedArr.push(value);
      } else {
        updatedArr = updatedArr.filter(item => item !== value);
      }
      setForm(prev => ({ ...prev, [name]: updatedArr }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendation('');

    const payload = {
      userId,
      name: form.name,
      email: form.email,
      branch: form.branch,
      current_semester: parseInt(form.currentSemester),
      cgpa: parseFloat(form.cgpa),
      technical_interests: form.technicalInterests,
      soft_skills: form.softSkills,
      extra_skills: form.extraSkills,
      preferred_work_style: form.preferredWorkStyle,
      preferred_industry: form.preferredIndustry,
      post_graduation_goal: form.postGraduationGoal,
      experience: form.experience,
      extra_curricular: form.extraCurricular,
    };

    try {
      const response = await axios.post('http://localhost:5001/recommend', payload);
      setRecommendation(response.data.recommendation || 'No recommendation received.');
    } catch (err) {
      console.error('Recommendation error:', err);
      setError('Could not fetch recommendations. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="career-recommendation-page">
        <div className="recommendation-header">
          <h1>🚀 Career Path Finder</h1>
          <p>Discover your ideal career based on your skills, interests, and goals</p>
        </div>

        <div className="recommendation-container">
          <div className="form-navigation">
            <button 
              className={`nav-btn ${activeSection === 'basic' ? 'active' : ''}`}
              onClick={() => setActiveSection('basic')}
            >
              <span className="nav-icon">📝</span>
              <span className="nav-text">Basic Info</span>
            </button>
            <button 
              className={`nav-btn ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveSection('skills')}
            >
              <span className="nav-icon">🛠️</span>
              <span className="nav-text">Skills</span>
            </button>
            <button 
              className={`nav-btn ${activeSection === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveSection('preferences')}
            >
              <span className="nav-icon">❤️</span>
              <span className="nav-text">Preferences</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="recommendation-form">
            {error && <div className="error-message">{error}</div>}

            {/* Basic Info Section */}
            <div className={`form-section ${activeSection === 'basic' ? 'active' : ''}`}>
              <div className="form-tile">
                <label>Full Name</label>
                <input 
                  name="name" 
                  placeholder="Enter your full name" 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-tile">
                <label>Email</label>
                <input 
                  name="email" 
                  type="email" 
                  value={form.email}
                  placeholder="Your email address" 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-tile">
                <label>Branch</label>
                <select name="branch" onChange={handleChange} required>
                  <option value="">Select your branch</option>
                  {branches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div className="form-row">
                <div className="form-tile">
                  <label>Current Semester</label>
                  <input 
                    name="currentSemester" 
                    type="number" 
                    min="1" 
                    max="12" 
                    placeholder="Semester" 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="form-tile">
                  <label>CGPA</label>
                  <input 
                    name="cgpa" 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    max="10" 
                    placeholder="Your CGPA" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className={`form-section ${activeSection === 'skills' ? 'active' : ''}`}>
              <div className="form-tile checkbox-group">
                <label>Technical Interests</label>
                <div className="checkbox-grid">
                  {(technicalInterestsByBranch[form.branch] || []).map(interest => (
                    <label key={interest} className="checkbox-item">
                      <input
                        type="checkbox"
                        name="technicalInterests"
                        value={interest}
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                      {interest}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-tile checkbox-group">
                <label>Soft Skills</label>
                <div className="checkbox-grid">
                  {softSkills.map(skill => (
                    <label key={skill} className="checkbox-item">
                      <input
                        type="checkbox"
                        name="softSkills"
                        value={skill}
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-tile">
                <label>Other Skills</label>
                <input 
                  name="extraSkills" 
                  placeholder="Any other skills (comma separated)" 
                  onChange={handleChange} 
                />
              </div>
            </div>

            {/* Preferences Section */}
            <div className={`form-section ${activeSection === 'preferences' ? 'active' : ''}`}>
              <div className="form-tile">
                <label>Preferred Work Style</label>
                <select name="preferredWorkStyle" onChange={handleChange} required>
                  <option value="">Select work style</option>
                  {workStyles.map(ws => <option key={ws} value={ws}>{ws}</option>)}
                </select>
              </div>

              <div className="form-tile">
                <label>Preferred Industry</label>
                <select name="preferredIndustry" onChange={handleChange} required>
                  <option value="">Select industry</option>
                  {(industriesByBranch[form.branch] || []).map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div className="form-tile">
                <label>Post Graduation Goal</label>
                <input 
                  name="postGraduationGoal" 
                  placeholder="Your career aspirations" 
                  onChange={handleChange} 
                />
              </div>

              <div className="form-row">
                <div className="form-tile">
                  <label>Experience (if any)</label>
                  <input 
                    name="experience" 
                    placeholder="Internships/projects" 
                    onChange={handleChange} 
                  />
                </div>

                <div className="form-tile">
                  <label>Extra Curricular</label>
                  <input 
                    name="extraCurricular" 
                    placeholder="Activities outside academics" 
                    onChange={handleChange} 
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              {activeSection !== 'basic' && (
                <button 
                  type="button" 
                  className="secondary-btn"
                  onClick={() => setActiveSection(activeSection === 'skills' ? 'basic' : 'skills')}
                >
                  ← Back
                </button>
              )}
              
              {activeSection !== 'preferences' ? (
                <button 
                  type="button" 
                  className="primary-btn"
                  onClick={() => setActiveSection(activeSection === 'basic' ? 'skills' : 'preferences')}
                >
                  Continue →
                </button>
              ) : (
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    'Get Recommendations'
                  )}
                </button>
              )}
            </div>
          </form>

          {recommendation && (
            <div className="recommendation-results">
              <div className="results-header">
                <h3>✨ Your Career Recommendations</h3>
                <p>Based on your profile and preferences</p>
              </div>
              <div className="results-content">
                <div className="result-card">
                  <div className="card-icon">💡</div>
                  <div className="card-content">
                    <p>{recommendation}</p>
                  </div>
                </div>
                <button className="action-btn">
                  Save Recommendations
                </button>
                <button className="action-btn secondary">
                  Explore Career Paths
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CareerRecommendation;