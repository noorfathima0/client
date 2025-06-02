import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { saveUserToDB } from '../api/userApi';
import '../static/style/Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserToDB({
        uid: res.user.uid,
        email: res.user.email,
        name: fullName,
        phone,
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      await saveUserToDB({
        uid: res.user.uid,
        email: res.user.email,
        name: res.user.displayName,
        phone: 'N/A',
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <form onSubmit={handleEmailRegister} className="register-form">
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="text"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
          <button type="submit" className="register-btn">Register</button>
        </form>
        <div className="separator">
          <hr />
          <span>OR</span>
        </div>
        <button onClick={handleGoogleRegister} className="google-btn">
          Register with Google
        </button>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
