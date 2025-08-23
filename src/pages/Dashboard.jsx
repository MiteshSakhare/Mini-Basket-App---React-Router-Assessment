import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('currentUser');
  const userData = currentUser ? JSON.parse(currentUser) : null;

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!userData) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1>Welcome, {userData.userName}!</h1>
      <p>You are successfully logged in to your dashboard.</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <Link 
          to="/products" 
          style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '2rem', 
            textDecoration: 'none', 
            borderRadius: '8px',
            display: 'block'
          }}
        >
          <h3>Browse Products</h3>
          <p>Discover our latest collection</p>
        </Link>
        
        <Link 
          to="/cart" 
          style={{ 
            backgroundColor: '#28a745', 
            color: 'white', 
            padding: '2rem', 
            textDecoration: 'none', 
            borderRadius: '8px',
            display: 'block'
          }}
        >
          <h3>My Cart</h3>
          <p>View items in your cart</p>
        </Link>
        
        <Link 
          to="/orders" 
          style={{ 
            backgroundColor: '#ffc107', 
            color: 'black', 
            padding: '2rem', 
            textDecoration: 'none', 
            borderRadius: '8px',
            display: 'block'
          }}
        >
          <h3>My Orders</h3>
          <p>Track your order status</p>
        </Link>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>User Information</h3>
        <p><strong>Name:</strong> {userData.userName}</p>
        <p><strong>Email:</strong> {userData.userEmail}</p>
      </div>
    </div>
  );
}

export default Dashboard;
