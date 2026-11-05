import React from 'react';
import { JobOffer, CandidateProfile } from '../types/index.ts';
import { computeOfferMatch } from '../utils/matchingEngine.ts';
import { Briefcase, AlertCircle, CheckCircle2, Calendar } from 'lucide-react';

interface StatsStripProps {
  offers: JobOffer[];
  candidate: CandidateProfile;
  onOpenFlagsAudit: () => void;
}

export const StatsStrip: React.FC<StatsStripProps> = ({ offers, candidate, onOpenFlagsAudit }) => {
  const matchResults = offers.map(o => computeOfferMatch(o, candidate));
  const avgScore = Math.round(
    matchResults.reduce((acc, curr) => acc + curr.score, 0) / (matchResults.length || 1)
  );
  
  // Count unconfirmed flags
  const totalUnconfirmed = matchResults.reduce((acc, curr) => acc + curr.unconfirmedCount, 0);
  const excellentCount = matchResults.filter(r => r.score >= 80).length;
  const lastChecked = offers.map(o => o.lastCheckedDate).sort().at(-1);
  const checkedLabel = lastChecked
    ? new Date(lastChecked).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          {/* Stat 1: Total offers */}
          <div className="flex items-center gap-3.5 pr-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[#1E3E62] shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 font-mono tabular-nums leading-none">
                {offers.length}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Ofertas cercanas
              </div>
            </div>
          </div>

          {/* Stat 2: Baseline date */}
          <div className="flex items-center gap-3.5 md:px-4 pt-3 md:pt-0">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 font-mono tabular-nums leading-none">
                {checkedLabel}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Última revisión de las fuentes
              </div>
            </div>
          </div>

          {/* Stat 3: Average match score */}
          <div className="flex items-center gap-3.5 md:px-4 pt-3 md:pt-0">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 font-mono tabular-nums leading-none">
                {avgScore}%
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Ajuste medio ({excellentCount} ofertas &ge;80%)
              </div>
            </div>
          </div>

          {/* Stat 4: Unconfirmed attributes alert */}
          <div className="flex items-center justify-between md:pl-4 pt-3 md:pt-0">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-amber-100/70 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900 font-mono tabular-nums leading-none">
                  {totalUnconfirmed}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Requisitos a confirmar
                </div>
              </div>
            </div>
            <button
              onClick={onOpenFlagsAudit}
              className="text-xs font-semibold text-[#1E3E62] hover:text-amber-600 underline underline-offset-2 cursor-pointer whitespace-nowrap"
            >
              Revisar &rarr;
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
