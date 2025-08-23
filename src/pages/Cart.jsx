import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../data/products';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage only once on mount
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart && JSON.parse(savedCart).length > 0) {
        setCartItems(JSON.parse(savedCart));
      } else {
        // Initialize with sample items for demo
        const sampleCart = [
          { ...products[0], quantity: 1 }, // Laptop
          { ...products, quantity: 1 }  // Mouse
        ];
        setCartItems(sampleCart);
        localStorage.setItem('cart', JSON.stringify(sampleCart));
      }
    };

    loadCart();

    // Listen for custom cart update events from other components
    const handleCartUpdate = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []); // Empty dependency array - only run once on mount

  // Save cart to localStorage and dispatch event (but don't create infinite loop)
  const saveCart = (newCartItems) => {
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    // Only dispatch event if we're updating from within this component
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    saveCart(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    saveCart(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    const newOrder = {
      id: Date.now(),
      products: cartItems.map(item => `${item.name} (${item.quantity}x)`),
      items: cartItems,
      total: getTotalPrice(),
      status: 'Pending',
      date: new Date().toLocaleDateString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    clearCart();
    alert('Order placed successfully!');
    navigate('/orders');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const isEmpty = cartItems.length === 0;

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
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1>Your Cart ({getTotalItems()} items)</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => {
                localStorage.removeItem('cart');
                setCartItems([]);
                window.dispatchEvent(new CustomEvent('cartUpdated'));
              }}
              style={{ 
                backgroundColor: '#ffc107', 
                color: 'black', 
                border: 'none', 
                padding: '0.5rem 1rem', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reset Cart
            </button>
            {!isEmpty && (
              <button 
                onClick={clearCart}
                style={{ 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
        
        {isEmpty ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h2 style={{ color: '#666', marginBottom: '1rem' }}>Your cart is empty</h2>
            <p style={{ marginBottom: '2rem' }}>Add some products to get started!</p>
            <button 
              onClick={() => navigate('/products')}
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
              Browse Products
            </button>
          </div>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item.id} style={{ 
                border: '1px solid #ddd', 
                padding: '1rem', 
                margin: '1rem 0', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#e9ecef',
                    borderRadius: '4px',
                    marginRight: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #dee2e6'
                  }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ 
                        width: '76px', 
                        height: '76px', 
                        objectFit: 'cover', 
                        borderRadius: '2px'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `
                          <div style="
                            width: 76px; 
                            height: 76px; 
                            background: linear-gradient(45deg, #007bff, #28a745);
                            border-radius: 2px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-weight: bold;
                            font-size: 12px;
                            text-align: center;
                            line-height: 1.2;
                          ">
                            ${item.name}
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                      {item.name}
                    </h4>
                    <p style={{ margin: '0.25rem 0', color: '#666' }}>
                      <strong>Price:</strong> ₹{item.price}
                    </p>
                    <p style={{ margin: '0.25rem 0', color: '#666' }}>
                      <strong>Category:</strong> {item.category}
                    </p>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
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
                      textAlign: 'center',
                      backgroundColor: 'white',
                      fontWeight: 'bold'
                    }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                  
                  <div style={{ textAlign: 'right', minWidth: '100px' }}>
                    <strong style={{ fontSize: '1.1rem', color: '#007bff' }}>
                      ₹{item.price * item.quantity}
                    </strong>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    style={{ 
                      backgroundColor: '#dc3545', 
                      color: 'white', 
                      border: 'none', 
                      padding: '0.5rem 0.75rem', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
            
            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              border: '2px solid #007bff'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <div>
                  <h3>Total Items: {getTotalItems()}</h3>
                  <h2 style={{ color: '#007bff' }}>Total Amount: ₹{getTotalPrice()}</h2>
                </div>
                <button 
                  onClick={proceedToCheckout}
                  style={{ 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    padding: '1rem 2rem', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
