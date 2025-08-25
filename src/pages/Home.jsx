import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Home() {
  const currentUser = localStorage.getItem('currentUser');
  const userData = currentUser ? JSON.parse(currentUser) : null;
  const { isDark } = useTheme();

  return (
    <div className="container py-5" style={{ minHeight: '80vh' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className={`card shadow-lg ${isDark ? 'bg-dark text-light border-secondary' : 'bg-light'}`}>
            <div className="card-body text-center p-5">
              <h1 
                className="display-3 fw-bold mb-4"
                style={{ color: isDark ? '#f0f6fc' : '#212529' }}
              >
                Welcome to Mini Basket App
              </h1>
              
              {userData ? (
                <h2 
                  className="mb-4"
                  style={{ color: isDark ? '#58a6ff' : '#0969da' }}
                >
                  Hello, {userData.userName}! Ready to shop?
                </h2>
              ) : (
                <h2 
                  className="mb-4"
                  style={{ color: isDark ? '#8b949e' : '#6c757d' }}
                >
                  Please login to start shopping!
                </h2>
              )}
              
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                <Link 
                  to="/products" 
                  className="btn btn-primary btn-lg px-4 py-3"
                >
                  🛒 Browse Products
                </Link>
                
                {userData && (
                  <>
                    <Link 
                      to="/cart" 
                      className="btn btn-success btn-lg px-4 py-3"
                    >
                      🛍️ View Cart
                    </Link>
                    <Link 
                      to="/orders" 
                      className="btn btn-warning btn-lg px-4 py-3 text-dark"
                    >
                      📦 My Orders
                    </Link>
                  </>
                )}
              </div>

              {!userData && (
                <div className="mt-5">
                  <p 
                    className="mb-4"
                    style={{ color: isDark ? '#8b949e' : '#6c757d' }}
                  >
                    New to Mini Basket? Create an account to get started!
                  </p>
                  <div className="d-flex justify-content-center gap-3">
                    <Link 
                      to="/signup" 
                      className="btn btn-success btn-lg px-4 py-2"
                    >
                      Sign Up
                    </Link>
                    <Link 
                      to="/login" 
                      className="btn btn-outline-primary btn-lg px-4 py-2"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
