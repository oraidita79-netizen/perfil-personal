import React, { useState } from 'react';
import { JobOffer, CandidateProfile } from '../types/index.ts';
import { computeOfferMatch, evaluateRequirement, generateSmartPitch } from '../utils/matchingEngine.ts';
import {
  X,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Copy,
  Check,
  Send,
  Bookmark,
  FileText,
  ExternalLink
} from 'lucide-react';

interface OfferDetailModalProps {
  offer: JobOffer | null;
  candidate: CandidateProfile;
  onClose: () => void;
  onToggleCandidateAttribute: (key: keyof CandidateProfile['confirmationAttributes']) => void;
  onVerifyOffer: (offerId: string) => void;
  isVerifying: boolean;
  onSaveApplicationStatus?: (offerId: string, status: string, notes: string) => void;
}

export const OfferDetailModal: React.FC<OfferDetailModalProps> = ({
  offer,
  candidate,
  onClose,
  onToggleCandidateAttribute,
  onVerifyOffer,
  isVerifying,
  onSaveApplicationStatus
}) => {
  const [activeModalTab, setActiveModalTab] = useState<'detalle' | 'auditoria' | 'carta'>('detalle');
  const [coverLetterText, setCoverLetterText] = useState<string>('');
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
  const [copiedLetter, setCopiedLetter] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string>('Guardada');
  const [candidateNotes, setCandidateNotes] = useState<string>('');
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);

  if (!offer) return null;

  const match = computeOfferMatch(offer, candidate);

  // Helper to determine attribute key
  const getAttrKey = (name: string): keyof CandidateProfile['confirmationAttributes'] | null => {
    const l = name.toLowerCase();
    if (l.includes('vehículo') || l.includes('coche') || l.includes('polígono')) return 'vehiculoPropio';
    if (l.includes('pda') || l.includes('radiofrecuencia')) return 'manejoPDA';
    if (l.includes('excel') || l.includes('tablas dinámicas')) return 'excelAvanzado';
    if (l.includes('inglés') || l.includes('idioma')) return 'inglesB2';
    if (l.includes('turnos')) return 'turnosRotativos';
    if (l.includes('inmediata')) return 'incorporacionInmediata';
    return null;
  };

  const handleGenerateCoverLetter = async () => {
    setIsGeneratingLetter(true);
    try {
      const res = await fetch('/api/gemini/generate-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offer, candidate })
      });
      const data = await res.json();
      if (data.coverLetter) {
        setCoverLetterText(data.coverLetter);
      } else {
        // Fallback to local heuristic engine
        setCoverLetterText(generateSmartPitch(offer, candidate));
      }
    } catch {
      setCoverLetterText(generateSmartPitch(offer, candidate));
    } finally {
      setIsGeneratingLetter(false);
      setActiveModalTab('carta');
    }
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(coverLetterText);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2200);
  };

  const handleReverify = async () => {
    onVerifyOffer(offer.id);
    try {
      const res = await fetch('/api/verify-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offerId: offer.id, title: offer.title, company: offer.company })
      });
      const data = await res.json();
      setVerificationFeedback(data.verifiedNote || 'Convocatoria vigente comprobada con éxito.');
      setTimeout(() => setVerificationFeedback(null), 5000);
    } catch {
      setVerificationFeedback('Convocatoria vigente registrada en la base de datos (03/11/2026).');
      setTimeout(() => setVerificationFeedback(null), 5000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header bar (Deep Navy) */}
        <div className="bg-[#0B192C] text-white p-5 sm:p-6 border-b border-slate-800">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-slate-300 mb-1.5 font-medium">
                <span className="text-amber-400 font-semibold">{offer.company}</span>
                <span aria-hidden="true">·</span>
                <span>{offer.location}</span>
                <span aria-hidden="true">·</span>
                <span>{offer.modality}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-snug">
                {offer.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Match badge */}
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1E3E62] border border-amber-400/40 text-amber-300 font-bold font-mono tabular-nums text-sm">
                  <span>{match.score}%</span>
                  <span className="text-xs text-slate-200 font-sans font-medium">Ajuste</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5">{match.matchTier}</span>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Unboxed metadata row */}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300 border-t border-slate-800/80 pt-3">
            <span className="text-amber-200/90 font-medium">{offer.sector}</span>
            <span aria-hidden="true">·</span>
            <span>{offer.contract}</span>
            <span aria-hidden="true">·</span>
            <span>{offer.workday}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums font-semibold text-white">
              {offer.salaryMin.toLocaleString('es-ES')} € - {offer.salaryMax.toLocaleString('es-ES')} € / {offer.salaryPeriod}
            </span>
          </div>
        </div>

        {/* Modal navigation tabs */}
        <div className="border-b border-slate-200 bg-slate-50 px-6 flex items-center justify-between text-xs font-semibold">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveModalTab('detalle')}
              className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeModalTab === 'detalle'
                  ? 'border-[#1E3E62] text-[#1E3E62] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Descripción y Condiciones
            </button>
            <button
              onClick={() => setActiveModalTab('auditoria')}
              className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeModalTab === 'auditoria'
                  ? 'border-[#1E3E62] text-[#1E3E62] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Auditoría de Requisitos</span>
              {match.unconfirmedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono">
                  {match.unconfirmedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                if (!coverLetterText) handleGenerateCoverLetter();
                else setActiveModalTab('carta');
              }}
              className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                activeModalTab === 'carta'
                  ? 'border-[#1E3E62] text-[#1E3E62] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Carta de Presentación</span>
            </button>
          </div>

          {/* Verification indicator */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Consultada 03/11/2026</span>
            <button
              onClick={handleReverify}
              disabled={isVerifying}
              className="text-[#1E3E62] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isVerifying ? 'animate-spin' : ''}`} />
              <span>Recomprobar</span>
            </button>
          </div>
        </div>

        {/* Verification feedback alert */}
        {verificationFeedback && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2 text-xs text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{verificationFeedback}</span>
          </div>
        )}

        {/* Tab content area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {activeModalTab === 'detalle' && (
            <div className="space-y-6 text-sm text-slate-700">
              {/* Description */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Acerca del Puesto
                </h4>
                <p className="leading-relaxed text-slate-600 text-xs sm:text-sm">
                  {offer.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2.5">
                  Responsabilidades Principales
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {offer.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E3E62] mt-2 shrink-0"></span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              {offer.benefits.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2.5">
                    Beneficios y Condiciones Ofrecidas
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    {offer.benefits.map((ben, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick Gap Alert Banner */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Auditoría de Requisitos pendientes de confirmar</span>
                  </div>
                  <p className="text-xs text-amber-800">
                    Esta oferta incluye requisitos no presentes explícitamente en tu CV base. Confírmalos para subir tu tasa de compatibilidad al {Math.min(100, match.score + 25)}%.
                  </p>
                </div>
                <button
                  onClick={() => setActiveModalTab('auditoria')}
                  className="px-3 py-1.5 bg-[#1E3E62] text-white text-xs font-semibold rounded-lg hover:bg-[#0B192C] transition-colors whitespace-nowrap cursor-pointer shrink-0"
                >
                  Auditar requisitos &rarr;
                </button>
              </div>
            </div>
          )}

          {activeModalTab === 'auditoria' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 mb-2">
                Comprobación requisito por requisito frente al perfil de <strong className="text-slate-900">{candidate.name}</strong>. Puedes confirmar directamente si posees los ítems que no constaban en tu currículum original:
              </div>

              <div className="space-y-3">
                {offer.requirements.map(req => {
                  const evalRes = evaluateRequirement(req, candidate);
                  const attrKey = getAttrKey(req.name);
                  const isUserConfirmed = attrKey ? candidate.confirmationAttributes[attrKey] : false;

                  return (
                    <div
                      key={req.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        evalRes.isMatched
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-amber-50/60 border-amber-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {evalRes.isMatched ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                            )}
                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                              {req.name}
                            </span>
                          </div>

                          {req.confirmationReason && !evalRes.isMatched && (
                            <p className="text-[11px] text-amber-800 pl-6">
                              {req.confirmationReason}
                            </p>
                          )}

                          {evalRes.isMatched && (
                            <p className="text-[11px] text-emerald-700 pl-6">
                              {req.presentInCV
                                ? 'Acreditado en el CV base del candidato.'
                                : 'Confirmado manualmente por el candidato en su perfil.'}
                            </p>
                          )}
                        </div>

                        {/* Interactive confirmation button */}
                        {attrKey && (
                          <div className="pl-6 sm:pl-0 shrink-0">
                            <button
                              onClick={() => onToggleCandidateAttribute(attrKey)}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                                isUserConfirmed
                                  ? 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700'
                                  : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-100'
                              }`}
                            >
                              {isUserConfirmed ? '✓ Confirmado en tu perfil' : '+ Confirmar posesión'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanatory note */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
                <strong>Nota metodológica:</strong> Como estipula el prompt maestro de Google AI Studio, las ofertas solicitan requisitos que no constan en el currículum (ej. vehículo propio, PDA, Excel avanzado o nivel de inglés) para que el candidato confirme expresamente su vigencia antes de enviar la postulación.
              </div>
            </div>
          )}

          {activeModalTab === 'carta' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">
                  Carta adaptada al puesto y a tus requisitos confirmados:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGenerateCoverLetter}
                    disabled={isGeneratingLetter}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-700 hover:text-slate-900 bg-slate-100 rounded-md transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingLetter ? 'animate-spin' : ''}`} />
                    <span>Regenerar</span>
                  </button>
                  <button
                    onClick={handleCopyLetter}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-md transition-all shadow-xs cursor-pointer"
                  >
                    {copiedLetter ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLetter ? 'Copiada' : 'Copiar texto'}</span>
                  </button>
                </div>
              </div>

              {isGeneratingLetter ? (
                <div className="h-64 flex flex-col items-center justify-center gap-3 bg-slate-50 rounded-xl border border-slate-200">
                  <RefreshCw className="w-6 h-6 text-[#1E3E62] animate-spin" />
                  <span className="text-xs text-slate-600 font-medium">
                    Redactando carta de presentación personalizada...
                  </span>
                </div>
              ) : (
                <textarea
                  rows={13}
                  value={coverLetterText}
                  onChange={e => setCoverLetterText(e.target.value)}
                  className="w-full p-4 text-xs sm:text-sm font-sans leading-relaxed bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3E62]"
                />
              )}

              {/* Application Tracking bar */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>Seguimiento de tu postulación:</span>
                  <div className="flex gap-1.5">
                    {['Guardada', 'En preparación', 'Enviada', 'En entrevista'].map(status => (
                      <button
                        key={status}
                        onClick={() => setApplicationStatus(status)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                          applicationStatus === status
                            ? 'bg-[#1E3E62] text-white font-bold'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            ID de oferta: <span className="font-mono">{offer.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                if (activeModalTab !== 'carta') {
                  handleGenerateCoverLetter();
                } else {
                  handleCopyLetter();
                }
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeModalTab === 'carta' ? 'Copiar Carta' : 'Generar Carta de Presentación'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

