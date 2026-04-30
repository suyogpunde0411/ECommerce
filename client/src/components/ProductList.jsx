import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from backend
    fetch(`${API_URL}/products`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError('Could not load products. Make sure backend is running.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="message">Loading products...</div>;
  if (error) return <div className="message error">{error}</div>;

  return (
    <div className="product-list">
      <h2>Available Products</h2>
      {products.length === 0 ? (
        <p>No products available. Add some using the backend API.</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <p className="description">{product.description}</p>
              <button 
                className="btn primary-btn" 
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
