import ProductCard from '../components/ProductCard.jsx';
import products from '../data/products';

function Products() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Our Products</h1>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center' 
      }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
