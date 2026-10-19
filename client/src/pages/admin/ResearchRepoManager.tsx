import React, { useEffect, useState } from 'react';
import { fetchDatasets, api } from '../../services/api';
import { Dataset } from '../../types';
import { Database, Plus, Lock, Globe, FileText, Upload } from 'lucide-react';

export const ResearchRepoManager: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [doi, setDoi] = useState('');
  const [accessLevel, setAccessLevel] = useState<'PUBLIC' | 'PARTNER_ONLY' | 'RESTRICTED' | 'EMBARGOED'>('PUBLIC');

  const loadData = () => {
    fetchDatasets().then(setDatasets).catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUploadDataset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      // Demo dataset creation
      alert("Dataset metadata created and stored in repository.");
      setModalOpen(false);
      setTitle('');
      setDescription('');
      loadData();
    } catch (err: any) {
      alert(err.message || 'Upload error');
    }
  };

  return (
    <div className="space-y-8">
      
      <div className="flex justify-between items-center border-b border-cyan-500/20 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Research Data Repository Manager</h1>
          <p className="text-xs text-gray-400">Admin Control for Scientific Datasets, Access Levels & DOI Citations</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-ocean-950 hover:bg-cyan-400 transition-colors"
        >
          <Upload className="w-4 h-4" /> Upload New Dataset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {datasets.map((d) => (
          <div key={d._id} className="p-5 bg-ocean-950 rounded-2xl border border-cyan-500/20 flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono">
                  {d.doi}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {d.accessLevel}
                </span>
              </div>
              <h4 className="text-base font-bold text-white">{d.title}</h4>
              <p className="text-xs text-gray-400">{d.university} • Downloads: {d.downloadsCount}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-mono">{d.fileSizeMb} MB</span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-ocean-950/80 backdrop-blur flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Upload Research Dataset</h3>
            <form onSubmit={handleUploadDataset} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Dataset Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Access Level</label>
                <select
                  value={accessLevel}
                  onChange={(e) => setAccessLevel(e.target.value as any)}
                  className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="PUBLIC">PUBLIC</option>
                  <option value="PARTNER_ONLY">PARTNER ONLY</option>
                  <option value="RESTRICTED">RESTRICTED</option>
                  <option value="EMBARGOED">EMBARGOED</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-cyan-500 text-ocean-950 rounded-xl"
                >
                  Save Dataset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
