import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  const quickAddToCart = (e) => {
    e.stopPropagation();
    
    if (!product.stock) {
      alert('This product is out of stock!');
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className={`card h-100 product-card ${isDark ? 'bg-dark text-light' : ''}`}>
        <div className="product-image-container position-relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="card-img-top product-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(product.name);
            }}
          />
          <div className="product-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
            <button 
              onClick={handleViewDetails}
              className="btn btn-light btn-sm me-2"
            >
              👁️ View
            </button>
            {product.stock && (
              <button 
                onClick={quickAddToCart}
                className="btn btn-primary btn-sm"
              >
                🛒 Add
              </button>
            )}
          </div>
        </div>
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-muted">{product.description}</p>
          
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold fs-5 text-primary">₹{product.price}</span>
              <span className="badge bg-secondary">{product.category}</span>
            </div>
            
            <div className="d-flex justify-content-between align-items-center">
              <span className={`badge ${product.stock ? 'bg-success' : 'bg-danger'}`}>
                {product.stock ? 'In Stock' : 'Out of Stock'}
              </span>
              <button 
                onClick={handleViewDetails}
                className="btn btn-outline-primary btn-sm"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
