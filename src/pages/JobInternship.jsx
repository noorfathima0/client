import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../static/style/JobsAndInternships.css';

const JobsAndInternships = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const mockData = [
      // JOBS
      { type: 'Job', title: 'Frontend Developer', company: 'Google', location: 'Bangalore, India', url: 'https://careers.google.com/jobs/results/' },
      { type: 'Job', title: 'Data Scientist', company: 'Amazon', location: 'Hyderabad, India', url: 'https://www.amazon.jobs/' },
      { type: 'Job', title: 'Backend Engineer', company: 'Zomato', location: 'Gurgaon, India', url: 'https://careers.zomato.com/' },
      { type: 'Job', title: 'Full Stack Developer', company: 'Microsoft', location: 'Noida, India', url: 'https://careers.microsoft.com/' },
      { type: 'Job', title: 'Cloud Engineer', company: 'IBM', location: 'Pune, India', url: 'https://www.ibm.com/employment/' },
      { type: 'Job', title: 'DevOps Engineer', company: 'TCS', location: 'Chennai, India', url: 'https://www.tcs.com/careers' },
      { type: 'Job', title: 'AI Researcher', company: 'OpenAI', location: 'Remote', url: 'https://openai.com/careers' },
      { type: 'Job', title: 'Product Manager', company: 'Flipkart', location: 'Bangalore, India', url: 'https://www.flipkartcareers.com/' },
      { type: 'Job', title: 'Software Engineer', company: 'Infosys', location: 'Multiple Locations, India', url: 'https://www.infosys.com/careers/' },

      // INTERNSHIPS
      { type: 'Internship', title: 'Web Development Intern', company: 'Internshala', location: 'Remote', url: 'https://internshala.com/internships/web-development-internship' },
      { type: 'Internship', title: 'AI/ML Intern', company: 'Turing', location: 'Remote', url: 'https://www.turing.com/jobs/' },
      { type: 'Internship', title: 'UI/UX Intern', company: 'CureFit', location: 'Bangalore', url: 'https://www.cure.fit/careers' },
      { type: 'Internship', title: 'Software Intern', company: 'Google STEP', location: 'India', url: 'https://buildyourfuture.withgoogle.com/' },
      { type: 'Internship', title: 'Marketing Intern', company: 'Unacademy', location: 'Remote', url: 'https://unacademy.com/jobs' },
      { type: 'Internship', title: 'Business Analyst Intern', company: 'EY', location: 'Mumbai', url: 'https://www.ey.com/en_in/careers' },
      { type: 'Internship', title: 'Data Science Intern', company: 'Great Learning', location: 'Remote', url: 'https://www.mygreatlearning.com/' },
      { type: 'Internship', title: 'Cybersecurity Intern', company: 'Cisco', location: 'Bangalore', url: 'https://jobs.cisco.com/' },
    ];
    setListings(mockData);
  }, []);

  const renderSection = (title, type) => (
    <>
      <h2>{title}</h2>
      <div className="job-grid">
        {listings.filter((item) => item.type === type).map((item, index) => (
          <div key={index} className="job-card">
            <h3>{item.title}</h3>
            <p><strong>Company:</strong> {item.company}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <a href={item.url} target="_blank" rel="noreferrer">Apply Now</a>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <Navbar />
    <div className="jobs-page">
      
      <div className="jobs-container">
        <h1>💼 Jobs & Internships</h1>
        {renderSection('🧑‍💻 Jobs', 'Job')}
        {renderSection('🎓 Internships', 'Internship')}
      </div>
    </div>
    </>
  );
};

export default JobsAndInternships;
// Compare this snippet from client/src/pages/JobInternship.jsx: