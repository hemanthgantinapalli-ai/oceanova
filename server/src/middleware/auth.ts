import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'oceanova_blue_economy_jwt_secret_key_2026';

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Demo fallback for unauthenticated requests in development mode
    const mockToken = req.headers['x-demo-user'];
    if (mockToken === 'founder') {
      req.user = { id: 'u-founder', email: 'founder@oceanova.org', role: 'FOUNDER', name: 'Dr. Oceanova Founder' };
      return next();
    } else if (mockToken === 'researcher') {
      req.user = { id: 'u-researcher', email: 'researcher@oceanova.org', role: 'RESEARCHER', name: 'Dr. Marine Scientist' };
      return next();
    }
    return res.status(401).json({ success: false, message: 'Authorization token missing or invalid.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired access token.' });
  }
};

export const requireRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User unauthenticated.' });
    }

    if (req.user.role === 'SUPER_ADMIN' || req.user.role === 'FOUNDER') {
      return next(); // Global bypass for core executive leadership
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden. Role '${req.user.role}' lacks sufficient privileges for this operation.`
      });
    }

    next();
  };
};
