import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/Schemas';
import { getJwtSecret, getRefreshSecret } from '../config/authSecrets';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required.' });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      department: user.department
    };

    const accessToken = jwt.sign(payload, getJwtSecret(), { expiresIn: '8h' });
    const refreshToken = jwt.sign(payload, getRefreshSecret(), { expiresIn: '7d' });

    res.json({
      success: true,
      message: 'Login successful.',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        avatar: user.avatar
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getProfile = async (req: any, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated.' });
    }
    const user = await UserModel.findOne({ email: req.user.email }).select('-passwordHash');
    res.json({ success: true, user: user || req.user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
