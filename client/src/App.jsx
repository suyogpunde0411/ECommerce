import { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Auth from './components/Auth';
import VendorDashboard from './components/VendorDashboard';
import './index.css';

function App() {
  const [user, setUser] = useState(null); // { name, email, role, token }
  const [view, setView] = useState('products'); // 'products' or 'cart'
  const [cartItems, setCartItems] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
    setView('products'); // Reset view on login
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.product === product._id);
      if (existing) {
        return prevItems.map(item =>
          item.product === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { 
        product: product._id, 
        name: product.name, 
        price: product.price, 
        quantity: 1 
      }];
    });
  };

  const updateQuantity = (productId, amount) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.product === productId) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.product !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // If not logged in, show Auth screen
  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo" onClick={() => user.role === 'customer' && setView('products')}>
          CloudCart <span className="role-badge">{user.role}</span>
        </div>
        <nav>
          {user.role === 'customer' && (
            <>
              <button 
                className={view === 'products' ? 'nav-btn active' : 'nav-btn'} 
                onClick={() => setView('products')}
              >
                Products
              </button>
              <button 
                className={view === 'cart' ? 'nav-btn active' : 'nav-btn'} 
                onClick={() => setView('cart')}
              >
                Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
              </button>
            </>
          )}
          <button className="nav-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="main-content">
        {user.role === 'vendor' ? (
          <VendorDashboard token={user.token} />
        ) : (
          view === 'products' ? (
            <ProductList onAddToCart={addToCart} />
          ) : (
            <Cart 
              cartItems={cartItems} 
              clearCart={clearCart} 
              setView={setView}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          )
        )}
      </main>
    </div>
  );
}

export default App;
