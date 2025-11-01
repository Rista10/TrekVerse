import jwt from 'jsonwebtoken';
import User from '../Models/User.js';


export const verifyAccessToken = (req, res, next) => {
  // Get token from cookies first, then from Authorization header
  let token = req.cookies?.accessToken;
  
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // If token is expired, respond with 401 so frontend can refresh it
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Access token expired' });
      }

      // Any other token error
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
    
    next();
  });
};

