import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userEmail || !userPassword) {
      alert('Please fill in all fields');
      return;
    }

    // Check user credentials
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = existingUsers.find(
      user => user.userEmail === userEmail && user.userPassword === userPassword
    );
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert('Login successful!');
      navigate('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div 
      className="container py-5" 
      style={{ 
        minHeight: '80vh',
        backgroundColor: isDark ? '#0d1117' : 'transparent' 
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className={`card shadow-lg ${isDark ? 'bg-dark text-light border-secondary' : 'bg-white'}`}>
            <div className="card-header text-center py-4">
              <h1 
                className="display-5 fw-bold mb-0"
                style={{ color: isDark ? '#f0f6fc' : '#212529' }}
              >
                Welcome Back
              </h1>
              <p 
                className="mt-2 mb-0"
                style={{ color: isDark ? '#8b949e' : '#6c757d' }}
              >
                Sign in to your Mini Basket account
              </p>
            </div>
            
            <div className="card-body p-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label 
                    htmlFor="userEmail" 
                    className="form-label fw-bold"
                    style={{ color: isDark ? '#f0f6fc' : '#212529' }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control form-control-lg ${isDark ? 'bg-secondary text-light border-secondary' : ''}`}
                    id="userEmail"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label 
                    htmlFor="userPassword" 
                    className="form-label fw-bold"
                    style={{ color: isDark ? '#f0f6fc' : '#212529' }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control form-control-lg ${isDark ? 'bg-secondary text-light border-secondary' : ''}`}
                    id="userPassword"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 mb-3"
                >
                  Sign In
                </button>
              </form>
              
              <div className="text-center">
                <p 
                  className="mb-2"
                  style={{ color: isDark ? '#8b949e' : '#6c757d' }}
                >
                  Don't have an account?
                </p>
                <button 
                  onClick={() => navigate('/signup')}
                  className="btn btn-outline-secondary"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
