import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Updated to the single file


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { isDark } = useTheme(); // Added this line

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      }
    };

    loadCart();

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
  }, []);

  const saveCart = (newCartItems) => {
    localStorage.setItem('cart', JSON.stringify(newCartItems));
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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className={`card shadow ${isDark ? 'bg-dark text-light' : ''}`}>
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="mb-0">Your Cart ({getTotalItems()} items)</h1>
                {!isEmpty && (
                  <button 
                    onClick={clearCart}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
            
            <div className="card-body">
              {isEmpty ? (
                <div className="text-center py-5">
                  <div className="mb-4">
                    <span className="display-1">🛒</span>
                  </div>
                  <h2 className="text-muted mb-3">Your cart is empty</h2>
                  <p className="text-muted mb-4">Start shopping and add some products to your cart!</p>
                  <button 
                    onClick={() => navigate('/products')}
                    className="btn btn-primary btn-lg"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div>
                  {cartItems.map(item => (
                    <div key={item.id} className="row align-items-center border-bottom py-3">
                      <div className="col-md-2">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="img-fluid rounded"
                          style={{ height: '80px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80x80?text=' + encodeURIComponent(item.name);
                          }}
                        />
                      </div>
                      
                      <div className="col-md-4">
                        <h5 className="mb-1">{item.name}</h5>
                        <p className="text-muted mb-1">₹{item.price}</p>
                        <small className="text-muted">{item.category}</small>
                      </div>
                      
                      <div className="col-md-3">
                        <div className="d-flex align-items-center">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="btn btn-outline-secondary btn-sm"
                          >
                            -
                          </button>
                          <span className="mx-3 fw-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="btn btn-outline-secondary btn-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-md-2 text-end">
                        <div className="fw-bold text-success">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                      
                      <div className="col-md-1 text-end">
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="btn btn-outline-danger btn-sm"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <div className="row">
                      <div className="col-md-8">
                        <button 
                          onClick={() => navigate('/products')}
                          className="btn btn-outline-secondary"
                        >
                          Continue Shopping
                        </button>
                      </div>
                      <div className="col-md-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex justify-content-between mb-2">
                              <span>Total Items:</span>
                              <span>{getTotalItems()}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                              <span className="fw-bold">Total Amount:</span>
                              <span className="fw-bold text-success fs-5">₹{getTotalPrice()}</span>
                            </div>
                            <button 
                              onClick={proceedToCheckout}
                              className="btn btn-success w-100"
                            >
                              Proceed to Checkout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Cart;
