import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { OceaNovaLogo } from '../common/OceaNovaLogo';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Pillars', to: '/#pillars' },
  { label: 'Impact', to: '/impact' },
  { label: 'Research', to: '/research' },
  { label: 'Carbon', to: '/carbon' },
  { label: 'Vessels', to: '/vessels' },
  { label: 'Media', to: '/media' },
  { label: 'Partners', to: '/csr' },
  { label: 'Contact', to: '/csr' },
];

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { user } = useAuth();
  const { pathname } = useLocation();

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e8edf1] bg-white/95 shadow-[0_2px_12px_rgba(10,37,64,0.035)] backdrop-blur">
      <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[82px] lg:px-7">
        <Link to="/" aria-label="OceaNova home" className="shrink-0 transition-opacity hover:opacity-85">
          <OceaNovaLogo size="md" />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 text-[9px] font-semibold text-[#10213b] min-[800px]:flex min-[1100px]:gap-4 min-[1100px]:text-[10px] 2xl:gap-5 2xl:text-[11px]">
          {navigation.map(({ label, to }) => {
            const active = (label === 'Home' && pathname === '/') || to === pathname;
            return (
              <Link
                key={label}
                to={to}
                className={`relative whitespace-nowrap py-2 transition-colors hover:text-[#147EA8] ${
                  active ? 'text-[#07549e]' : ''
                }`}
              >
                {label}
                {active && <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded bg-[#147EA8]" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-1 min-[800px]:flex min-[1100px]:gap-2 xl:gap-3">
          <button
            type="button"
            onClick={() => setLang(lang === 'EN' ? 'TE' : 'EN')}
            aria-label="Change language"
            className="inline-flex items-center gap-1 rounded-full border border-[#e5eaee] px-2 py-2 text-[9px] font-semibold text-[#13213a] transition hover:border-[#147EA8] min-[1100px]:gap-1.5 min-[1100px]:px-3 min-[1100px]:text-[10px]"
          >
            <span>{lang === 'EN' ? 'EN | తెలుగు' : 'తెలుగు | EN'}</span>
          </button>
          <Link
            to="/donate"
            className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-[#0759B5] to-[#22B5BD] px-2.5 py-2.5 text-[10px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md min-[1100px]:gap-2 min-[1100px]:px-4 min-[1100px]:text-[11px]"
          >
            Donate
            <Heart className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 min-[800px]:hidden">
          <button
            type="button"
            onClick={() => setLang(lang === 'EN' ? 'TE' : 'EN')}
            aria-label="Change language"
            className="rounded-full border border-[#e5eaee] px-3 py-1.5 text-[11px] font-semibold text-[#13213a]"
          >
            {lang}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="rounded-lg p-2 text-[#0A2540] transition hover:bg-[#E8F6F8]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100vh-74px)] overflow-y-auto border-t border-[#e8edf1] bg-white px-5 pb-6 pt-3 shadow-xl min-[800px]:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navigation.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={closeMobileMenu}
                className="border-b border-gray-100 py-3 text-sm font-semibold text-[#0A2540] transition hover:text-[#147EA8]"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/donate"
              onClick={closeMobileMenu}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0759B5] to-[#22B5BD] py-3 text-sm font-bold text-white"
            >
              {t('donateNow')}
              <Heart className="h-4 w-4" />
            </Link>
            <Link
              to="/admin"
              onClick={closeMobileMenu}
              className="mt-3 text-center text-xs font-semibold text-[#147EA8]"
            >
              {user ? 'Admin dashboard' : 'Portal login'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
