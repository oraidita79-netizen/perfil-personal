import React from 'react';
import { JobOffer, CandidateProfile } from '../types/index.ts';
import { computeOfferMatch, evaluateRequirement } from '../utils/matchingEngine.ts';
import { Check, AlertTriangle, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';

interface OfferTableViewProps {
  offers: JobOffer[];
  candidate: CandidateProfile;
  onSelectOffer: (offer: JobOffer) => void;
  onOpenCoverLetter: (offer: JobOffer) => void;
  onToggleCandidateAttribute: (key: keyof CandidateProfile['confirmationAttributes']) => void;
}

export const OfferTableView: React.FC<OfferTableViewProps> = ({
  offers,
  candidate,
  onSelectOffer,
  onOpenCoverLetter,
  onToggleCandidateAttribute
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Puesto y Empresa</th>
              <th className="py-3 px-3">Sector</th>
              <th className="py-3 px-3">Ubicación / Modalidad</th>
              <th className="py-3 px-3">Salario Anual</th>
              <th className="py-3 px-3 text-center">Ajuste CV</th>
              <th className="py-3 px-3">Requisitos a Confirmar</th>
              <th className="py-3 px-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {offers.map(offer => {
              const match = computeOfferMatch(offer, candidate);
              const pendingReqs = offer.requirements.filter(
                r => evaluateRequirement(r, candidate).isPendingConfirmation
              );

              return (
                <tr
                  key={offer.id}
                  onClick={() => onSelectOffer(offer)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  {/* Puesto y Empresa */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 group-hover:text-[#1E3E62] transition-colors">
                      {offer.title}
                    </div>
                    <div className="text-slate-500 text-[11px] font-medium">
                      {offer.company}
                    </div>
                  </td>

                  {/* Sector */}
                  <td className="py-3.5 px-3 text-slate-700 whitespace-nowrap">
                    {offer.sector}
                  </td>

                  {/* Ubicación y Modalidad */}
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    <div>{offer.location}</div>
                    <span className="text-[11px] text-slate-400">{offer.modality}</span>
                  </td>

                  {/* Salario */}
                  <td className="py-3.5 px-3 font-mono tabular-nums font-semibold text-slate-800 whitespace-nowrap">
                    {offer.salaryMin.toLocaleString('es-ES')} - {offer.salaryMax.toLocaleString('es-ES')} €
                  </td>

                  {/* Ajuste CV */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#0B192C] text-white">
                      <span className="font-mono tabular-nums font-bold text-amber-300">
                        {match.score}%
                      </span>
                    </div>
                  </td>

                  {/* Requisitos a confirmar */}
                  <td className="py-3.5 px-3">
                    {pendingReqs.length === 0 ? (
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 100% verificado
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {pendingReqs.map(r => (
                          <span
                            key={r.id}
                            className="inline-flex items-center gap-1 text-[11px] text-amber-900 bg-amber-50 border border-amber-200/80 rounded px-1.5 py-0.5"
                          >
                            <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                            <span className="truncate max-w-[130px]">{r.name}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* Acciones */}
                  <td className="py-3.5 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenCoverLetter(offer);
                        }}
                        title="Generar carta de presentación con IA"
                        className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onSelectOffer(offer)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#1E3E62] hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                      >
                        <span>Detalles</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
