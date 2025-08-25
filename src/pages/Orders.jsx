import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const { isDark } = useTheme();

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

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'success';
      case 'Shipped': return 'primary';
      case 'Pending': return 'warning';
      case 'Cancelled': return 'danger';
      default: return 'secondary';
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
            <div className="card-header py-4">
              <h1 
                className="mb-0 text-center"
                style={{ 
                  color: isDark ? '#f0f6fc' : '#212529',
                  fontSize: '2.5rem'
                }}
              >
                Your Orders ({orders.length})
              </h1>
            </div>
            
            <div className="card-body p-4">
              {/* Order Statistics */}
              <div className="row mb-4">
                <div className="col-md-3 mb-3">
                  <div className="card bg-primary text-white text-center">
                    <div className="card-body">
                      <h3 className="mb-1">{stats.total}</h3>
                      <p className="mb-0">Total Orders</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-success text-white text-center">
                    <div className="card-body">
                      <h3 className="mb-1">{stats.delivered}</h3>
                      <p className="mb-0">Delivered</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-info text-white text-center">
                    <div className="card-body">
                      <h3 className="mb-1">{stats.shipped}</h3>
                      <p className="mb-0">Shipped</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-warning text-dark text-center">
                    <div className="card-body">
                      <h3 className="mb-1">{stats.pending}</h3>
                      <p className="mb-0">Pending</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="mb-4 text-center">
                <h5 
                  className="mb-3"
                  style={{ color: isDark ? '#f0f6fc' : '#212529' }}
                >
                  Filter by status:
                </h5>
                <div className="btn-group flex-wrap" role="group">
                  {['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                    <button 
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`btn ${filter === status ? 'btn-primary' : (isDark ? 'btn-outline-light' : 'btn-outline-secondary')} mx-1 mb-2`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              
              {filteredOrders.length === 0 ? (
                <div className="text-center py-5">
                  <h2 
                    className="mb-3"
                    style={{ color: isDark ? '#8b949e' : '#6c757d' }}
                  >
                    {filter === 'All' ? 'No orders found' : `No ${filter.toLowerCase()} orders`}
                  </h2>
                  <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>
                    Start shopping to see your orders here!
                  </p>
                </div>
              ) : (
                <div className="row">
                  {filteredOrders.map(order => (
                    <div key={order.id} className="col-lg-6 mb-4">
                      <div className={`card h-100 ${isDark ? 'bg-secondary border-secondary' : 'bg-light'}`}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h5 
                                className="card-title mb-2"
                                style={{ color: isDark ? '#f0f6fc' : '#212529' }}
                              >
                                Order #{order.id}
                              </h5>
                              <span className={`badge bg-${getStatusColor(order.status)} px-3 py-2`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="order-details">
                            <p 
                              className="mb-2"
                              style={{ color: isDark ? '#8b949e' : '#6c757d' }}
                            >
                              <strong style={{ color: isDark ? '#f0f6fc' : '#212529' }}>
                                Date:
                              </strong> {order.date}
                            </p>
                            <p 
                              className="mb-2"
                              style={{ color: isDark ? '#8b949e' : '#6c757d' }}
                            >
                              <strong style={{ color: isDark ? '#f0f6fc' : '#212529' }}>
                                Products:
                              </strong> {order.products.join(', ')}
                            </p>
                            <p 
                              className="mb-3 fs-5"
                              style={{ color: isDark ? '#58a6ff' : '#0969da' }}
                            >
                              <strong>Total: ₹{order.total}</strong>
                            </p>
                          </div>
                          
                          <div className="d-flex gap-2 flex-wrap">
                            {order.status === 'Pending' && (
                              <>
                                <button 
                                  onClick={() => updateOrderStatus(order.id, 'Shipped')}
                                  className="btn btn-primary btn-sm"
                                >
                                  Ship Order
                                </button>
                                <button 
                                  onClick={() => cancelOrder(order.id)}
                                  className="btn btn-danger btn-sm"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            
                            {order.status === 'Shipped' && (
                              <button 
                                onClick={() => updateOrderStatus(order.id, 'Delivered')}
                                className="btn btn-success btn-sm"
                              >
                                Mark Delivered
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
