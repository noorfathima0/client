import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../static/style/learning.css';

const LearningAndDevelopment = () => {
  const [resources, setResources] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        // COURSES
        { platform: 'Coursera', title: 'Machine Learning', url: 'https://www.coursera.org/learn/machine-learning', category: 'course', icon: '📚' },
        { platform: 'edX', title: 'Harvard CS50', url: 'https://cs50.harvard.edu/x/', category: 'course', icon: '💻' },
        { platform: 'FutureLearn', title: 'Data Analytics', url: 'https://www.futurelearn.com/courses/data-analytics', category: 'course', icon: '📊' },
        { platform: 'W3Schools', title: 'Full Stack Web Dev', url: 'https://www.w3schools.com/', category: 'course', icon: '🌐' },
        { platform: 'Kaggle', title: 'Python for Data Science', url: 'https://www.kaggle.com/learn/python', category: 'course', icon: '🐍' },
        { platform: 'Microsoft Learn', title: 'Azure Fundamentals', url: 'https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/', category: 'course', icon: '☁️' },

        // CERTIFICATES
        { platform: 'freeCodeCamp', title: 'Responsive Web Design', url: 'https://www.freecodecamp.org/learn/responsive-web-design/', category: 'certificate', icon: '🏆' },
        { platform: 'IBM via Coursera', title: 'AI Fundamentals', url: 'https://www.coursera.org/professional-certificates/ibm-ai-engineer', category: 'certificate', icon: '🧠' },
        { platform: 'Google Cloud', title: 'Cloud Digital Leader', url: 'https://www.cloudskillsboost.google/', category: 'certificate', icon: '🔐' },

        // INDUSTRY TRENDS
        { platform: 'McKinsey', title: 'Top Skills 2030', url: 'https://www.mckinsey.com/featured-insights/future-of-work', category: 'trend', icon: '📈' },
        { platform: 'Gartner', title: 'Tech Trends 2025', url: 'https://www.gartner.com/en/articles/what-are-the-top-strategic-technology-trends-for-2025', category: 'trend', icon: '🚀' },
        { platform: 'WEF', title: 'Future of Jobs Report', url: 'https://www.weforum.org/reports/the-future-of-jobs-report-2020', category: 'trend', icon: '🌍' },

        // SALARY DATA
        { platform: 'Glassdoor', title: 'Frontend Developer Salary', url: 'https://www.glassdoor.com/Salaries/frontend-developer-salary-SRCH_KO0,19.htm', category: 'salary', icon: '💰' },
        { platform: 'LinkedIn', title: 'Software Engineer Salaries', url: 'https://www.linkedin.com/salary/software-engineer-salaries-in-india', category: 'salary', icon: '💵' },
        { platform: 'Payscale', title: 'DevOps Salary Insights', url: 'https://www.payscale.com/research/IN/Job=DevOps_Engineer/Salary', category: 'salary', icon: '📊' },
      ];
      setResources(data);
    };
    fetchData();
  }, []);

  const filteredResources = activeTab === 'all' 
    ? resources 
    : resources.filter(r => r.category === activeTab);

  return (
    <>
    <Navbar />
    <div className="learning-container">
      
      <div className="learning-content">
        <header className="learning-header">
          <h1>📚 Learning & Skill Development</h1>
          <p>Discover resources to boost your career growth and stay ahead of industry trends</p>
        </header>

        <div className="category-tabs">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            🌟 All Resources
          </button>
          <button 
            className={`tab-btn ${activeTab === 'course' ? 'active' : ''}`}
            onClick={() => setActiveTab('course')}
          >
            📖 Courses
          </button>
          <button 
            className={`tab-btn ${activeTab === 'certificate' ? 'active' : ''}`}
            onClick={() => setActiveTab('certificate')}
          >
            🏅 Certifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'trend' ? 'active' : ''}`}
            onClick={() => setActiveTab('trend')}
          >
            📈 Trends
          </button>
          <button 
            className={`tab-btn ${activeTab === 'salary' ? 'active' : ''}`}
            onClick={() => setActiveTab('salary')}
          >
            💰 Salaries
          </button>
        </div>

        <div className="resources-grid">
          {filteredResources.map((resource, index) => (
            <div className="resource-card" key={index}>
              <div className="card-icon">{resource.icon}</div>
              <div className="card-content">
                <h3>{resource.title}</h3>
                <p className="platform">{resource.platform}</p>
                <div className="card-footer">
                  <span className={`category ${resource.category}`}>
                    {resource.category === 'course' && 'Course'}
                    {resource.category === 'certificate' && 'Certification'}
                    {resource.category === 'trend' && 'Industry Trend'}
                    {resource.category === 'salary' && 'Salary Data'}
                  </span>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    Explore →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default LearningAndDevelopment;