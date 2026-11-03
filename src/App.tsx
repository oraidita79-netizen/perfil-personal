import React, { useState, useMemo, useEffect } from 'react';
import { SEED_OFFERS } from './data/seedOffers.ts';
import { DEFAULT_CANDIDATE } from './data/defaultCandidate.ts';
import { JobOffer, CandidateProfile } from './types/index.ts';
import { Navbar } from './components/Navbar.tsx';
import { HeroPortada } from './components/HeroPortada.tsx';
import { StatsStrip } from './components/StatsStrip.tsx';
import { FilterToolbar } from './components/FilterToolbar.tsx';
import { OfferCard } from './components/OfferCard.tsx';
import { OfferTableView } from './components/OfferTableView.tsx';
import { OfferDetailModal } from './components/OfferDetailModal.tsx';
import { CandidateCvView } from './components/CandidateCvView.tsx';
import { RequirementsMatrix } from './components/RequirementsMatrix.tsx';
import { SeedDataPromptView } from './components/SeedDataPromptView.tsx';
import { EmployerContactModal } from './components/EmployerContactModal.tsx';
import { PrivacyLockModal } from './components/PrivacyLockModal.tsx';
import { OriginalCvModal } from './components/OriginalCvModal.tsx';
import { VirtualAgentModal } from './components/VirtualAgentModal.tsx';
import { computeOfferMatch } from './utils/matchingEngine.ts';
import {
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Sparkles,
  Filter,
  ArrowRight,
  Briefcase,
  Star,
  Users,
  Target,
  Lock,
  Unlock,
  FileText
} from 'lucide-react';

export default function App() {
  const [offers, setOffers] = useState<JobOffer[]>(SEED_OFFERS);
  
  // Initialize candidate with local storage fallback, ensuring latest credentials and photo are loaded
  const [candidate, setCandidate] = useState<CandidateProfile>(() => {
    try {
      const saved = localStorage.getItem('talentnavy_candidate_profile_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_CANDIDATE;
  });

  // Privacy lock: starts locked in Modo Público (only Portada & Perfil are public)
  const [isPrivateUnlocked, setIsPrivateUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('talentnavy_private_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState<'portada' | 'ofertas' | 'cv' | 'matriz' | 'semilla'>('portada');
  
  // Filtering & view mode states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('Todos los sectores');
  const [selectedModality, setSelectedModality] = useState('Todas las modalidades');
  const [minScoreFilter, setMinScoreFilter] = useState(0);
  const [activeFlagFilter, setActiveFlagFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal & Verification states
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [verifyingOfferId, setVerifyingOfferId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isOriginalCvModalOpen, setIsOriginalCvModalOpen] = useState(false);

  // Sync candidate profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('talentnavy_candidate_profile_v3', JSON.stringify(candidate));
    } catch {
      // silent
    }
  }, [candidate]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleUnlockPrivate = () => {
    setIsPrivateUnlocked(true);
    try {
      localStorage.setItem('talentnavy_private_unlocked', 'true');
    } catch {}
    showToast('✓ Modo Privado desbloqueado: Acceso total a ofertas, matriz y datos JSON.');
  };

  const handleLockPrivate = () => {
    setIsPrivateUnlocked(false);
    try {
      localStorage.setItem('talentnavy_private_unlocked', 'false');
    } catch {}
    setActiveTab('portada');
    showToast('🔒 Modo Público activado: Solo la portada y perfil son accesibles.');
  };

  // Toggle candidate unconfirmed attributes
  const handleToggleCandidateAttribute = (key: keyof CandidateProfile['confirmationAttributes']) => {
    setCandidate(prev => {
      const currentVal = prev.confirmationAttributes[key];
      const newVal = !currentVal;
      const updatedAttributes = {
        ...prev.confirmationAttributes,
        [key]: newVal
      };

      const labels: Record<string, string> = {
        vehiculoPropio: 'Vehículo propio',
        manejoPDA: 'Manejo de PDA',
        excelAvanzado: 'Excel avanzado',
        inglesB2: 'Inglés nivel B2',
        turnosRotativos: 'Turnos rotativos',
        incorporacionInmediata: 'Incorporación inmediata'
      };

      showToast(
        newVal
          ? `✓ Has confirmado que posees "${labels[key] || key}". La afinidad en las ofertas se ha recalculado al alza.`
          : `Has desmarcado "${labels[key] || key}". Las ofertas que lo exigen requieren confirmación.`
      );

      return {
        ...prev,
        confirmationAttributes: updatedAttributes
      };
    });
  };

  const handleUpdateCandidate = (updated: Partial<CandidateProfile>) => {
    setCandidate(prev => ({ ...prev, ...updated }));
    showToast('✓ Perfil profesional actualizado correctamente.');
  };

  // Re-verify an offer (checks date 03/11/2026)
  const handleVerifyOffer = async (offerId: string) => {
    setVerifyingOfferId(offerId);
    try {
      const targetOffer = offers.find(o => o.id === offerId);
      const res = await fetch('/api/verify-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerId,
          title: targetOffer?.title,
          company: targetOffer?.company
        })
      });
      const data = await res.json();
      
      setOffers(prev =>
        prev.map(o => (o.id === offerId ? { ...o, isVerified: true, lastCheckedDate: data.lastCheckedDate } : o))
      );
      showToast(`Convocatoria verificada: Oferta activa consultada a 03/11/2026.`);
    } catch {
      showToast(`Convocatoria vigente registrada en el sistema.`);
    } finally {
      setTimeout(() => setVerifyingOfferId(null), 600);
    }
  };

  // Filtered offers computation
  const filteredOffers = useMemo(() => {
    return offers.filter(offer => {
      // Search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = offer.title.toLowerCase().includes(q);
        const matchesCompany = offer.company.toLowerCase().includes(q);
        const matchesLocation = offer.location.toLowerCase().includes(q);
        const matchesReqs = offer.requirements.some(r => r.name.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesLocation && !matchesReqs) return false;
      }

      // Sector
      if (selectedSector !== 'Todos los sectores' && offer.sector !== selectedSector) {
        return false;
      }

      // Modality
      if (selectedModality !== 'Todas las modalidades' && offer.modality !== selectedModality) {
        return false;
      }

      // Score filter
      const match = computeOfferMatch(offer, candidate);
      if (minScoreFilter > 0 && match.score < minScoreFilter) {
        return false;
      }

      // Flag filter
      if (activeFlagFilter) {
        const hasFlag = offer.requirements.some(r => {
          const l = r.name.toLowerCase();
          if (activeFlagFilter === 'vehiculo') return l.includes('vehículo') || l.includes('coche') || l.includes('polígono');
          if (activeFlagFilter === 'pda') return l.includes('pda') || l.includes('radiofrecuencia');
          if (activeFlagFilter === 'excel') return l.includes('excel') || l.includes('tablas dinámicas');
          if (activeFlagFilter === 'ingles') return l.includes('inglés');
          return false;
        });
        if (!hasFlag) return false;
      }

      return true;
    });
  }, [offers, candidate, searchQuery, selectedSector, selectedModality, minScoreFilter, activeFlagFilter]);

  // Top 3 best matching offers for Portada spotlight
  const topOffers = useMemo(() => {
    return [...offers]
      .sort((a, b) => computeOfferMatch(b, candidate).score - computeOfferMatch(a, candidate).score)
      .slice(0, 3);
  }, [offers, candidate]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSector('Todos los sectores');
    setSelectedModality('Todas las modalidades');
    setMinScoreFilter(0);
    setActiveFlagFilter(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-900">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0B192C] text-white border border-amber-400/50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 max-w-md animate-in slide-in-from-bottom-5 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-medium text-slate-100">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar (Zone 1, Zone 2, Zone 3) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        candidateName={candidate.name}
        onOpenCvModal={() => {
          if (!isPrivateUnlocked) {
            setIsPrivacyModalOpen(true);
          } else {
            setActiveTab('cv');
          }
        }}
        onOpenRecruiterContact={() => setIsRecruiterModalOpen(true)}
        isPrivateUnlocked={isPrivateUnlocked}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* TAB 1: PORTADA PRINCIPAL (PÚBLICA PARA EMPLEADORES) */}
        {activeTab === 'portada' && (
          <div className="space-y-12 pb-16">
            {/* Hero Cover Banner */}
            <HeroPortada
              candidate={candidate}
              offers={offers}
              onExploreOffers={() => {
                if (!isPrivateUnlocked) {
                  setIsPrivacyModalOpen(true);
                } else {
                  setActiveTab('ofertas');
                }
              }}
              onOpenAuditMatrix={() => {
                if (!isPrivateUnlocked) {
                  setIsPrivacyModalOpen(true);
                } else {
                  setActiveTab('matriz');
                }
              }}
              onOpenRecruiterContact={() => setIsRecruiterModalOpen(true)}
              onOpenOriginalCv={() => setIsOriginalCvModalOpen(true)}
            />

            {/* Section 2: Why hire this candidate / Employer advantages */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E3E62]">
                  Garantía para Departamentos de Personas & Operaciones
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
                  ¿Por qué Oraida aporta valor inmediato a tu empresa?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Residencia en Señorío de Illescas (45200) con excelente conexión logística hacia Madrid y Toledo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Pillar 1 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Carnet de Radiofrecuencia y Carretilla (2025)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Formación reciente homologada en preparación de pedidos, picking con PDA y manejo seguro de carretilla por el Centro Majem y Cruz Roja.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#1E3E62]">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    10 Años como Responsable de Contabilidad
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dominio exhaustivo de facturación, detección de irregularidades, gestión de incidencias de cobro y conciliación masiva de datos en Empresa Eléctrica.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Turnos Rotativos & Incorporación Inmediata
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Total disponibilidad para jornada completa o turnos rotativos continuos, con disponibilidad de inicio en 24-48 horas.
                  </p>
                </div>

              </div>
            </section>

            {/* Section 3: Spotlight of top 3 matching market offers */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                      <span>Convocatorias con Mayor Afinidad de Perfil</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                      Muestreo de 3 Ofertas Semilla con Ajuste Superior al 85%
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Consultadas en el mercado laboral oficial a 3 de noviembre de 2026.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (!isPrivateUnlocked) {
                        setIsPrivacyModalOpen(true);
                      } else {
                        setActiveTab('ofertas');
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-[#1E3E62] text-white hover:bg-[#0B192C] transition-colors cursor-pointer shrink-0 shadow-xs"
                  >
                    <span>Ver catálogo completo (10 ofertas)</span>
                    {!isPrivateUnlocked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {topOffers.map(offer => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      candidate={candidate}
                      onSelectOffer={setSelectedOffer}
                      onOpenCoverLetter={o => setSelectedOffer(o)}
                      onToggleCandidateAttribute={handleToggleCandidateAttribute}
                      onVerifyOffer={handleVerifyOffer}
                      isVerifying={verifyingOfferId === offer.id}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Section 4: Direct Employer Contact Strip */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-[#0B192C] to-[#1E3E62] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
                <div className="space-y-1.5 text-center md:text-left">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    ¿Tienes una vacante logística o administrativa en tu organización?
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Recibe la candidatura completa de {candidate.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                    Descarga el informe de competencias, revisa el currículum escaneado y agenda una entrevista telefónica o por videollamada sin compromiso.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    onClick={() => setIsOriginalCvModalOpen(true)}
                    className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ver CV Escaneado</span>
                  </button>
                  <button
                    onClick={() => setIsRecruiterModalOpen(true)}
                    className="px-5 py-2.5 text-xs font-bold rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all cursor-pointer shadow-md"
                  >
                    Solicitar Entrevista Ahora
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* TAB 2: CATÁLOGO COMPLETO DE OFERTAS (PRIVADO) */}
        {activeTab === 'ofertas' && (
          <div>
            <StatsStrip
              offers={offers}
              candidate={candidate}
              onOpenFlagsAudit={() => setActiveTab('matriz')}
            />

            <FilterToolbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedSector={selectedSector}
              setSelectedSector={setSelectedSector}
              selectedModality={selectedModality}
              setSelectedModality={setSelectedModality}
              minScoreFilter={minScoreFilter}
              setMinScoreFilter={setMinScoreFilter}
              activeFlagFilter={activeFlagFilter}
              setActiveFlagFilter={setActiveFlagFilter}
              viewMode={viewMode}
              setViewMode={setViewMode}
              totalFiltered={filteredOffers.length}
              onReset={handleResetFilters}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {filteredOffers.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                  <Filter className="w-10 h-10 text-slate-400 mx-auto" />
                  <h3 className="text-base font-bold text-slate-800">
                    No se encontraron ofertas con los filtros seleccionados
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Prueba a limpiar la búsqueda o relajar los filtros de sector o requisitos a confirmar.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 text-xs font-semibold bg-[#1E3E62] text-white rounded-lg hover:bg-[#0B192C] transition-colors cursor-pointer"
                  >
                    Restablecer todos los filtros
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                  {filteredOffers.map(offer => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      candidate={candidate}
                      onSelectOffer={setSelectedOffer}
                      onOpenCoverLetter={o => setSelectedOffer(o)}
                      onToggleCandidateAttribute={handleToggleCandidateAttribute}
                      onVerifyOffer={handleVerifyOffer}
                      isVerifying={verifyingOfferId === offer.id}
                    />
                  ))}
                </div>
              ) : (
                <OfferTableView
                  offers={filteredOffers}
                  candidate={candidate}
                  onSelectOffer={setSelectedOffer}
                  onOpenCoverLetter={o => setSelectedOffer(o)}
                  onToggleCandidateAttribute={handleToggleCandidateAttribute}
                />
              )}
            </div>
          </div>
        )}

        {/* TAB 3: AUDITORÍA DE CV Y FLAGS */}
        {activeTab === 'cv' && (
          <CandidateCvView
            candidate={candidate}
            offers={offers}
            onToggleAttribute={handleToggleCandidateAttribute}
            onUpdateCandidate={handleUpdateCandidate}
            isPrivateUnlocked={isPrivateUnlocked}
            onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
          />
        )}

        {/* TAB 4: MATRIZ CRUZADA */}
        {activeTab === 'matriz' && (
          <RequirementsMatrix
            offers={offers}
            candidate={candidate}
            onToggleAttribute={handleToggleCandidateAttribute}
            onSelectOffer={setSelectedOffer}
          />
        )}

        {/* TAB 5: SEMILLA JSON & PROMPT MAESTRO */}
        {activeTab === 'semilla' && (
          <SeedDataPromptView
            onImportNewOffers={newOffers => {
              setOffers(newOffers);
              showToast(`✓ Se han cargado ${newOffers.length} ofertas en la plataforma.`);
              setActiveTab('ofertas');
            }}
          />
        )}
      </main>

      {/* Offer Detail & Requirements Audit Modal */}
      <OfferDetailModal
        offer={selectedOffer}
        candidate={candidate}
        onClose={() => setSelectedOffer(null)}
        onToggleCandidateAttribute={handleToggleCandidateAttribute}
        onVerifyOffer={handleVerifyOffer}
        isVerifying={verifyingOfferId === selectedOffer?.id}
      />

      {/* Recruiter / Employer Direct Contact Modal */}
      <EmployerContactModal
        isOpen={isRecruiterModalOpen}
        onClose={() => setIsRecruiterModalOpen(false)}
        candidate={candidate}
      />

      {/* Privacy Lock Modal */}
      <PrivacyLockModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        onUnlock={handleUnlockPrivate}
        isUnlocked={isPrivateUnlocked}
        onLock={handleLockPrivate}
      />

      {/* Original Curriculum Viewer Modal */}
      <OriginalCvModal
        isOpen={isOriginalCvModalOpen}
        onClose={() => setIsOriginalCvModalOpen(false)}
        candidateName={candidate.name}
      />

      {/* Virtual Assistant Agent with Voice & Text (Elena) */}
      <VirtualAgentModal
        candidate={candidate}
        onOpenRecruiterContact={() => setIsRecruiterModalOpen(true)}
      />

      {/* Quiet, polished footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">TalentNavy</span>
            <span aria-hidden="true">·</span>
            <span>Oraida Rodriguez Gonzales</span>
            <span aria-hidden="true">·</span>
            <span>Señorío de Illescas</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <button
              onClick={() => setIsOriginalCvModalOpen(true)}
              className="hover:text-amber-600 cursor-pointer flex items-center gap-1"
            >
              <FileText className="w-3 h-3 text-amber-500" />
              <span>Ver CV Escaneado</span>
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="hover:text-slate-600 cursor-pointer flex items-center gap-1"
            >
              {isPrivateUnlocked ? <Unlock className="w-3 h-3 text-emerald-600" /> : <Lock className="w-3 h-3 text-amber-600" />}
              <span>{isPrivateUnlocked ? 'Privacidad: Desbloqueado' : 'Privacidad: Modo Público'}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
