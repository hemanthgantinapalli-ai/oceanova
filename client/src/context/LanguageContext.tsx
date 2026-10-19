import React, { createContext, useContext, useState } from 'react';

type Language = 'EN' | 'TE';

const translations: Record<Language, Record<string, string>> = {
  EN: {
    heroTagline: "BUILDING INDIA'S BLUE ECONOMY",
    heroSubtitle: "Technology, research and community action for a regenerative blue future.",
    exploreImpact: "Explore Our Impact",
    partnerWithUs: "Partner With Us",
    donateNow: "Donate Now",
    mangroveRestoration: "Mangrove Restoration",
    beneficiaryHouseholds: "Beneficiary Households",
    youthTrained: "Youth Trained",
    carbonAvoided: "tCO2e/yr Avoided",
    threePillars: "OUR THREE PILLARS OF ACTION",
    sahajaTitle: "SAHAJA — Renewable Energy",
    shramaTitle: "SHRAMA — Rural Empowerment",
    sparshaTitle: "SPARSHA — Innovation & Science",
  },
  TE: {
    heroTagline: "భారతదేశ బ్లూ ఎకానమీ నిర్మాణం",
    heroSubtitle: "పునరుత్పత్తి నీలి భవిష్యత్తు కోసం సాంకేతికత, పరిశోధన మరియు సమాజ కార్యాచరణ.",
    exploreImpact: "మా ప్రభావం అన్వేషించండి",
    partnerWithUs: "మాతో భాగస్వామి అవ్వండి",
    donateNow: "విరాళం ఇవ్వండి",
    mangroveRestoration: "మ్యాంగ్రోవ్ పునరుద్ధరణ",
    beneficiaryHouseholds: "లబ్ధిదారుల కుటుంబాలు",
    youthTrained: "శిక్షణ పొందిన యువత",
    carbonAvoided: "కార్బన్ తగ్గింపు (tCO2e/సంవత్సరం)",
    threePillars: "మా మూడు కార్యాచరణ స్తంభాలు",
    sahajaTitle: "సహజ — పునరుత్పాదక ఇంధనం",
    shramaTitle: "శ్రమ — గ్రామీణ సాధికారత",
    sparshaTitle: "స్పర్శ — ఆవిష్కరణ & విజ్ఞానం",
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('EN');

  const t = (key: string): string => {
    return translations[lang][key] || translations['EN'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
