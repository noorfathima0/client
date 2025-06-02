import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/config';
import { saveUserToDB } from '../api/userApi';
import '../static/style/Login.css'; // Importing the CSS for styling

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);

      auth.onAuthStateChanged(async (user) => {
        if (user) {
          await saveUserToDB({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            phone: 'N/A',
          });
          navigate('/dashboard');
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="separator">
          <hr />
          <span>OR</span>
        </div>
        <button onClick={handleGoogleLogin} className="google-btn">
          Login with Google
        </button>
        <p className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
