import { Request, Response } from 'express';
import { VesselModel } from '../models/Schemas';

export const getVessels = async (req: Request, res: Response) => {
  try {
    const vessels = await VesselModel.find();
    res.json({ success: true, count: vessels.length, data: vessels });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getVesselById = async (req: Request, res: Response) => {
  try {
    const vessel = await VesselModel.findOne({ vesselId: req.params.vesselId });
    if (!vessel) {
      return res.status(404).json({ success: false, message: 'Vessel not found.' });
    }
    res.json({ success: true, data: vessel });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
