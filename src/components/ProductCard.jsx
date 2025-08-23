import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

const quickAddToCart = (e) => {
  e.stopPropagation(); // Prevent navigation when clicking add to cart
  
  if (!product.stock) {
    alert('This product is out of stock!');
    return;
  }

  // Get existing cart from localStorage
  const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
  
  // Check if product already exists in cart
  const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    // Update quantity if product exists
    existingCart[existingItemIndex].quantity += 1;
  } else {
    // Add new product to cart
    existingCart.push({
      ...product,
      quantity: 1
    });
  }
  
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(existingCart));
  
  // Dispatch custom event to notify cart component
  window.dispatchEvent(new CustomEvent('cartUpdated'));
  
  alert(`${product.name} added to cart!`);
};


  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '1rem', 
      margin: '1rem', 
      borderRadius: '8px',
      width: '300px',
      textAlign: 'center',
      backgroundColor: 'white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <img 
        src={product.image} 
        alt={product.name} 
        style={{ 
          width: '100%', 
          height: '200px', 
          objectFit: 'cover', 
          marginBottom: '1rem',
          borderRadius: '4px'
        }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/200x200?text=' + product.name;
        }}
      />
      <h3 style={{ marginBottom: '0.5rem' }}>{product.name}</h3>
      <p style={{ marginBottom: '0.5rem' }}>
        <strong>Price:</strong> ₹{product.price}
      </p>
      <p style={{ marginBottom: '0.5rem' }}>
        <strong>Category:</strong> {product.category}
      </p>
      <p style={{ 
        color: product.stock ? 'green' : 'red',
        marginBottom: '1rem'
      }}>
        {product.stock ? 'In Stock' : 'Out of Stock'}
      </p>
      
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button 
          onClick={handleViewDetails}
          style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            padding: '0.5rem 1rem', 
            borderRadius: '4px',
            cursor: 'pointer',
            flex: '1'
          }}
        >
          View Details
        </button>
        
        {product.stock && (
          <button 
            onClick={quickAddToCart}
            style={{ 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              padding: '0.5rem 1rem', 
              borderRadius: '4px',
              cursor: 'pointer',
              flex: '1'
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
