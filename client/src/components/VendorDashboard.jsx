import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function VendorDashboard({ token }) {
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          price: Number(formData.price),
          description: formData.description
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add product');
      }

      setMessage({ type: 'success', text: 'Product published successfully!' });
      setFormData({ name: '', price: '', description: '' }); // reset form
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Vendor Dashboard</h2>
      <p>Add a new product to the store.</p>
      
      <div className="add-product-card">
        {message && (
          <div className={`alert ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Product Name</label>
            <input 
              type="text" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label>Price ($)</label>
            <input 
              type="number" 
              name="price" 
              min="0.01" 
              step="0.01"
              required 
              value={formData.price} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              rows="4"
              required 
              value={formData.description} 
              onChange={handleChange} 
            ></textarea>
          </div>

          <button type="submit" className="btn success-btn full-width" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VendorDashboard;
