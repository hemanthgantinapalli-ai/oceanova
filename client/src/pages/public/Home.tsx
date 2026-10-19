import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Cloud,
  Cpu,
  GraduationCap,
  Sprout,
  Trees,
  Users,
  Waves,
  Zap,
} from 'lucide-react';
import { CountUp } from '../../components/ui/CountUp';
import { BeforeAfterSlider } from '../../components/ui/BeforeAfterSlider';
import { CSRImpactCalculator } from '../../components/ui/CSRImpactCalculator';
import { MangroveMap } from '../../components/maps/MangroveMap';
import { useLanguage } from '../../context/LanguageContext';
import { fetchImpactSummary, fetchMangroveSites } from '../../services/api';
import { ImpactSummary, MangroveSite } from '../../types';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [impactData, setImpactData] = useState<ImpactSummary | null>(null);
  const [mangroveSites, setMangroveSites] = useState<MangroveSite[]>([]);

  useEffect(() => {
    fetchImpactSummary().then(setImpactData).catch(console.error);
    fetchMangroveSites().then(setMangroveSites).catch(console.error);
  }, []);

  const summary = impactData || {
    mangrovesRestoredHa: 500,
    householdsReached: 29500,
    youthTrained: 2500,
    carbonAvoidedTons: 3300,
    renewableEnergyKwh: 0,
    inlandWaterwaysKm: 1800,
  };

  const impactStats = [
    {
      icon: Sprout,
      value: summary.mangrovesRestoredHa,
      suffix: '+',
      unit: 'Ha',
      label: 'Mangrove Restoration',
    },
    {
      icon: Users,
      value: summary.householdsReached,
      suffix: '+',
      unit: '',
      label: 'Households Empowered',
    },
    {
      icon: GraduationCap,
      value: summary.youthTrained,
      suffix: '+',
      unit: '',
      label: 'Youth Trained',
    },
    {
      icon: Cloud,
      value: summary.carbonAvoidedTons,
      suffix: '+',
      unit: 'tCO₂e/yr',
      label: 'Avoided',
    },
    {
      icon: Waves,
      value: summary.inlandWaterwaysKm,
      suffix: '',
      unit: 'km',
      label: 'Inland Waterway Network',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-[#0A2540]">
      <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#fff_0%,#f8fcfd_48%,#e8f6f8_100%)]">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(0deg,rgba(56,183,201,0.16),transparent)]" />
        <div className="relative mx-auto grid min-h-[410px] max-w-7xl grid-cols-1 items-center px-5 pb-24 pt-12 sm:px-8 md:min-h-[430px] md:grid-cols-12 md:px-10 md:pb-24 md:pt-10 lg:px-16">
          <div className="relative z-10 md:-translate-y-7 md:col-span-6">
            <h1 className="home-reveal max-w-[470px] font-display text-[2.2rem] font-black uppercase leading-[1.02] tracking-tight text-[#071A2E] sm:text-[2.4rem] lg:text-[3rem] xl:text-[3.4rem]">
              Simple actions.
              <span className="mt-1 block text-[#176D36]">Lasting impact.</span>
            </h1>
            <p className="home-reveal home-reveal-delay-1 mt-4 max-w-[300px] text-sm leading-5 text-[#24364f] sm:text-base">
              Building a sustainable blue economy with clean energy, healthy ecosystems and empowered communities.
            </p>
            <div className="home-reveal home-reveal-delay-2 mt-5 flex flex-wrap items-center gap-3">
              <Link
                to="/impact"
                className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#0759B5] to-[#22B5BD] px-2 py-2 text-[11px] font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg sm:text-xs"
              >
                {t('exploreImpact')}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/csr"
                className="inline-flex items-center justify-center rounded-lg border border-[#317E42] bg-white/90 px-2 py-2 text-[11px] font-bold text-[#193D37] transition hover:bg-[#edf8ef] sm:text-xs"
              >
                {t('partnerWithUs')}
              </Link>
            </div>
          </div>

          <div className="home-hero-media pointer-events-none relative z-0 order-2 -mb-16 mt-2 h-[245px] w-full md:absolute md:inset-y-0 md:order-none md:right-[-5%] md:mb-0 md:mt-0 md:h-auto md:w-[63%]">
            <video
              className="home-hero-video absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              <source src="/oceanova-background.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section aria-label="Our impact at a glance" className="relative z-10 -mt-[68px] px-4 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[960px] grid-cols-2 rounded-[22px] border border-white bg-white/95 px-4 py-4 shadow-[0_12px_36px_rgba(10,37,64,0.12)] backdrop-blur sm:grid-cols-3 sm:px-6 lg:grid-cols-5">
          {impactStats.map(({ icon: Icon, value, suffix, unit, label }, index) => (
            <div
              key={label}
              className={`home-stat flex min-h-[76px] items-center gap-3 px-2 py-2 sm:px-4 ${
                index > 0 ? 'lg:border-l lg:border-[#dce5ed]' : ''
              } ${index === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              <Icon className="h-8 w-8 shrink-0 text-[#138146] sm:h-9 sm:w-9" strokeWidth={1.8} />
              <div className="min-w-0">
                <div className="whitespace-nowrap text-lg font-extrabold leading-tight text-[#087965] sm:text-xl">
                  <CountUp end={value} suffix={suffix} />
                  {unit && <span className="ml-1 text-xs font-bold sm:text-sm">{unit}</span>}
                </div>
                <div className="mt-1 text-[11px] leading-4 text-[#25364b] sm:text-xs">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pillars" className="bg-white px-4 pb-14 pt-7 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[960px]">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#2085b7]" />
            <h2 className="font-display text-lg font-extrabold tracking-[0.08em] text-[#102b56] sm:text-xl">
              OUR THREE PILLARS
            </h2>
            <span className="h-px w-10 bg-[#2085b7]" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="home-pillar-card flex min-h-[140px] items-center gap-4 rounded-2xl border border-[#d8e5ee] bg-[linear-gradient(135deg,#f4faff,#fff)] p-4 shadow-[0_6px_18px_rgba(10,37,64,0.06)] transition hover:-translate-y-1 hover:shadow-lg sm:p-5">
              <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#22a1c6] to-[#07507e] text-white shadow-md">
                <Zap className="h-10 w-10" strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-[#145080]">SAHAJA</h3>
                <p className="mt-1 text-[10px] leading-4 text-[#1d2d42]">
                  Renewable energy, sustainable systems and blue carbon for a regenerative planet.
                </p>
                <Link to="/workstreams?pillar=SAHAJA" className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#0759b5] hover:underline">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>

            <article className="home-pillar-card home-pillar-delay-1 flex min-h-[140px] items-center gap-4 rounded-2xl border border-[#d9e8df] bg-[linear-gradient(135deg,#f5fbf6,#fff)] p-4 shadow-[0_6px_18px_rgba(10,37,64,0.06)] transition hover:-translate-y-1 hover:shadow-lg sm:p-5">
              <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#78c543] to-[#056532] text-white shadow-md">
                <Trees className="h-10 w-10" strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-[#26722f]">SHRAMA</h3>
                <p className="mt-1 text-[10px] leading-4 text-[#1d2d42]">
                  Empowering rural communities through sustainable livelihoods and technology.
                </p>
                <Link to="/workstreams?pillar=SHRAMA" className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#26722f] hover:underline">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>

            <article className="home-pillar-card home-pillar-delay-2 flex min-h-[140px] items-center gap-4 rounded-2xl border border-[#d8e5ee] bg-[linear-gradient(135deg,#f4faff,#fff)] p-4 shadow-[0_6px_18px_rgba(10,37,64,0.06)] transition hover:-translate-y-1 hover:shadow-lg sm:p-5">
              <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3eb9d2] to-[#05618c] text-white shadow-md">
                <Cpu className="h-10 w-10" strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-[#087398]">SPARSHA</h3>
                <p className="mt-1 text-[10px] leading-4 text-[#1d2d42]">
                  Innovation, education and technology driving the blue economy of tomorrow.
                </p>
                <Link to="/workstreams?pillar=SPARSHA" className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#0759b5] hover:underline">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#0A2540] px-4 py-14 text-white sm:px-8">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <span className="rounded-full border border-[#38B7C9]/30 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#38B7C9]">
            Our Vision
          </span>
          <h2 className="font-display text-2xl font-bold text-white sm:text-4xl">
            The blue economy is not the future. It is happening now.
          </h2>
          <p className="text-sm leading-relaxed text-gray-200 sm:text-base">
            OceaNova Blue Economy Foundation unifies clean marine technology, estuarine mangrove restoration, research and coastal community partnerships into a simple, effective regeneration model.
          </p>
        </div>
      </section>

      <section className="bg-[#E8F6F8] px-4 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <span className="rounded-full border border-[#43A047]/30 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#26722f]">
              Restoration Comparison
            </span>
            <h2 className="text-3xl font-bold text-[#0A2540]">Coringa Mangrove Bio-Shield</h2>
            <p className="text-sm text-gray-700">
              Drag the slider to compare baseline mudflats against restored mangrove bio-barriers.
            </p>
            <Link to="/mangroves" className="inline-flex items-center gap-2 rounded-full bg-[#147EA8] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#0A2540]">
              View All Restoration Sites <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
              afterImage="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80"
              beforeLabel="Baseline"
              afterLabel="Restored"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="rounded-full border border-[#38B7C9]/30 bg-[#E8F6F8] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#147EA8]">
                Geospatial Deployment Map
              </span>
              <h2 className="mt-3 text-3xl font-bold text-[#0A2540]">Active Field Operations Map</h2>
            </div>
            <Link to="/impact" className="text-xs font-bold text-[#147EA8] hover:underline">View Analytics</Link>
          </div>
          <MangroveMap sites={mangroveSites} />
        </div>
      </section>

      <section className="bg-[#F1F5F9] px-4 py-16 sm:px-8">
        <CSRImpactCalculator />
      </section>

      <section className="bg-[#0A2540] px-4 py-14 text-center text-white sm:px-8">
        <div className="mx-auto max-w-2xl space-y-5">
          <h2 className="text-3xl font-bold text-white">Support India&apos;s Blue Economy</h2>
          <p className="text-sm text-gray-200">
            Your contributions directly fund mangrove restoration and youth scholarships.
          </p>
          <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-[#147EA8] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#38B7C9]">
            Donate Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
