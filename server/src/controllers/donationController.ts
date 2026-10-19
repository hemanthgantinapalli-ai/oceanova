import { Request, Response } from 'express';
import { CampaignModel, DonationModel } from '../models/Schemas';

export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await CampaignModel.find();
    res.json({ success: true, count: campaigns.length, data: campaigns });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createDonation = async (req: Request, res: Response) => {
  try {
    const { donorName, donorEmail, campaignCode, amount, razorpayPaymentId } = req.body;

    if (!donorName || !donorEmail || !amount || !campaignCode) {
      return res.status(400).json({ success: false, message: 'Invalid donation details.' });
    }

    const receiptNumber = `OCT-REC-${Math.floor(100000 + Math.random() * 900000)}`;

    const donation = await DonationModel.create({
      donorName,
      donorEmail,
      campaignCode,
      amount: parseFloat(amount),
      paymentStatus: 'COMPLETED',
      razorpayPaymentId: razorpayPaymentId || `pay_demo_${Date.now()}`,
      receiptNumber
    });

    // Update campaign raised amount
    await CampaignModel.findOneAndUpdate(
      { code: campaignCode },
      { $inc: { raisedAmount: parseFloat(amount), supportersCount: 1 } }
    );

    res.json({
      success: true,
      message: 'Donation recorded successfully. Thank you for supporting OceaNova!',
      data: donation
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
