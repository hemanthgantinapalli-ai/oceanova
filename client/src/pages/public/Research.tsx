import React, { useEffect, useState } from 'react';
import { fetchDatasets, api } from '../../services/api';
import { Dataset } from '../../types';
import { Search, Download, BookOpen, FileText, Lock, Globe, CheckCircle2, Copy } from 'lucide-react';

export const Research: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [search, setSearch] = useState('');
  const [accessLevel, setAccessLevel] = useState('');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Request Access Modal Form State
  const [reqModalOpen, setReqModalOpen] = useState(false);
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqOrg, setReqOrg] = useState('');
  const [reqPurpose, setReqPurpose] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');

  useEffect(() => {
    fetchDatasets({ search, accessLevel }).then(setDatasets).catch(console.error);
  }, [search, accessLevel]);

  const copyCitation = (citation: string, id: string) => {
    navigator.clipboard.writeText(citation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDataset && reqName && reqEmail && reqPurpose) {
      try {
        const res = await api.post('/datasets/request-access', {
          datasetId: selectedDataset._id,
          name: reqName,
          email: reqEmail,
          organization: reqOrg,
          purpose: reqPurpose
        });
        setSubmittedMessage(res.data.message);
        setTimeout(() => {
          setReqModalOpen(false);
          setSubmittedMessage('');
        }, 3000);
      } catch (err: any) {
        alert(err.message || 'Error submitting request');
      }
    }
  };

  return (
    <div className="min-h-screen bg-ocean-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="border-b border-cyan-500/20 pb-8">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            Academic Research & Open Data Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-2">
            OceaNova Blue Carbon & Oceanography Repository
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Peer-reviewed scientific publications, high-resolution GIS datasets, IoT telemetry series, and coastal soil carbon core analytics.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 relative">
            <Search className="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search research papers, authors, universities, DOI, keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-ocean-900 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <select
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
              className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="">All Access Levels</option>
              <option value="PUBLIC">PUBLIC</option>
              <option value="PARTNER_ONLY">PARTNER ONLY</option>
              <option value="RESTRICTED">RESTRICTED</option>
              <option value="EMBARGOED">EMBARGOED</option>
            </select>
          </div>
        </div>

        {/* Datasets Cards Grid */}
        <div className="grid grid-cols-1 gap-6">
          {datasets.map((dataset) => (
            <div key={dataset._id} className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/20 space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  dataset.accessLevel === 'PUBLIC'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                }`}>
                  {dataset.accessLevel === 'PUBLIC' ? <Globe className="w-3 h-3 inline mr-1" /> : <Lock className="w-3 h-3 inline mr-1" />}
                  {dataset.accessLevel}
                </span>

                <span className="text-xs text-cyan-400 font-mono">
                  DOI: {dataset.doi}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white">{dataset.title}</h3>
              
              <p className="text-sm text-gray-300 leading-relaxed">{dataset.description}</p>

              <div className="flex flex-wrap gap-4 text-xs text-gray-400 border-y border-gray-800 py-3">
                <div><strong>Authors:</strong> {dataset.authors.join(', ')}</div>
                <div><strong>University:</strong> {dataset.university}</div>
                <div><strong>Year:</strong> {dataset.year}</div>
                <div><strong>Format:</strong> {dataset.datasetType} ({dataset.fileSizeMb} MB)</div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  onClick={() => copyCitation(dataset.citation, dataset._id)}
                  className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-white transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedId === dataset._id ? '✓ Citation Copied' : 'Copy APA Citation'}
                </button>

                <div className="flex items-center gap-3">
                  {dataset.accessLevel === 'PUBLIC' ? (
                    <a
                      href={dataset.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-emerald-400 text-ocean-950"
                    >
                      <Download className="w-4 h-4" /> Download Dataset
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedDataset(dataset);
                        setReqModalOpen(true);
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-ocean-900 border border-cyan-500/30 text-cyan-300 hover:bg-ocean-800"
                    >
                      <Lock className="w-4 h-4" /> Request Dataset Access
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Request Access Modal */}
        {reqModalOpen && selectedDataset && (
          <div className="fixed inset-0 z-50 bg-ocean-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="glass-panel p-8 rounded-3xl border border-cyan-500/40 max-w-lg w-full space-y-6">
              <h3 className="text-xl font-bold text-white">Request Dataset Access</h3>
              <p className="text-xs text-gray-400">{selectedDataset.title}</p>

              {submittedMessage ? (
                <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm rounded-xl">
                  ✓ {submittedMessage}
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-300 font-semibold block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={reqName}
                      onChange={(e) => setReqName(e.target.value)}
                      className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 font-semibold block mb-1">Institutional Email</label>
                    <input
                      type="email"
                      required
                      value={reqEmail}
                      onChange={(e) => setReqEmail(e.target.value)}
                      className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 font-semibold block mb-1">University / Organization</label>
                    <input
                      type="text"
                      value={reqOrg}
                      onChange={(e) => setReqOrg(e.target.value)}
                      className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 font-semibold block mb-1">Research Purpose / Intended Use</label>
                    <textarea
                      required
                      rows={3}
                      value={reqPurpose}
                      onChange={(e) => setReqPurpose(e.target.value)}
                      className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setReqModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-emerald-400 text-ocean-950"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
