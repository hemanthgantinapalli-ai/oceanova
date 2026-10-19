import { Request, Response } from 'express';
import { DatasetModel } from '../models/Schemas';

export const getDatasets = async (req: Request, res: Response) => {
  try {
    const { search, accessLevel, datasetType, year } = req.query;
    const filter: any = {};
    if (accessLevel) filter.accessLevel = accessLevel;
    if (datasetType) filter.datasetType = datasetType;
    if (year) filter.year = parseInt(year as string);
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { university: { $regex: search, $options: 'i' } }
      ];
    }

    const datasets = await DatasetModel.find(filter);
    res.json({ success: true, count: datasets.length, data: datasets });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const requestDatasetAccess = async (req: Request, res: Response) => {
  try {
    const { datasetId, name, email, organization, purpose } = req.body;
    if (!name || !email || !purpose) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
    }

    // Record request count update
    await DatasetModel.findByIdAndUpdate(datasetId, { $inc: { downloadsCount: 1 } });

    res.json({
      success: true,
      message: 'Access request submitted successfully. Our research team will review and respond within 24 hours.'
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
