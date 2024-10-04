// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select('-password');
    if (!req.user)
      return res.status(401).json({ message: 'User not found, authorization denied' });

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
