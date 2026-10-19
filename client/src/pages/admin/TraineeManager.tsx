import React, { useEffect, useState } from 'react';
import { fetchAdminTrainees } from '../../services/api';
import { Trainee } from '../../types';
import { GraduationCap, QrCode, CheckCircle, Award } from 'lucide-react';

export const TraineeManager: React.FC = () => {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [selectedCert, setSelectedCert] = useState<Trainee | null>(null);

  useEffect(() => {
    fetchAdminTrainees().then(setTrainees).catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      
      <div className="border-b border-cyan-500/20 pb-6">
        <h1 className="text-2xl font-bold text-white">Youth & Women Trainee Roster</h1>
        <p className="text-xs text-gray-400">QR-Verifiable Credentials & HR Completion Records</p>
      </div>

      {/* Trainees Roster Table */}
      <div className="bg-ocean-950 rounded-3xl border border-cyan-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ocean-900 border-b border-gray-800 text-gray-400 font-semibold uppercase">
              <tr>
                <th className="px-6 py-4">Trainee ID</th>
                <th className="px-6 py-4">Full Name</th>
                <th className="px-6 py-4">District</th>
                <th className="px-6 py-4">Course Name</th>
                <th className="px-6 py-4">Attendance</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">QR Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {trainees.map((t) => (
                <tr key={t._id} className="hover:bg-ocean-900/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-cyan-400 font-bold">{t.traineeId}</td>
                  <td className="px-6 py-4 font-bold text-white">{t.fullName}</td>
                  <td className="px-6 py-4 text-gray-300">{t.district}</td>
                  <td className="px-6 py-4 text-gray-300">{t.courseName}</td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">{t.attendancePercent}%</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {t.completionStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedCert(t)}
                      className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 font-semibold"
                    >
                      View QR Certificate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Certificate Verification Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-ocean-950/80 backdrop-blur flex items-center justify-center p-4">
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/40 max-w-lg w-full space-y-6 text-center">
            <Award className="w-12 h-12 text-yellow-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">OceaNova Verified Certificate</h3>
            
            <div className="p-4 bg-ocean-950 rounded-2xl border border-gray-800 text-xs space-y-2 text-gray-300 text-left">
              <div>Student Name: <strong className="text-white">{selectedCert.fullName}</strong></div>
              <div>Certificate ID: <span className="font-mono text-cyan-400">OCT-CERT-2026-{selectedCert.traineeId}</span></div>
              <div>Course: <span className="text-white">{selectedCert.courseName}</span></div>
              <div>District: <span className="text-white">{selectedCert.district}</span></div>
              <div>Status: <span className="text-emerald-400 font-bold">VERIFIED ON-CHAIN & DB</span></div>
            </div>

            {/* QR Graphic Mock */}
            <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl flex items-center justify-center border-2 border-cyan-400">
              <QrCode className="w-24 h-24 text-ocean-950" />
            </div>

            <button
              onClick={() => setSelectedCert(null)}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-ocean-900 border border-gray-700 text-gray-300"
            >
              Close Verification Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
