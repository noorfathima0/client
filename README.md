# 🎯 AI-Based Career Mentor Guidance System

Welcome to the **AI-Based Career Mentor Guidance System** — an intelligent career guidance platform designed to help students and job seekers make informed, personalized career decisions using data-driven AI recommendations, skill development resources, and real-time opportunities.

---

## 🚀 Project Overview

This web-based application leverages machine learning, real-time data integration, and user-driven customization to recommend the best-fit career paths, skill-building resources, and relevant job or internship opportunities.

Whether you're a student planning your career or a professional seeking advancement, this platform provides a complete ecosystem to guide you through the journey.

---

## 💡 Core Features

- 🔍 **AI-Powered Career Recommendations**  
  Get tailored career suggestions based on your skills, interests, goals, and background.

- 🎓 **Learning & Skill Development**  
  Personalized course and certification suggestions sourced from global free learning platforms.

- 🧑‍💼 **Real-Time Job & Internship Feed**  
  Integrated job/internship listings filtered by user preferences and career matches.

- 🧾 **Smart Resume Builder**  
  Create, preview, download, and store resumes with AI-enhanced content suggestions.

- 🧠 **AI Career Roadmaps**  
  Automatically generated learning and experience roadmaps for recommended career paths.

- 🧑‍🤝‍🧑 **Community & Networking (Coming Soon)**  
  Connect with peers, mentors, and industry professionals.

- 🔐 **Secure Authentication**  
  Google login and email/password support via Firebase.

- 🛠️ **Admin Panel**  
  Full access for platform management, including user, course, and content moderation.

---

## 🧰 Tech Stack

**Frontend:**  
- React.js  
- TailwindCSS  
- React Hook Form + Zod  
- Firebase Auth  

**Backend:**  
- Node.js + Express  
- MongoDB + Mongoose  
- Flask (for AI model microservices)  
- Gemini API (Google AI) for roadmap generation  

**AI Models:**  
- Scikit-learn + Pandas (Career prediction)  
- Custom encoders for input preprocessing  

---

## 🗂 Project Structure

career-guide-app/
├── client/ # React Frontend
├── server/ # Node.js API
├── ai-models/ # Python ML & Flask Services
├── docs/ # Documentation
└── README.md


---

## ⚙️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ai-career-mentor.git
   cd ai-career-mentor
   ```
2. **Frontend Setup**

```bash
cd client
npm install
npm start
```

3. **Backend Setup**

```bash
cd ../server
node index.js
```

4. **AI Model (Flask Service)**

```bash
cd ../ai-models
pip install -r requirements.txt
python app.py
```

5. **Environment Setup**

create a .env file in client folder and add your firebase Config 

---
