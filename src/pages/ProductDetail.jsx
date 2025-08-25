import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import products from '../data/products';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const { isDark } = useTheme();
  const product = products.find(p => p.id === parseInt(id));

  const addToCart = () => {
    if (!product.stock) {
      setMessage('This product is out of stock!');
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({ ...product, quantity: quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    setMessage(`${quantity} ${product.name}(s) added to cart!`);
    setTimeout(() => setMessage(''), 3000);
  };

  if (!product) {
    return (
      <div 
        className="container py-5" 
        style={{ 
          minHeight: '80vh',
          backgroundColor: isDark ? '#0d1117' : 'transparent' 
        }}
      >
        <div className="text-center">
          <div className={`card ${isDark ? 'bg-dark text-light border-secondary' : 'bg-white'}`}>
            <div className="card-body py-5">
              <h2 style={{ color: isDark ? '#f0f6fc' : '#212529' }}>
                Product not found
              </h2>
              <button 
                onClick={() => navigate('/products')}
                className="btn btn-primary btn-lg mt-3"
              >
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="container py-5" 
      style={{ 
        minHeight: '80vh',
        backgroundColor: isDark ? '#0d1117' : 'transparent' 
      }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className={`card shadow-lg ${isDark ? 'bg-dark text-light border-secondary' : 'bg-white'}`}>
            <div className="card-body p-4">
              <button 
                onClick={() => navigate('/products')}
                className="btn btn-outline-secondary mb-4"
              >
                ← Back to Products
              </button>
              
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="img-fluid rounded shadow"
                      style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/500x400?text=' + encodeURIComponent(product.name);
                      }}
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="product-details">
                    <h1 
                      className="display-5 fw-bold mb-3"
                      style={{ color: isDark ? '#f0f6fc' : '#212529' }}
                    >
                      {product.name}
                    </h1>
                    
                    <div className="mb-3">
                      <span 
                        className="display-6 fw-bold"
                        style={{ color: isDark ? '#58a6ff' : '#0969da' }}
                      >
                        ₹{product.price}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <span className={`badge ${product.stock ? 'bg-success' : 'bg-danger'} fs-6 px-3 py-2`}>
                        {product.stock ? '✓ In Stock' : '✗ Out of Stock'}
                      </span>
                      <span className="badge bg-secondary fs-6 px-3 py-2 ms-2">
                        {product.category}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h5 
                        className="mb-2"
                        style={{ color: isDark ? '#f0f6fc' : '#212529' }}
                      >
                        Description
                      </h5>
                      <p 
                        className="lead"
                        style={{ color: isDark ? '#8b949e' : '#6c757d' }}
                      >
                        {product.description}
                      </p>
                    </div>
                    
                    {product.stock ? (
                      <div>
                        <div className="mb-4">
                          <label 
                            className="form-label fw-bold mb-3"
                            style={{ color: isDark ? '#f0f6fc' : '#212529' }}
                          >
                            Quantity:
                          </label>
                          <div className="d-flex align-items-center gap-3">
                            <button 
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="btn btn-outline-secondary btn-lg"
                            >
                              -
                            </button>
                            <span 
                              className="fs-4 fw-bold px-4 py-2 border rounded text-center"
                              style={{ 
                                minWidth: '80px',
                                backgroundColor: isDark ? '#21262d' : '#f8f9fa',
                                borderColor: isDark ? '#30363d' : '#dee2e6',
                                color: isDark ? '#f0f6fc' : '#212529'
                              }}
                            >
                              {quantity}
                            </span>
                            <button 
                              onClick={() => setQuantity(quantity + 1)}
                              className="btn btn-outline-secondary btn-lg"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="d-flex gap-3 mb-4">
                          <button 
                            onClick={addToCart}
                            className="btn btn-success btn-lg px-4 py-3 flex-fill"
                          >
                            🛒 Add to Cart
                          </button>
                          
                          <button 
                            onClick={() => navigate('/cart')}
                            className="btn btn-primary btn-lg px-4 py-3"
                          >
                            View Cart
                          </button>
                        </div>

                        {message && (
                          <div className="alert alert-success" role="alert">
                            <strong>Success!</strong> {message}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <h5 
                          className="text-danger mb-3"
                          style={{ color: isDark ? '#f85149' : '#dc3545' }}
                        >
                          This product is currently out of stock
                        </h5>
                        <button 
                          disabled
                          className="btn btn-secondary btn-lg"
                        >
                          Unavailable
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
