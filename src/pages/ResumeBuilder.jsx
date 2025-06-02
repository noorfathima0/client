import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase/config';
import Navbar from '../components/Navbar';
import '../static/style/ResumeBuilder.css';

export default function ResumeBuilder() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    location: "",
    objective: "",
    targetRole: "",
    yearsExperience: "",
    keySkills: "",
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    jobLocation: "",
    responsibilities: "",
    achievements: "",
    toolsUsed: "",
    degree: "",
    institution: "",
    graduationYear: "",
    honors: "",
    relevantCourses: "",
    technicalSkills: "",
    softSkills: "",
    industrySkills: "",
    certificationName: "",
    certOrg: "",
    certYear: "",
    certValidity: "",
    projectName: "",
    projectRole: "",
    projectDuration: "",
    projectDescription: "",
    projectLink: "",
    languageName: "",
    languageProficiency: "",
    volunteerOrg: "",
    volunteerRole: "",
    volunteerDuration: "",
    volunteerContributions: "",
  });
  const [aiSummary, setAiSummary] = useState("");
  const [aiBulletPoints, setAiBulletPoints] = useState([]);
  const [aiKeywords, setAiKeywords] = useState([]);
  const [aiSuggestedSkills, setAiSuggestedSkills] = useState([]);

  const [, setUserId] = useState(null);
  const [, setError] = useState(null);

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          setUserId(currentUser.uid);
        } else {
          setError('User is not authenticated');
        }
      });
  
      return () => unsubscribe();
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleAISummary = async () => {
    try {
      const res = await axios.post("http://localhost:5001/generate_summary", {
        experience: `${formData.yearsExperience} years of experience as ${formData.targetRole} with skills in ${formData.keySkills}`,
      });
      setAiSummary(res.data.summary);
    } catch (err) {
      console.error("Summary Error:", err);
    }
  };

  const handleAIBulletPoints = async () => {
    try {
      const res = await axios.post("http://localhost:5001/generate_bullet_points", {
        duties: formData.responsibilities,
      });
      setAiBulletPoints(res.data.bullet_points);
    } catch (err) {
      console.error("Bullet Points Error:", err);
    }
  };

  const handleAIKeywords = async () => {
    try {
      const res = await axios.post("http://localhost:5001/keyword_suggestions", {
        job_description: formData.responsibilities,
      });
      setAiKeywords(res.data.keywords);
    } catch (err) {
      console.error("Keywords Error:", err);
    }
  };

  const handleAISkillSuggestion = async () => {
    try {
      const res = await axios.post("http://localhost:5001/suggest_skills", {
        role: formData.targetRole,
      });
      setAiSuggestedSkills(res.data.skills);
    } catch (err) {
      console.error("Skill Suggestion Error:", err);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="resume-section">
            <div className="section-header">
              <span className="section-icon">👤</span>
              <h2>Personal Information</h2>
            </div>
            <div className="form-grid">
              <div className="form-tile">
                <label>Full Name</label>
                <input name="fullName" placeholder="John Doe" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Professional Title</label>
                <input name="title" placeholder="Software Engineer" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Email</label>
                <input name="email" placeholder="john@example.com" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Phone Number</label>
                <input name="phone" placeholder="(123) 456-7890" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>LinkedIn/Portfolio URL</label>
                <input name="linkedin" placeholder="linkedin.com/in/johndoe" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>GitHub URL</label>
                <input name="github" placeholder="github.com/johndoe" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Location</label>
                <input name="location" placeholder="San Francisco, CA" onChange={handleChange} />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="resume-section">
            <div className="section-header">
              <span className="section-icon">📝</span>
              <h2>Career Summary</h2>
            </div>
            <div className="form-grid">
              <div className="form-tile wide">
                <label>Professional Summary</label>
                <textarea name="objective" placeholder="Experienced professional with..." onChange={handleChange} />
                <button className="ai-button" onClick={handleAISummary}>
                  <span className="ai-icon">✨</span> Generate with AI
                </button>
                {aiSummary && (
                  <div className="ai-output">
                    <label>AI Suggestion:</label>
                    <p>{aiSummary}</p>
                  </div>
                )}
              </div>
              <div className="form-tile">
                <label>Target Job Role</label>
                <input name="targetRole" placeholder="Senior Developer" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Years of Experience</label>
                <input name="yearsExperience" placeholder="5" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Key Skills</label>
                <input name="keySkills" placeholder="React, Node.js, Python" onChange={handleChange} />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="resume-section">
            <div className="section-header">
              <span className="section-icon">💼</span>
              <h2>Work Experience</h2>
            </div>
            <div className="form-grid">
              <div className="form-tile">
                <label>Job Title</label>
                <input name="jobTitle" placeholder="Software Engineer" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Company Name</label>
                <input name="companyName" placeholder="Tech Corp Inc." onChange={handleChange} />
              </div>
              <div className="form-row">
                <div className="form-tile">
                  <label>Start Date</label>
                  <input name="startDate" placeholder="MM/YYYY" onChange={handleChange} />
                </div>
                <div className="form-tile">
                  <label>End Date</label>
                  <input name="endDate" placeholder="MM/YYYY or Present" onChange={handleChange} />
                </div>
              </div>
              <div className="form-tile">
                <label>Job Location</label>
                <input name="jobLocation" placeholder="Remote" onChange={handleChange} />
              </div>
              <div className="form-tile wide">
                <label>Key Responsibilities</label>
                <textarea name="responsibilities" placeholder="Developed features..." onChange={handleChange} />
                <div className="ai-action-group">
                  <button className="ai-button" onClick={handleAIBulletPoints}>
                    <span className="ai-icon">✨</span> Generate Bullet Points
                  </button>
                  <button className="ai-button" onClick={handleAIKeywords}>
                    <span className="ai-icon">🔍</span> Suggest Keywords
                  </button>
                </div>
                {aiBulletPoints.length > 0 && (
                  <div className="ai-output">
                    <label>Bullet Points:</label>
                    <ul>{aiBulletPoints.map((bp, i) => <li key={i}>{bp}</li>)}</ul>
                  </div>
                )}
                {aiKeywords.length > 0 && (
                  <div className="ai-output">
                    <label>Suggested Keywords:</label>
                    <p>{aiKeywords.join(", ")}</p>
                  </div>
                )}
              </div>
              <div className="form-tile wide">
                <label>Achievements</label>
                <textarea name="achievements" placeholder="Increased performance by..." onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Tools/Technologies Used</label>
                <input name="toolsUsed" placeholder="React, Node.js, AWS" onChange={handleChange} />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="resume-section">
            <div className="section-header">
              <span className="section-icon">🎓</span>
              <h2>Education</h2>
            </div>
            <div className="form-grid">
              <div className="form-tile">
                <label>Degree/Certification</label>
                <input name="degree" placeholder="B.S. Computer Science" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>University/Institution</label>
                <input name="institution" placeholder="State University" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Graduation Year</label>
                <input name="graduationYear" placeholder="2020" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Honors/Awards (optional)</label>
                <input name="honors" placeholder="Summa Cum Laude" onChange={handleChange} />
              </div>
              <div className="form-tile wide">
                <label>Relevant Courses/Thesis (optional)</label>
                <input name="relevantCourses" placeholder="Data Structures, Algorithms" onChange={handleChange} />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="resume-section">
            <div className="section-header">
              <span className="section-icon">🛠️</span>
              <h2>Skills</h2>
            </div>
            <div className="form-grid">
              <div className="form-tile">
                <label>Technical Skills</label>
                <input name="technicalSkills" placeholder="JavaScript, Python" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Soft Skills</label>
                <input name="softSkills" placeholder="Leadership, Communication" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Industry-Specific Skills</label>
                <input name="industrySkills" placeholder="Agile, CI/CD" onChange={handleChange} />
                <button className="ai-button" onClick={handleAISkillSuggestion}>
                  <span className="ai-icon">✨</span> Suggest Skills
                </button>
                {aiSuggestedSkills.length > 0 && (
                  <div className="ai-output">
                    <label>Suggested Skills:</label>
                    <p>{aiSuggestedSkills.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="resume-section">
            <div className="section-header">
              <span className="section-icon">🏆</span>
              <h2>Certifications</h2>
            </div>
            <div className="form-grid">
              <div className="form-tile">
                <label>Certification Name</label>
                <input name="certificationName" placeholder="AWS Certified Developer" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Issuing Organization</label>
                <input name="certOrg" placeholder="Amazon Web Services" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Year Obtained</label>
                <input name="certYear" placeholder="2022" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Validity Period</label>
                <input name="certValidity" placeholder="2022-2025" onChange={handleChange} />
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="resume-section">
            <div className="section-header">
              <span className="section-icon">📂</span>
              <h2>Projects</h2>
            </div>
            <div className="form-grid">
              <div className="form-tile">
                <label>Project Name</label>
                <input name="projectName" placeholder="E-commerce Platform" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Your Role</label>
                <input name="projectRole" placeholder="Full-stack Developer" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Duration</label>
                <input name="projectDuration" placeholder="3 months" onChange={handleChange} />
              </div>
              <div className="form-tile wide">
                <label>Description</label>
                <textarea name="projectDescription" placeholder="Developed a platform with..." onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Project Link (optional)</label>
                <input name="projectLink" placeholder="github.com/project" onChange={handleChange} />
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="resume-section">
            <div className="section-header">
              <span className="section-icon">🌐</span>
              <h2>Languages</h2>
            </div>
            <div className="form-grid">
              <div className="form-tile">
                <label>Language</label>
                <input name="languageName" placeholder="Spanish" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Proficiency</label>
                <input name="languageProficiency" placeholder="Fluent" onChange={handleChange} />
              </div>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="resume-section">
            <div className="section-header">
              <span className="section-icon">🤝</span>
              <h2>Volunteer Experience</h2>
            </div>
            <div className="form-grid">
              <div className="form-tile">
                <label>Organization Name</label>
                <input name="volunteerOrg" placeholder="Local Food Bank" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Role</label>
                <input name="volunteerRole" placeholder="Volunteer Coordinator" onChange={handleChange} />
              </div>
              <div className="form-tile">
                <label>Duration</label>
                <input name="volunteerDuration" placeholder="2020-Present" onChange={handleChange} />
              </div>
              <div className="form-tile wide">
                <label>Contributions</label>
                <textarea name="volunteerContributions" placeholder="Organized food drives..." onChange={handleChange} />
              </div>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="resume-section">
            <div className="section-header">
              <span className="section-icon">🎉</span>
              <h2>Resume Complete!</h2>
            </div>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            {/* <div className="completion-message">
              <p>Your resume information has been successfully collected.</p>
              <div className="action-buttons">
                <button className="primary-btn">
                  <span className="btn-icon">📄</span> Generate Resume
                </button>
                <button className="secondary-btn">
                  <span className="btn-icon">📤</span> Export as PDF
                </button>
                <button className="secondary-btn">
                  <span className="btn-icon">✏️</span> Edit Sections
                </button>
              </div>
            </div> */}
          </div>
        );
      default:
        return <div>Unknown step.</div>;
    }
  };

    return (
    <div className="resume-app-container">
      <Navbar />
      <div className="resume-builder">
        <div className="progress-tracker">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((stepNum) => (
            <div 
              key={stepNum} 
              className={`progress-step ${step === stepNum ? 'active' : ''} ${step > stepNum ? 'completed' : ''}`}
              onClick={() => setStep(stepNum)}
            >
              {stepNum}
            </div>
          ))}
        </div>
        
        <div className="resume-content">
          {renderStep()}
        </div>
        
        <div className="navigation-buttons">
          {step > 1 && (
            <button className="nav-btn prev-btn" onClick={prevStep}>
              <span className="btn-icon">←</span> Back
            </button>
          )}
          {step < 10 && (
            <button className="nav-btn next-btn" onClick={nextStep}>
              Next <span className="btn-icon">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}