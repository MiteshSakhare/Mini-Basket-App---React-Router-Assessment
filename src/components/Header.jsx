import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const isLoggedIn = localStorage.getItem('currentUser');
  const userData = isLoggedIn ? JSON.parse(isLoggedIn) : null;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} shadow-sm sticky-top`}>
      <div className="container">
        {/* Fixed Logo - Remove gradient text that causes strips */}
        <Link 
          className="navbar-brand fw-bold fs-2" 
          to="/"
          style={{ 
            color: isDark ? '#58a6ff' : '#0969da',
            textDecoration: 'none'
          }}
        >
          🛒 Mini Basket App
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/products">Products</Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-medium" to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-medium" to="/orders">Orders</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-medium" to="/dashboard">Dashboard</Link>
                </li>
              </>
            )}
          </ul>
          
          <div className="d-flex align-items-center gap-3">
            <button 
              onClick={toggleTheme}
              className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-dark'} btn-sm rounded-pill`}
              title="Toggle Dark Mode"
              style={{ minWidth: '45px' }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            
            {isLoggedIn ? (
              <div className="d-flex align-items-center gap-2">
                <span className={`${isDark ? 'text-light' : 'text-muted'} fw-medium`}>
                  Welcome, {userData.userName}
                </span>
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm rounded-pill"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-primary btn-sm rounded-pill">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm rounded-pill">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
