import React, { Suspense, lazy, useState } from 'react';
import { CandidateProfile, JobOffer } from '../types/index.ts';
import { computeOfferMatch } from '../utils/matchingEngine.ts';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Briefcase,
  FileCheck,
  Building2,
  PhoneCall,
  Clock,
  Car,
  ScanBarcode,
  FileSpreadsheet,
  FileText,
  Award,
  Eye,
  EyeOff
} from 'lucide-react';

const Background3D = lazy(() => import('./Background3D.tsx').then(module => ({ default: module.Background3D })));

interface HeroPortadaProps {
  candidate: CandidateProfile;
  offers: JobOffer[];
  onExploreOffers: () => void;
  onOpenAuditMatrix: () => void;
  onOpenRecruiterContact: () => void;
  onOpenOriginalCv?: () => void;
}

export const HeroPortada: React.FC<HeroPortadaProps> = ({
  candidate,
  offers,
  onExploreOffers,
  onOpenAuditMatrix,
  onOpenRecruiterContact,
  onOpenOriginalCv
}) => {
  const matchResults = offers.map(o => computeOfferMatch(o, candidate));
  const avgScore = Math.round(
    matchResults.reduce((acc, curr) => acc + curr.score, 0) / (matchResults.length || 1)
  );
  const publicLocation = candidate.location.toLowerCase().includes('calle')
    ? 'Illescas, Toledo'
    : candidate.location;

  // 3D effect subtle controls
  const [is3dEnabled, setIs3dEnabled] = useState(false);
  const [intensity, setIntensity] = useState<'ultra-suave' | 'suave' | 'moderado'>('suave');

  return (
    <section className="hero-shell relative bg-[#0B192C] text-white overflow-hidden border-b border-slate-800">
      
      {/* 3D Ethereal Background Effect (Three.js particles & soft geometric constellation) */}
      {is3dEnabled && (
        <Suspense fallback={null}>
          <Background3D
            intensity={intensity}
            className="opacity-70 transition-opacity duration-700"
          />
        </Suspense>
      )}

      {/* Subtle gold gradient ambient glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 w-80 h-80 bg-[#1E3E62]/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Employer Hook & Value Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Tagline & 3D Switch */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1E3E62] border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wide">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Dossier Profesional para Empleadores · Selección 2026</span>
              </div>

              {/* Discrete 3D Effect Toggle */}
              <button
                onClick={() => setIs3dEnabled(!is3dEnabled)}
                title={is3dEnabled ? 'Desactivar efecto 3D de fondo' : 'Activar efecto 3D de fondo'}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-700/80 rounded-md transition-colors cursor-pointer"
              >
                <Sparkles className={`w-3 h-3 ${is3dEnabled ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>Fondo 3D: {is3dEnabled ? 'Activo (Suave)' : 'Pausado'}</span>
              </button>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Talento Logístico y Contable con{' '}
              <span className="text-amber-400 underline decoration-amber-400/40 decoration-wavy underline-offset-8">
                Competencias Homologadas
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl text-pretty">
              Conoce el perfil profesional de <strong className="text-white">{candidate.name}</strong> (+20 años de experiencia, incluyendo 10 años como Responsable de Contabilidad y formación reciente en Logística con <span className="text-amber-300 font-medium">Carnet de Carretilla y Carnet de Picking con Radiofrecuencia/PDA 2025</span>). Contrastamos su candidatura frente a {offers.length} ofertas de Illescas y alrededores.
            </p>

            {/* Employer Value Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="hero-proof p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 text-xs font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Carnets Oficiales 2025</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Picking con Radiofrecuencia (PDA) y Carnet de Carretillero homologados recientemente.
                </p>
              </div>

              <div className="hero-proof p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 text-xs font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Incorporación Inmediata</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Disponibilidad inmediata en jornada completa y turnos rotativos para incorporación en 24h.
                </p>
              </div>

              <div className="hero-proof p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 text-xs font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ofertas cerca de Illescas</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Vacantes presenciales en Illescas, seleccionadas para un radio de búsqueda de 30 km.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreOffers}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
              >
                <Briefcase className="w-4 h-4" />
                <span>Explorar {offers.length} ofertas & Ajuste</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenRecruiterContact}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold rounded-xl bg-[#1E3E62] hover:bg-[#254d79] text-white border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Contactar para Entrevista</span>
              </button>

              {onOpenOriginalCv && (
                <button
                  onClick={onOpenOriginalCv}
                  className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Ver CV actualizado</span>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Executive Candidate Spotlight Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="candidate-spotlight relative bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-2xl backdrop-blur-sm">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-200">
                    Candidata Disponible para Contratación
                  </span>
                </div>
                <span className="text-[11px] font-mono tabular-nums text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                  05 Nov 2026
                </span>
              </div>

              {/* Portrait + Core Specs */}
              <div className="flex items-center gap-4 py-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-lg shrink-0 bg-slate-800">
                  <img
                    src={candidate.avatarUrl || '/assets/oraida_photo.jpg'}
                    alt={candidate.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                    {candidate.name}
                  </h3>
                  <p className="text-xs text-amber-300 font-medium mt-0.5 line-clamp-1">
                    {candidate.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 truncate">
                    {publicLocation}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs font-mono tabular-nums text-slate-300">
                    <span className="text-amber-400 font-bold">{candidate.experienceYears}+ años</span> de experiencia
                  </div>
                </div>
              </div>

              {/* Verified Competencies Pill-free row */}
              <div className="bg-[#0B192C] p-3 rounded-xl border border-slate-800/80 space-y-2 mb-4 text-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Titulaciones & Certificaciones Clave:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-200">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Carnet Picking Radiofrecuencia (2025)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Carnet de Carretilla (2025)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Resp. Contabilidad (10 años)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Control Stock e Inventarios</span>
                  </div>
                </div>
              </div>

              {/* Match Score Banner */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#1E3E62] to-[#0B192C] border border-amber-400/40 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-300">Índice de Compatibilidad</div>
                  <div className="text-xs text-amber-400 font-semibold">{offers.length} ofertas cercanas analizadas</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono tabular-nums text-amber-300">
                    {avgScore}%
                  </div>
                  <div className="text-[10px] text-slate-300">Afinidad Global</div>
                </div>
              </div>

              {/* Recruiter Action in Card */}
              <button
                onClick={onOpenRecruiterContact}
                className="w-full mt-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Solicitar Entrevista con {candidate.name.split(' ')[0]}</span>
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Proof & Metrics Strip (Claim-to-Proof Adjacency) */}
      <div className="bg-[#081220] border-t border-slate-800/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-slate-800">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-amber-400">
                +20 Años
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Experiencia Demostrable
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white">
                {offers.length} Ofertas
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Cerca de Illescas · radio 30 km
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-emerald-400">
                Carnets 2025
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Carretilla y Radiofrecuencia
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-amber-400">
                &lt; 24h
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Respuesta a Reclutadores
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
