import React from 'react';
import { JobOffer, CandidateProfile } from '../types/index.ts';
import { computeOfferMatch } from '../utils/matchingEngine.ts';
import {
  Car,
  ScanBarcode,
  FileSpreadsheet,
  Globe,
  Clock,
  Sparkles,
  Check,
  AlertCircle,
  X,
  ExternalLink
} from 'lucide-react';

interface RequirementsMatrixProps {
  offers: JobOffer[];
  candidate: CandidateProfile;
  onToggleAttribute: (key: keyof CandidateProfile['confirmationAttributes']) => void;
  onSelectOffer: (offer: JobOffer) => void;
}

export const RequirementsMatrix: React.FC<RequirementsMatrixProps> = ({
  offers,
  candidate,
  onToggleAttribute,
  onSelectOffer
}) => {
  const flagsConfig = [
    {
      key: 'vehiculoPropio' as const,
      label: 'Vehículo Propio',
      icon: Car,
      isUserConfirmed: candidate.confirmationAttributes.vehiculoPropio
    },
    {
      key: 'manejoPDA' as const,
      label: 'Manejo PDA / Radiofr.',
      icon: ScanBarcode,
      isUserConfirmed: candidate.confirmationAttributes.manejoPDA
    },
    {
      key: 'excelAvanzado' as const,
      label: 'Excel Avanzado',
      icon: FileSpreadsheet,
      isUserConfirmed: candidate.confirmationAttributes.excelAvanzado
    },
    {
      key: 'inglesB2' as const,
      label: 'Inglés B2+',
      icon: Globe,
      isUserConfirmed: candidate.confirmationAttributes.inglesB2
    },
    {
      key: 'turnosRotativos' as const,
      label: 'Turnos Rotativos',
      icon: Clock,
      isUserConfirmed: candidate.confirmationAttributes.turnosRotativos
    },
    {
      key: 'incorporacionInmediata' as const,
      label: 'Incorp. Inmediata',
      icon: Sparkles,
      isUserConfirmed: candidate.confirmationAttributes.incorporacionInmediata
    }
  ];

  // Helper to determine if an offer demands this attribute
  const doesOfferRequire = (offer: JobOffer, key: string): boolean => {
    return offer.requirements.some(r => {
      const l = r.name.toLowerCase();
      if (key === 'vehiculoPropio') return l.includes('vehículo') || l.includes('coche') || l.includes('polígono');
      if (key === 'manejoPDA') return l.includes('pda') || l.includes('radiofrecuencia');
      if (key === 'excelAvanzado') return l.includes('excel') || l.includes('tablas dinámicas');
      if (key === 'inglesB2') return l.includes('inglés');
      if (key === 'turnosRotativos') return l.includes('turnos');
      if (key === 'incorporacionInmediata') return l.includes('inmediata');
      return false;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Matriz Cruzada de Requisitos a Confirmar
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Visualiza de un vistazo qué ofertas solicitan requisitos que no constan en el CV base y cómo cambia tu puntuación de coincidencia al confirmarlos.
            </p>
          </div>

          {/* Quick toggle pills in header */}
          <div className="flex flex-wrap gap-2 text-xs">
            {flagsConfig.map(flag => (
              <button
                key={flag.key}
                onClick={() => onToggleAttribute(flag.key)}
                className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
                  flag.isUserConfirmed
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
                title={`Haz clic para cambiar estado de ${flag.label}`}
              >
                <flag.icon className="w-3.5 h-3.5" />
                <span>{flag.label}: {flag.isUserConfirmed ? 'SÍ' : 'NO'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cross Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0B192C] text-white border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4 min-w-[200px]">Ofertas cercanas</th>
                <th className="py-3.5 px-3 text-center min-w-[80px]">Score Match</th>
                {flagsConfig.map(f => (
                  <th key={f.key} className="py-3.5 px-3 text-center min-w-[100px]">
                    <div className="flex flex-col items-center gap-1">
                      <f.icon className="w-3.5 h-3.5 text-amber-400" />
                      <span>{f.label}</span>
                    </div>
                  </th>
                ))}
                <th className="py-3.5 px-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {offers.map(offer => {
                const match = computeOfferMatch(offer, candidate);

                return (
                  <tr
                    key={offer.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Offer name & Company */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 leading-snug">
                        {offer.title}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {offer.company} · {offer.location}
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#1E3E62] text-amber-300 font-mono font-bold text-xs">
                        {match.score}%
                      </span>
                    </td>

                    {/* Flag columns */}
                    {flagsConfig.map(f => {
                      const isRequired = doesOfferRequire(offer, f.key);
                      const isMet = isRequired && f.isUserConfirmed;
                      const isPending = isRequired && !f.isUserConfirmed;

                      return (
                        <td key={f.key} className="py-3.5 px-3 text-center">
                          {isRequired ? (
                            isMet ? (
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold" title="Requisito exigido y confirmado">
                                <Check className="w-4 h-4 text-emerald-700" />
                              </span>
                            ) : (
                              <button
                                onClick={() => onToggleAttribute(f.key)}
                                className="inline-flex items-center justify-center px-2 py-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-bold border border-amber-300 cursor-pointer transition-colors"
                                title="Exigido por la oferta pero no confirmado en CV. Haz clic para confirmar."
                              >
                                Exigido (Falta)
                              </button>
                            )
                          ) : (
                            <span className="text-slate-300 text-xs">—</span>
                          )}
                        </td>
                      );
                    })}

                    {/* Action */}
                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => onSelectOffer(offer)}
                        className="px-2.5 py-1 text-xs font-semibold text-[#1E3E62] hover:bg-slate-100 rounded transition-colors cursor-pointer"
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
