import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('customer'); // Default to customer
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      onLogin(data); // Pass user data and token up to App
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        
        <div className="role-selector">
          <p>I am a:</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                value="customer" 
                checked={role === 'customer'} 
                onChange={() => setRole('customer')} 
              />
              Customer
            </label>
            <label>
              <input 
                type="radio" 
                value="vendor" 
                checked={role === 'vendor'} 
                onChange={() => setRole('vendor')} 
              />
              Vendor
            </label>
          </div>
        </div>

        {error && <div className="alert error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              required 
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              value={formData.password} 
              onChange={handleChange} 
            />
          </div>

          <button type="submit" className="btn primary-btn full-width" disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)} className="switch-link">
            {isLogin ? 'Sign up here' : 'Login here'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
