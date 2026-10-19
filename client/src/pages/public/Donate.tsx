import React, { useEffect, useState } from 'react';
import { fetchCampaigns, postDonation } from '../../services/api';
import { Campaign } from '../../types';
import { Heart, ShieldCheck, CheckCircle2, Download, CreditCard, Lock } from 'lucide-react';

export const Donate: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>('CAMP-MANGROVE');
  const [amount, setAmount] = useState<number>(5000);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [receiptData, setReceiptData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchCampaigns().then(setCampaigns).catch(console.error);
  }, []);

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail || !amount) return;

    setIsProcessing(true);
    try {
      // Simulate Razorpay popup checkout flow
      const mockRazorpayId = `pay_${Math.random().toString(36).substring(2, 10)}`;
      
      const res = await postDonation({
        donorName,
        donorEmail,
        campaignCode: selectedCampaign,
        amount,
        razorpayPaymentId: mockRazorpayId
      });

      setReceiptData(res.data);
    } catch (err: any) {
      alert(err.message || 'Donation processing error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-ocean-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-cyan-500/20 pb-8 text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
            Regenerative Philanthropy Platform
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white">
            Support OceaNova Blue Economy Initiatives
          </h1>
          <p className="text-sm text-gray-300">
            100% of public contributions directly fund mangrove sapling propagation, solar boat retrofits, and coastal youth robotics scholarships.
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" /> 80G Tax Exemption Certificate Generated Instantly
          </div>
        </div>

        {/* Campaign Selection Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white">Select Impact Campaign</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((camp) => (
              <div
                key={camp._id}
                onClick={() => setSelectedCampaign(camp.code)}
                className={`glass-panel p-6 rounded-3xl border cursor-pointer transition-all ${
                  selectedCampaign === camp.code ? 'border-cyan-400 bg-ocean-900/90 shadow-glow-cyan' : 'border-gray-800 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex gap-4">
                  <img src={camp.imageUrl} alt={camp.title} className="w-24 h-24 rounded-2xl object-cover" />
                  <div className="space-y-2 flex-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
                      {camp.category}
                    </span>
                    <h4 className="text-base font-bold text-white leading-tight">{camp.title}</h4>
                    <p className="text-xs text-gray-300 line-clamp-2">{camp.description}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-emerald-400">Raised: ₹{camp.raisedAmount.toLocaleString()}</span>
                    <span className="text-gray-400">Goal: ₹{camp.goalAmount.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-ocean-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                      style={{ width: `${Math.min(100, (camp.raisedAmount / camp.goalAmount) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Form or Receipt Display */}
        {receiptData ? (
          <div className="glass-panel p-8 rounded-3xl border border-emerald-500/40 max-w-xl mx-auto text-center space-y-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Donation Successful!</h3>
            <p className="text-xs text-gray-300">
              Thank you, <strong className="text-white">{receiptData.donorName}</strong>. Your payment receipt number is <span className="text-cyan-400 font-mono font-bold">{receiptData.receiptNumber}</span>.
            </p>

            <div className="p-4 bg-ocean-950 rounded-2xl border border-gray-800 text-left text-xs space-y-2 text-gray-300">
              <div>Amount Donated: <span className="font-bold text-white">₹{receiptData.amount.toLocaleString()}</span></div>
              <div>Payment ID: <span className="font-mono text-cyan-400">{receiptData.razorpayPaymentId}</span></div>
              <div>80G Tax Exemption Status: <span className="text-emerald-400 font-bold">ELIGIBLE</span></div>
            </div>

            <button
              onClick={() => alert("Downloading Official 80G Tax Receipt PDF...")}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-emerald-400 text-ocean-950 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download 80G Tax Exemption Receipt PDF
            </button>
          </div>
        ) : (
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 max-w-xl mx-auto space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-cyan-400" /> Secure Donation Checkout
            </h3>

            <form onSubmit={handleDonationSubmit} className="space-y-5">
              
              {/* Preset Amounts */}
              <div>
                <label className="text-xs text-gray-300 font-semibold block mb-2">Select Contribution Amount (INR)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1000, 2500, 5000, 10000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        amount === val ? 'bg-cyan-500 text-ocean-950' : 'bg-ocean-900 border border-gray-700 text-gray-300'
                      }`}
                    >
                      ₹{val.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-300 font-semibold block mb-1">Custom Amount (INR)</label>
                <input
                  type="number"
                  min={100}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 font-semibold block mb-1">Full Name (for 80G Receipt)</label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="text-[10px] text-gray-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Powered by Razorpay. 256-bit SSL encrypted. Card numbers are never stored.</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-emerald-400 text-ocean-950 shadow-glow-cyan hover:opacity-90 transition-opacity"
              >
                {isProcessing ? 'Processing Payment...' : `Proceed to Pay ₹${amount.toLocaleString()} via Razorpay`}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
