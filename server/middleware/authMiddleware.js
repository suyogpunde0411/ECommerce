const jwt = require('jsonwebtoken');

// A simple secret key for JWT (in production, put this in .env)
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_123';

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const vendorOnly = (req, res, next) => {
  if (req.user && req.user.role === 'vendor') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as a vendor' });
  }
};

module.exports = { protect, vendorOnly, JWT_SECRET };
