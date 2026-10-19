import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

import { Home } from './pages/public/Home';
import { Impact } from './pages/public/Impact';
import { Carbon } from './pages/public/Carbon';
import { Mangroves } from './pages/public/Mangroves';
import { Research } from './pages/public/Research';
import { Vessels } from './pages/public/Vessels';
import { Workstreams } from './pages/public/Workstreams';
import { Donate } from './pages/public/Donate';
import { CSR } from './pages/public/CSR';
import { Gisela } from './pages/public/Gisela';
import { Media } from './pages/public/Media';

import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ProjectManager } from './pages/admin/ProjectManager';
import { TraineeManager } from './pages/admin/TraineeManager';
import { ResearchRepoManager } from './pages/admin/ResearchRepoManager';
import { AuditLogs } from './pages/admin/AuditLogs';

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Ecosystem Routes */}
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/impact" element={<PublicLayout><Impact /></PublicLayout>} />
              <Route path="/carbon" element={<PublicLayout><Carbon /></PublicLayout>} />
              <Route path="/mangroves" element={<PublicLayout><Mangroves /></PublicLayout>} />
              <Route path="/research" element={<PublicLayout><Research /></PublicLayout>} />
              <Route path="/vessels" element={<PublicLayout><Vessels /></PublicLayout>} />
              <Route path="/workstreams" element={<PublicLayout><Workstreams /></PublicLayout>} />
              <Route path="/donate" element={<PublicLayout><Donate /></PublicLayout>} />
              <Route path="/csr" element={<PublicLayout><CSR /></PublicLayout>} />
              <Route path="/gisela" element={<PublicLayout><Gisela /></PublicLayout>} />
              <Route path="/media" element={<PublicLayout><Media /></PublicLayout>} />
              <Route path="/insights" element={<PublicLayout><Media /></PublicLayout>} />
              <Route path="/team" element={<PublicLayout><Gisela /></PublicLayout>} />
              <Route path="/partners" element={<PublicLayout><CSR /></PublicLayout>} />
              <Route path="/careers" element={<PublicLayout><Gisela /></PublicLayout>} />

              {/* Internal Admin Operations SaaS Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="projects" element={<ProjectManager />} />
                <Route path="trainees" element={<TraineeManager />} />
                <Route path="research" element={<ResearchRepoManager />} />
                <Route path="audit-logs" element={<AuditLogs />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
