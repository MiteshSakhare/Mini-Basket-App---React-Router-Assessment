import { useState, useEffect } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Initialize with sample orders
      const sampleOrders = [
        {
          id: 1,
          products: ['Laptop', 'Mouse'],
          total: 50800,
          status: 'Delivered',
          date: '2025-08-20'
        },
        {
          id: 2,
          products: ['Smartphone', 'Headphones'],
          total: 22000,
          status: 'Pending',
          date: '2025-08-22'
        },
        {
          id: 3,
          products: ['Chair', 'Table'],
          total: 11500,
          status: 'Shipped',
          date: '2025-08-21'
        }
      ];
      setOrders(sampleOrders);
      localStorage.setItem('orders', JSON.stringify(sampleOrders));
    }
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const cancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      updateOrderStatus(orderId, 'Cancelled');
    }
  };

  const reorder = (order) => {
    // Add items back to cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (order.items) {
      // If order has detailed items
      const newCart = [...existingCart, ...order.items];
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
    
    alert('Items added to cart!');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return '#28a745';
      case 'Shipped': return '#007bff';
      case 'Pending': return '#ffc107';
      case 'Cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return '✓';
      case 'Shipped': return '🚚';
      case 'Pending': return '⏳';
      case 'Cancelled': return '✕';
      default: return '📦';
    }
  };

  const filteredOrders = filter === 'All' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const getOrderStats = () => {
    return {
      total: orders.length,
      delivered: orders.filter(o => o.status === 'Delivered').length,
      pending: orders.filter(o => o.status === 'Pending').length,
      shipped: orders.filter(o => o.status === 'Shipped').length,
      cancelled: orders.filter(o => o.status === 'Cancelled').length
    };
  };

  const stats = getOrderStats();

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
        <h1 style={{ marginBottom: '2rem' }}>Your Orders ({orders.length})</h1>
        
        {/* Order Statistics */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '1rem', 
          marginBottom: '2rem' 
        }}>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px', 
            textAlign: 'center',
            border: '2px solid #007bff'
          }}>
            <h3>{stats.total}</h3>
            <p>Total Orders</p>
          </div>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#d4edda', 
            borderRadius: '8px', 
            textAlign: 'center' 
          }}>
            <h3>{stats.delivered}</h3>
            <p>Delivered</p>
          </div>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#cce7ff', 
            borderRadius: '8px', 
            textAlign: 'center' 
          }}>
            <h3>{stats.shipped}</h3>
            <p>Shipped</p>
          </div>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#fff3cd', 
            borderRadius: '8px', 
            textAlign: 'center' 
          }}>
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ marginRight: '1rem', fontWeight: 'bold' }}>Filter by status:</span>
          {['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
            <button 
              key={status}
              onClick={() => setFilter(status)}
              style={{ 
                backgroundColor: filter === status ? '#007bff' : '#f8f9fa',
                color: filter === status ? 'white' : '#333',
                border: '1px solid #ddd',
                padding: '0.5rem 1rem', 
                borderRadius: '4px',
                cursor: 'pointer',
                margin: '0.25rem'
              }}
            >
              {status}
            </button>
          ))}
        </div>
        
        {filteredOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h2 style={{ color: '#666', marginBottom: '1rem' }}>
              {filter === 'All' ? 'No orders found' : `No ${filter.toLowerCase()} orders`}
            </h2>
            <p>Start shopping to see your orders here!</p>
          </div>
        ) : (
          <div>
            {filteredOrders.map(order => (
              <div 
                key={order.id} 
                style={{ 
                  border: '1px solid #ddd', 
                  padding: '1.5rem', 
                  margin: '1rem 0', 
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                  borderLeft: `4px solid ${getStatusColor(order.status)}`
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p><strong>Date:</strong> {order.date}</p>
                    <p><strong>Products:</strong> {order.products.join(', ')}</p>
                    <p><strong>Total:</strong> ₹{order.total}</p>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      backgroundColor: getStatusColor(order.status),
                      color: 'white',
                      fontWeight: 'bold',
                      marginBottom: '1rem'
                    }}>
                      <span style={{ marginRight: '0.5rem' }}>
                        {getStatusIcon(order.status)}
                      </span>
                      {order.status}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  justifyContent: 'flex-end' 
                }}>
                  {order.status === 'Pending' && (
                    <>
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'Shipped')}
                        style={{ 
                          backgroundColor: '#007bff', 
                          color: 'white', 
                          border: 'none', 
                          padding: '0.5rem 1rem', 
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Mark as Shipped
                      </button>
                      <button 
                        onClick={() => cancelOrder(order.id)}
                        style={{ 
                          backgroundColor: '#dc3545', 
                          color: 'white', 
                          border: 'none', 
                          padding: '0.5rem 1rem', 
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel Order
                      </button>
                    </>
                  )}
                  
                  {order.status === 'Shipped' && (
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'Delivered')}
                      style={{ 
                        backgroundColor: '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        padding: '0.5rem 1rem', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Mark as Delivered
                    </button>
                  )}
                  
                  {(order.status === 'Delivered' || order.status === 'Cancelled') && (
                    <button 
                      onClick={() => reorder(order)}
                      style={{ 
                        backgroundColor: '#6c757d', 
                        color: 'white', 
                        border: 'none', 
                        padding: '0.5rem 1rem', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
