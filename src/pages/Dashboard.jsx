import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const currentUser = localStorage.getItem('currentUser');
  const userData = currentUser ? JSON.parse(currentUser) : null;
  const { isDark } = useTheme();
  

  if (!userData) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          Please log in to access the dashboard.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className={`card shadow-lg ${isDark ? 'bg-dark text-light border-secondary' : 'bg-white'}`}>
            <div className="card-header text-center py-4">
              <h1 className="display-4 fw-bold mb-0" style={{ color: isDark ? '#f0f6fc' : '#212529' }}>
                Welcome, {userData.userName}!
              </h1>
            </div>
            <div className="card-body p-5">
              <p className="lead text-center mb-5" style={{ color: isDark ? '#8b949e' : '#6c757d' }}>
                You are successfully logged in to your dashboard.
              </p>
              <div className={`card ${isDark ? 'bg-secondary border-secondary' : 'bg-light'} mb-4`}>
                <div className="card-header">
                  <h3 className="mb-0" style={{ color: isDark ? '#f0f6fc' : '#212529' }}>
                    User Information
                  </h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <p className="mb-2" style={{ color: isDark ? '#8b949e' : '#6c757d' }}>
                        <strong style={{ color: isDark ? '#f0f6fc' : '#212529' }}>Name:</strong> {userData.userName}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-2" style={{ color: isDark ? '#8b949e' : '#6c757d' }}>
                        <strong style={{ color: isDark ? '#f0f6fc' : '#212529' }}>Email:</strong> {userData.userEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center gap-3">
                {/* Don't use <a href>! Use Link for routing */}
                <Link to="/products" className="btn btn-primary btn-lg px-4 py-3">
                  🛒 Browse Products
                </Link>
                <Link to="/cart" className="btn btn-success btn-lg px-4 py-3">
                  🛍️ View Cart
                </Link>
                <Link to="/orders" className="btn btn-warning btn-lg px-4 py-3 text-dark">
                  📦 My Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
