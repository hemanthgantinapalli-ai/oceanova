import { Request, Response } from 'express';
import { MangroveSiteModel } from '../models/Schemas';

export const getMangroveSites = async (req: Request, res: Response) => {
  try {
    const sites = await MangroveSiteModel.find();
    res.json({ success: true, count: sites.length, data: sites });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
