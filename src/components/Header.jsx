import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('currentUser');
  const userData = isLoggedIn ? JSON.parse(isLoggedIn) : null;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <nav style={{ 
      backgroundColor: '#333', 
      padding: '1rem', 
      marginBottom: '2rem' 
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div>
          <Link to="/" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/products" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>
            Products
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/cart" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>
                Cart
              </Link>
              <Link to="/orders" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>
                Orders
              </Link>
              <Link to="/dashboard" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>
                Dashboard
              </Link>
            </>
          )}
        </div>
        <div>
          {isLoggedIn ? (
            <div style={{ color: 'white' }}>
              <span style={{ marginRight: '1rem' }}>Welcome, {userData.userName}</span>
              <button 
                onClick={handleLogout}
                style={{ 
                  backgroundColor: '#ff4444', 
                  color: 'white', 
                  border: 'none', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
