import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPassword: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.userName || !formData.userEmail || !formData.userPassword) {
      setMessage('Please fill in all fields');
      return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = existingUsers.find(user => user.userEmail === formData.userEmail);
    
    if (userExists) {
      setMessage('User with this email already exists');
      return;
    }

    // Add new user
    existingUsers.push(formData);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    setMessage('Account created successfully!');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div style={{ 
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '2rem'
    }}>
      <div style={{ 
        maxWidth: '400px', 
        width: '100%',
        padding: '2rem',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          Sign Up
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Username:
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="Enter your username"
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Email:
            </label>
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="Enter your email"
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Password:
            </label>
            <input
              type="password"
              name="userPassword"
              value={formData.userPassword}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit"
            style={{ 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              padding: '1rem 2rem', 
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            Sign Up
          </button>
        </form>
        
        {message && (
          <p style={{ 
            marginTop: '1rem', 
            textAlign: 'center',
            padding: '0.5rem',
            borderRadius: '4px',
            backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
            color: message.includes('success') ? '#155724' : '#721c24',
            border: `1px solid ${message.includes('success') ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message}
          </p>
        )}
        
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
