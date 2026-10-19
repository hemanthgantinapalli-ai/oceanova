import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { OceaNovaLogo } from '../../components/common/OceaNovaLogo';
import { LayoutDashboard, CheckSquare, GraduationCap, Database, ShieldAlert, LogOut } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout, demoLogin } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: 'Overview Dashboard', path: '/admin', icon: LayoutDashboard, roles: ['ALL'] },
    { label: 'Project Kanban', path: '/admin/projects', icon: CheckSquare, roles: ['SUPER_ADMIN', 'FOUNDER', 'ADMIN', 'FIELD_STAFF'] },
    { label: 'Trainees & QR Certs', path: '/admin/trainees', icon: GraduationCap, roles: ['SUPER_ADMIN', 'FOUNDER', 'ADMIN', 'HR_MANAGER', 'TRAINER'] },
    { label: 'Research Datasets', path: '/admin/research', icon: Database, roles: ['SUPER_ADMIN', 'FOUNDER', 'ADMIN', 'RESEARCHER'] },
    { label: 'Security Audit Logs', path: '/admin/audit-logs', icon: ShieldAlert, roles: ['SUPER_ADMIN', 'FOUNDER', 'ADMIN'] },
  ];

  return (
    <div className="min-h-screen bg-[#070F1E] text-white flex">
      
      {/* SaaS Sidebar */}
      <aside className="w-64 bg-ocean-950 border-r border-cyan-500/20 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          
          {/* Logo */}
          <Link to="/">
            <OceaNovaLogo size="sm" />
          </Link>

          {/* Active User Badge & Demo Switcher */}
          <div className="p-3 bg-ocean-900/80 rounded-xl border border-cyan-500/20 space-y-2">
            <div className="text-[10px] text-gray-400 uppercase font-semibold">Active Session</div>
            <div className="text-xs font-bold text-white truncate">{user?.name || 'Dr. OceaNova Founder'}</div>
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              ROLE: {user?.role || 'FOUNDER'}
            </span>

            {/* Quick Demo Role Selector */}
            <div className="pt-2 border-t border-gray-800 text-[10px] space-y-1">
              <div className="text-gray-500">Demo Role Switcher:</div>
              <div className="flex flex-wrap gap-1">
                {['FOUNDER', 'RESEARCHER', 'FIELD_STAFF', 'FINANCE'].map((r) => (
                  <button
                    key={r}
                    onClick={() => demoLogin(r)}
                    className="px-1.5 py-0.5 rounded bg-ocean-950 text-cyan-400 border border-gray-700 hover:border-cyan-400"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400 hover:text-white hover:bg-ocean-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
          <Link to="/" className="text-xs text-gray-400 hover:text-white">← Public Site</Link>
          <button onClick={logout} className="text-xs text-rose-400 flex items-center gap-1">
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};
