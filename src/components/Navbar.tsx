import React from 'react';
import { Briefcase, FileText, CheckSquare, Code2, UserCheck, Sparkles, PhoneCall, Lock, Unlock } from 'lucide-react';

interface NavbarProps {
  activeTab: 'portada' | 'ofertas' | 'cv' | 'matriz' | 'semilla';
  setActiveTab: (tab: 'portada' | 'ofertas' | 'cv' | 'matriz' | 'semilla') => void;
  candidateName: string;
  onOpenCvModal: () => void;
  onOpenRecruiterContact: () => void;
  isPrivateUnlocked: boolean;
  onOpenPrivacyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  candidateName,
  onOpenCvModal,
  onOpenRecruiterContact,
  isPrivateUnlocked,
  onOpenPrivacyModal
}) => {
  const handleNavClick = (tab: 'portada' | 'ofertas' | 'cv' | 'matriz' | 'semilla') => {
    if (tab !== 'portada' && !isPrivateUnlocked) {
      onOpenPrivacyModal();
      return;
    }
    setActiveTab(tab);
  };

  return (
    <header className="site-header sticky top-0 z-40 bg-[#0B192C]/95 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Single element wordmark in display face */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1E3E62] to-[#0B192C] border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <button
              onClick={() => setActiveTab('portada')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
                Talent<span className="text-amber-400">Navy</span>
              </span>
            </button>
          </div>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('portada')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
                activeTab === 'portada'
                  ? 'text-amber-400 border-amber-400 font-semibold'
                  : 'border-transparent text-slate-300'
              }`}
            >
              Portada & Perfil
            </button>

            <button
              onClick={() => handleNavClick('ofertas')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer flex items-center gap-1 ${
                activeTab === 'ofertas'
                  ? 'text-amber-400 border-amber-400 font-semibold'
                  : 'border-transparent text-slate-300'
              }`}
            >
              <span>Ofertas (10)</span>
              {!isPrivateUnlocked && <Lock className="w-3 h-3 text-amber-400/80" />}
            </button>

            <button
              onClick={() => handleNavClick('cv')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer flex items-center gap-1 ${
                activeTab === 'cv'
                  ? 'text-amber-400 border-amber-400 font-semibold'
                  : 'border-transparent text-slate-300'
              }`}
            >
              <span>Auditoría de CV</span>
              {!isPrivateUnlocked && <Lock className="w-3 h-3 text-amber-400/80" />}
            </button>

            <button
              onClick={() => handleNavClick('matriz')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer flex items-center gap-1 ${
                activeTab === 'matriz'
                  ? 'text-amber-400 border-amber-400 font-semibold'
                  : 'border-transparent text-slate-300'
              }`}
            >
              <span>Matriz Requisitos</span>
              {!isPrivateUnlocked && <Lock className="w-3 h-3 text-amber-400/80" />}
            </button>

            <button
              onClick={() => handleNavClick('semilla')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer flex items-center gap-1 ${
                activeTab === 'semilla'
                  ? 'text-amber-400 border-amber-400 font-semibold'
                  : 'border-transparent text-slate-300'
              }`}
            >
              <span>JSON & Prompt</span>
              {!isPrivateUnlocked && <Lock className="w-3 h-3 text-amber-400/80" />}
            </button>
          </nav>

          {/* Zone 3: Privacy Mode Toggle & Recruiter Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Privacy Lock pill */}
            <button
              onClick={onOpenPrivacyModal}
              title={isPrivateUnlocked ? 'Privacidad: Acceso desbloqueado' : 'Privacidad: Modo público para empleadores activo'}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                isPrivateUnlocked
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              {isPrivateUnlocked ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Modo Privado: Desbloqueado</span>
                  <span className="sm:hidden">Total</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Modo Público</span>
                  <span className="sm:hidden">Público</span>
                </>
              )}
            </button>

            {/* Recruiter contact button */}
            <button
              onClick={onOpenRecruiterContact}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 active:scale-95 transition-all shadow-sm whitespace-nowrap cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contactar Empleador</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden border-t border-slate-800 bg-[#0B192C]/90 px-4 py-2 flex items-center justify-around text-xs">
        <button
          onClick={() => setActiveTab('portada')}
          className={`px-2 py-1 rounded cursor-pointer ${activeTab === 'portada' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          Portada
        </button>
        <button
          onClick={() => handleNavClick('ofertas')}
          className={`px-2 py-1 rounded cursor-pointer flex items-center gap-1 ${activeTab === 'ofertas' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          <span>Ofertas</span>
          {!isPrivateUnlocked && <Lock className="w-2.5 h-2.5 text-amber-400" />}
        </button>
        <button
          onClick={() => handleNavClick('cv')}
          className={`px-2 py-1 rounded cursor-pointer flex items-center gap-1 ${activeTab === 'cv' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          <span>CV</span>
          {!isPrivateUnlocked && <Lock className="w-2.5 h-2.5 text-amber-400" />}
        </button>
        <button
          onClick={() => handleNavClick('matriz')}
          className={`px-2 py-1 rounded cursor-pointer flex items-center gap-1 ${activeTab === 'matriz' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          <span>Matriz</span>
          {!isPrivateUnlocked && <Lock className="w-2.5 h-2.5 text-amber-400" />}
        </button>
        <button
          onClick={() => handleNavClick('semilla')}
          className={`px-2 py-1 rounded cursor-pointer flex items-center gap-1 ${activeTab === 'semilla' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
        >
          <span>JSON</span>
          {!isPrivateUnlocked && <Lock className="w-2.5 h-2.5 text-amber-400" />}
        </button>
      </div>
    </header>
  );
};

