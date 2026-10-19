import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { AuditLogModel } from '../models/Schemas';

export const logAuditAction = (action: string, resource: string, details: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userEmail = req.user?.email || 'anonymous';
      const userRole = req.user?.role || 'GUEST';
      const ipAddress = req.ip || req.socket.remoteAddress || '127.0.0.1';

      await AuditLogModel.create({
        userEmail,
        userRole,
        action,
        resource,
        ipAddress,
        details,
        timestamp: new Date()
      });
    } catch (err) {
      console.error('[AuditLog] Error writing audit log entry:', err);
    }
    next();
  };
};
