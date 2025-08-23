function CartItem({ item }) {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '1rem', 
      margin: '0.5rem 0', 
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <img 
        src={item.image} 
        alt={item.name} 
        style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '1rem' }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/80x80?text=' + item.name;
        }}
      />
      <div>
        <h4>{item.name}</h4>
        <p><strong>Price:</strong> ₹{item.price}</p>
        <p><strong>Category:</strong> {item.category}</p>
      </div>
    </div>
  );
}

export default CartItem;
