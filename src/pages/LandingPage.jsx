import React from 'react';
import '../static/style/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="bento-landing">
      <header className="bento-header">
        <div className="logo">Career Mentor</div>
        <nav className="header-nav">
          <a href="/login" className="contact-btn">Get Started</a>
        </nav>
      </header>

      <section className="bento-hero">
        <h1>AI-Powered Career Guidance</h1>
        <p>Find your ideal career path, get personalized roadmaps, and upskill smarter with real-time recommendations.</p>
        <div className="hero-buttons">
          <a className="btn primary" href="/register">Start Your Journey</a>
          <a className="btn secondary" href="/login">Continue Where You Left Off</a>
        </div>
      </section>

      <section className="bento-showcase">
        <div className="showcase-box">
          <h3>🔍 Intelligent Matching</h3>
          <p>Leverage advanced AI to match your skills and interests with top careers and roles.</p>
        </div>
        <div className="showcase-box">
          <h3>📚 Skill Development</h3>
          <p>Receive curated learning paths and free courses tailored to your goals.</p>
        </div>
        <div className="showcase-box">
          <h3>💼 Resume Builder</h3>
          <p>Craft compelling resumes with AI-powered suggestions and templates.</p>
        </div>
        <div className="showcase-box">
          <h3>🚀 Career Roadmaps</h3>
          <p>Get step-by-step roadmaps to your dream job with future trend insights.</p>
        </div>
      </section>

      <section className="bento-impact">
        <div className="impact-card">
          <h2>350%</h2>
          <p>Improvement in job matching accuracy with AI insights.</p>
        </div>
        <div className="impact-card green">
          <h2>95%</h2>
          <p>Boost in user confidence after using our AI tools.</p>
        </div>
        <div className="impact-card testimonial">
          <p>"I discovered the perfect career path and landed a job I love in just a month!"</p>
        </div>
      </section>

      <section className="bento-cta">
        <h2>Start shaping your future today</h2>
        <p>Let our AI guide you to the career you were meant for.</p>
        <a href="/register" className="btn primary">Join Free Now</a>
      </section>

      <footer className="bento-footer">
        <p>© 2025 Career Mentor</p>
        <div>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/support">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
