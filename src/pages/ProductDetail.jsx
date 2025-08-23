import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import products from '../data/products';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const product = products.find(p => p.id === parseInt(id));

const addToCart = () => {
  if (!product.stock) {
    setMessage('This product is out of stock!');
    return;
  }

  // Get existing cart from localStorage
  const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
  
  // Check if product already exists in cart
  const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    // Update quantity if product exists
    existingCart[existingItemIndex].quantity += quantity;
  } else {
    // Add new product to cart
    existingCart.push({
      ...product,
      quantity: quantity
    });
  }
  
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(existingCart));
  
  // Dispatch custom event to notify cart component
  window.dispatchEvent(new CustomEvent('cartUpdated'));
  
  setMessage(`${quantity} ${product.name}(s) added to cart!`);
  
  // Clear message after 3 seconds
  setTimeout(() => setMessage(''), 3000);
};


  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Product not found</h2>
        <button 
          onClick={() => navigate('/products')}
          style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            padding: '1rem 2rem', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1000px', 
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '80vh'
    }}>
      <div style={{ 
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <button 
          onClick={() => navigate('/products')}
          style={{ 
            backgroundColor: '#6c757d', 
            color: 'white', 
            border: 'none', 
            padding: '0.5rem 1rem', 
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          ← Back to Products
        </button>
        
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ 
                width: '100%', 
                maxWidth: '400px', 
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400?text=' + product.name;
              }}
            />
          </div>
          
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h1 style={{ marginBottom: '1rem' }}>{product.name}</h1>
            <p style={{ 
              fontSize: '2rem', 
              color: '#007bff', 
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              ₹{product.price}
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Category:</strong> {product.category}
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Description:</strong> {product.description}
            </p>
            
            {product.stock ? (
              <div>
                <p style={{ 
                  color: 'green', 
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
                  ✓ In Stock
                </p>
                
                {/* Quantity Selector */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <label style={{ fontWeight: 'bold' }}>Quantity:</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ 
                        backgroundColor: '#6c757d', 
                        color: 'white', 
                        border: 'none', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>
                    <span style={{ 
                      padding: '0.5rem 1rem', 
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      minWidth: '50px',
                      textAlign: 'center'
                    }}>
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ 
                        backgroundColor: '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={addToCart}
                    style={{ 
                      backgroundColor: '#28a745', 
                      color: 'white', 
                      border: 'none', 
                      padding: '1rem 2rem', 
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    Add to Cart
                  </button>
                  
                  <button 
                    onClick={() => navigate('/cart')}
                    style={{ 
                      backgroundColor: '#007bff', 
                      color: 'white', 
                      border: 'none', 
                      padding: '1rem 2rem', 
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    View Cart
                  </button>
                </div>

                {/* Success Message */}
                {message && (
                  <div style={{ 
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    border: '1px solid #c3e6cb',
                    borderRadius: '4px'
                  }}>
                    {message}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p style={{ 
                  color: 'red', 
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
                  ✗ Out of Stock
                </p>
                <button 
                  disabled
                  style={{ 
                    backgroundColor: '#ccc', 
                    color: '#666', 
                    border: 'none', 
                    padding: '1rem 2rem', 
                    borderRadius: '4px',
                    cursor: 'not-allowed',
                    fontSize: '1rem'
                  }}
                >
                  Unavailable
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
