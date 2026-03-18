// src/components/Signup.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('app-users')) || [];
    const userExists = existingUsers.find((user) => user.email === email);
    
    if (userExists) {
      alert("An account with this email already exists!");
      return;
    }

    const newUser = { email, password };
    localStorage.setItem('app-users', JSON.stringify([...existingUsers, newUser]));

    localStorage.setItem('is-logged-in', 'true');
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Create an Account</h2>
      <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '20px' }}>
        Start tracking your workouts today.
      </p>

      <form onSubmit={handleSignup} className="workout-form">
        <input 
          type="email" 
          placeholder="Email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Create a password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={{ backgroundColor: '#10b981' }}>
          Sign Up
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Already have an account? <Link to="/login" style={{ color: '#3b82f6' }}>Log In here</Link>
      </p>
    </div>
  );
}