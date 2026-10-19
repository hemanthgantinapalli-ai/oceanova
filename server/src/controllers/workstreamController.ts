import { Request, Response } from 'express';
import { WorkstreamModel, PillarModel } from '../models/Schemas';

export const getPillars = async (req: Request, res: Response) => {
  try {
    const pillars = await PillarModel.find();
    res.json({ success: true, data: pillars });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getWorkstreams = async (req: Request, res: Response) => {
  try {
    const { district, pillar, status } = req.query;
    const filter: any = {};
    if (district) filter.district = district;
    if (pillar) filter.pillar = pillar;
    if (status) filter.status = status;

    const workstreams = await WorkstreamModel.find(filter);
    res.json({ success: true, count: workstreams.length, data: workstreams });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
