import { Link } from 'react-router-dom';

function Home() {
  const currentUser = localStorage.getItem('currentUser');
  const userData = currentUser ? JSON.parse(currentUser) : null;

  return (
    <div style={{ 
      minHeight: '80vh',
      backgroundColor: '#f5f5f5',
      padding: '2rem'
    }}>
      <div style={{ 
        textAlign: 'center', 
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: '#333'
        }}>
          Welcome to Mini Basket App
        </h1>
        
        {userData ? (
          <h2 style={{ 
            color: '#007bff',
            marginBottom: '2rem'
          }}>
            Hello, {userData.userName}! Ready to shop?
          </h2>
        ) : (
          <h2 style={{ 
            color: '#666',
            marginBottom: '2rem'
          }}>
            Please login to start shopping!
          </h2>
        )}
        
        <div style={{ marginTop: '2rem' }}>
          <Link 
            to="/products" 
            style={{ 
              backgroundColor: '#007bff', 
              color: 'white', 
              padding: '1rem 2rem', 
              textDecoration: 'none', 
              borderRadius: '4px',
              margin: '0.5rem',
              display: 'inline-block',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            Browse Products
          </Link>
          
          {userData && (
            <>
              <Link 
                to="/cart" 
                style={{ 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  textDecoration: 'none', 
                  borderRadius: '4px',
                  margin: '0.5rem',
                  display: 'inline-block',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                View Cart
              </Link>
              <Link 
                to="/orders" 
                style={{ 
                  backgroundColor: '#ffc107', 
                  color: 'black', 
                  padding: '1rem 2rem', 
                  textDecoration: 'none', 
                  borderRadius: '4px',
                  margin: '0.5rem',
                  display: 'inline-block',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                My Orders
              </Link>
            </>
          )}
        </div>

        {!userData && (
          <div style={{ marginTop: '2rem' }}>
            <p style={{ marginBottom: '1rem', color: '#666' }}>
              New to Mini Basket? Create an account to get started!
            </p>
            <Link 
              to="/signup" 
              style={{ 
                backgroundColor: '#28a745', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                textDecoration: 'none', 
                borderRadius: '4px',
                margin: '0.5rem',
                display: 'inline-block'
              }}
            >
              Sign Up
            </Link>
            <Link 
              to="/login" 
              style={{ 
                backgroundColor: '#6c757d', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                textDecoration: 'none', 
                borderRadius: '4px',
                margin: '0.5rem',
                display: 'inline-block'
              }}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
