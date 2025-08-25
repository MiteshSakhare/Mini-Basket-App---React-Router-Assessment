import ProductCard from '../components/ProductCard';
import products from '../data/products';
import { useTheme } from '../context/ThemeContext';

function Products() {
  const { isDark } = useTheme();
  
  return (
    <div 
      className="container py-5" 
      style={{ 
        minHeight: '80vh',
        backgroundColor: isDark ? '#0d1117' : 'transparent' 
      }}
    >
      <div className="text-center mb-5">
        <h1 
          className="display-4 fw-bold mb-3"
          style={{ 
            color: isDark ? '#f0f6fc' : '#212529',
            textShadow: isDark ? '0 0 10px rgba(240, 246, 252, 0.3)' : 'none'
          }}
        >
          Our Products
        </h1>
        <p 
          className="lead fs-4"
          style={{ 
            color: isDark ? '#8b949e' : '#6c757d',
            fontWeight: '500'
          }}
        >
          Discover our amazing collection of products
        </p>
      </div>
      
      <div className="row">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
