import React, { useEffect, useState } from 'react';
import { fetchAdminAuditLogs } from '../../services/api';
import { AuditLogItem } from '../../types';
import { ShieldAlert, Terminal, Lock } from 'lucide-react';

export const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);

  useEffect(() => {
    fetchAdminAuditLogs().then(setLogs).catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      
      <div className="border-b border-cyan-500/20 pb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-rose-400" /> Security Audit Logs
        </h1>
        <p className="text-xs text-gray-400">Immutable operations log tracking user actions, IP addresses, and resource mutations.</p>
      </div>

      <div className="bg-ocean-950 rounded-3xl border border-rose-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-ocean-900 border-b border-gray-800 text-gray-400 uppercase">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Resource</th>
                <th className="px-6 py-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-ocean-900/50">
                    <td className="px-6 py-4 text-gray-400">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4 text-white font-bold">{log.userEmail}</td>
                    <td className="px-6 py-4 text-cyan-400">{log.userRole}</td>
                    <td className="px-6 py-4 text-yellow-400 font-bold">{log.action}</td>
                    <td className="px-6 py-4 text-emerald-400">{log.resource}</td>
                    <td className="px-6 py-4 text-gray-500">{log.ipAddress}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 italic">
                    Sample Audit Entries: [2026-08-20 07:18:00] founder@oceanova.org (FOUNDER) CREATE_TASK on Tasks from 127.0.0.1
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
