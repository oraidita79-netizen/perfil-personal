import React, { useState } from 'react';
import { JobOffer, CandidateProfile } from '../types/index.ts';
import { computeOfferMatch, evaluateRequirement } from '../utils/matchingEngine.ts';
import {
  MapPin,
  Building2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface OfferCardProps {
  offer: JobOffer;
  candidate: CandidateProfile;
  onSelectOffer: (offer: JobOffer) => void;
  onOpenCoverLetter: (offer: JobOffer) => void;
  onToggleCandidateAttribute: (key: keyof CandidateProfile['confirmationAttributes']) => void;
  onVerifyOffer: (offerId: string) => void;
  isVerifying?: boolean;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  candidate,
  onSelectOffer,
  onOpenCoverLetter,
  onToggleCandidateAttribute,
  onVerifyOffer,
  isVerifying = false
}) => {
  const matchResult = computeOfferMatch(offer, candidate);
  const [copiedLink, setCopiedLink] = useState(false);

  // Group requirements
  const matchedReqs = offer.requirements.filter(r => evaluateRequirement(r, candidate).isMatched);
  const pendingReqs = offer.requirements.filter(r => evaluateRequirement(r, candidate).isPendingConfirmation);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(offer.sourceUrl || window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Helper to determine which quick attribute toggle corresponds to a pending requirement
  const getAttributeKeyForReq = (reqName: string): keyof CandidateProfile['confirmationAttributes'] | null => {
    const l = reqName.toLowerCase();
    if (l.includes('vehículo') || l.includes('coche') || l.includes('polígono')) return 'vehiculoPropio';
    if (l.includes('pda') || l.includes('radiofrecuencia')) return 'manejoPDA';
    if (l.includes('excel') || l.includes('tablas dinámicas')) return 'excelAvanzado';
    if (l.includes('inglés') || l.includes('idioma')) return 'inglesB2';
    if (l.includes('turnos')) return 'turnosRotativos';
    if (l.includes('inmediata')) return 'incorporacionInmediata';
    return null;
  };

  return (
    <div
      onClick={() => onSelectOffer(offer)}
      className="offer-card group relative bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-xl p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      {/* Top row: Company, Location, and Match Score Badge */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="text-slate-800 font-semibold flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              {offer.company}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {offer.location}
            </span>
            <span aria-hidden="true">·</span>
            <span>{offer.modality}</span>
          </div>

          {/* Match Score Badge (Gold & Navy) */}
          <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B192C] text-white shadow-xs">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <span className="text-xs font-bold font-mono tabular-nums text-amber-300">
              {matchResult.score}%
            </span>
            <span className="text-[10px] text-slate-300 hidden sm:inline">
              {matchResult.matchTier}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1E3E62] transition-colors leading-snug mb-2">
          {offer.title}
        </h3>

        {/* Quiet unboxed metadata: Sector, contract, workday, salary */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-slate-500 mb-3.5">
          <span className="font-medium text-slate-700">{offer.sector}</span>
          <span aria-hidden="true">·</span>
          <span>{offer.contract}</span>
          <span aria-hidden="true">·</span>
          <span>{offer.workday}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums font-semibold text-slate-900">
            {offer.salaryMin.toLocaleString('es-ES')} € - {offer.salaryMax.toLocaleString('es-ES')} € / {offer.salaryPeriod}
          </span>
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {offer.description}
        </p>

        {/* Requirements audit summary */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 mb-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Auditoría de Requisitos vs CV:</span>
            <span className="text-[11px] font-mono tabular-nums text-slate-500">
              {matchedReqs.length} de {offer.requirements.length} cumplidos
            </span>
          </div>

          {/* Matched requirements snippet */}
          <div className="space-y-1 text-xs">
            {matchedReqs.slice(0, 2).map(r => (
              <div key={r.id} className="flex items-start gap-1.5 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="truncate">{r.name}</span>
              </div>
            ))}

            {/* Pending unconfirmed requirements highlight */}
            {pendingReqs.map(r => {
              const attrKey = getAttributeKeyForReq(r.name);
              return (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-2 p-1.5 rounded bg-amber-50/80 border border-amber-200/60 text-amber-900"
                >
                  <div className="flex items-start gap-1.5 min-w-0">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="truncate">
                      <span className="font-medium">{r.name}</span>
                      <span className="text-[10px] text-amber-700 block truncate">
                        (No consta en CV base · Requiere confirmación)
                      </span>
                    </div>
                  </div>

                  {attrKey && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCandidateAttribute(attrKey);
                      }}
                      title="Haz clic para confirmar que sí dispones de este requisito en tu perfil"
                      className="px-2 py-0.5 text-[10px] font-semibold bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 rounded transition-colors shrink-0 shadow-xs cursor-pointer whitespace-nowrap"
                    >
                      Confirmar
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card footer: Verification stamp + Action buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
        
        {/* Verification indicator */}
        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Vigente al 03/11/2026</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onVerifyOffer(offer.id);
            }}
            disabled={isVerifying}
            title="Comprobar vigencia de este anuncio de empleo"
            className="p-1 hover:text-[#1E3E62] transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
          >
            <RefreshCw className={`w-3 h-3 ${isVerifying ? 'animate-spin text-amber-600' : ''}`} />
          </button>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenCoverLetter(offer);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
            title="Generar carta de presentación a medida para esta oferta"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Carta</span>
          </button>

          <button
            onClick={() => onSelectOffer(offer)}
            className="inline-flex items-center gap-1 px-3 py-1 font-semibold text-white bg-[#1E3E62] hover:bg-[#0B192C] rounded-md transition-colors shadow-xs cursor-pointer"
          >
            <span>Ver oferta</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

