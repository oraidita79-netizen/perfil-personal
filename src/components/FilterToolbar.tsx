import React from 'react';
import { Search, LayoutGrid, Table, X, SlidersHorizontal } from 'lucide-react';
import { JobSector, WorkModality } from '../types/index.ts';

interface FilterToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  selectedModality: string;
  setSelectedModality: (modality: string) => void;
  minScoreFilter: number;
  setMinScoreFilter: (score: number) => void;
  activeFlagFilter: string | null;
  setActiveFlagFilter: (flag: string | null) => void;
  viewMode: 'grid' | 'table';
  setViewMode: (mode: 'grid' | 'table') => void;
  totalFiltered: number;
  onReset: () => void;
}

const SECTORS: Array<string> = [
  'Todos los sectores',
  'Logística y Almacén',
  'Administración y Finanzas',
  'Atención al Cliente',
  'Producción e Industria',
  'Hostelería y Retail',
  'Tecnología y Soporte'
];

const MODALITIES = ['Todas las modalidades', 'Presencial', 'Híbrido', 'Remoto'];

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedSector,
  setSelectedSector,
  selectedModality,
  setSelectedModality,
  minScoreFilter,
  setMinScoreFilter,
  activeFlagFilter,
  setActiveFlagFilter,
  viewMode,
  setViewMode,
  totalFiltered,
  onReset
}) => {
  const hasActiveFilters =
    searchQuery !== '' ||
    selectedSector !== 'Todos los sectores' ||
    selectedModality !== 'Todas las modalidades' ||
    minScoreFilter > 0 ||
    activeFlagFilter !== null;

  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
        {/* Top filter row: Search + Sectors + Modality + View toggle */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Search bar */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por puesto, empresa o requisito (ej. PDA, Excel)..."
              className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3E62] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Dropdown selectors */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Sector Selector */}
            <select
              value={selectedSector}
              onChange={e => setSelectedSector(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#1E3E62] cursor-pointer"
            >
              {SECTORS.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Modality Selector */}
            <select
              value={selectedModality}
              onChange={e => setSelectedModality(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#1E3E62] cursor-pointer"
            >
              {MODALITIES.map(m => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            {/* Match Score Segmented filter */}
            <div className="flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-lg text-xs">
              <button
                onClick={() => setMinScoreFilter(0)}
                className={`px-2.5 py-1 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  minScoreFilter === 0 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setMinScoreFilter(75)}
                className={`px-2.5 py-1 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  minScoreFilter === 75 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Alta coincidencia (&ge;75%)
              </button>
            </div>

            {/* View switcher: Grid vs Table */}
            <div className="flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-lg text-xs shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                title="Vista en tarjetas"
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-[#1E3E62] shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                title="Vista en tabla comparativa"
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-[#1E3E62] shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Table className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick filter chips row for critical unconfirmed attributes */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1.5 whitespace-nowrap">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
            Filtrar por requisitos a confirmar:
          </span>

          <button
            onClick={() => setActiveFlagFilter(activeFlagFilter === 'vehiculo' ? null : 'vehiculo')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeFlagFilter === 'vehiculo'
                ? 'bg-[#1E3E62] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Piden Vehículo Propio
          </button>

          <button
            onClick={() => setActiveFlagFilter(activeFlagFilter === 'pda' ? null : 'pda')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeFlagFilter === 'pda'
                ? 'bg-[#1E3E62] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Piden Manejo de PDA
          </button>

          <button
            onClick={() => setActiveFlagFilter(activeFlagFilter === 'excel' ? null : 'excel')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeFlagFilter === 'excel'
                ? 'bg-[#1E3E62] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Piden Excel Avanzado
          </button>

          <button
            onClick={() => setActiveFlagFilter(activeFlagFilter === 'ingles' ? null : 'ingles')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeFlagFilter === 'ingles'
                ? 'bg-[#1E3E62] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Piden Inglés B2+
          </button>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="ml-auto text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer underline underline-offset-2 whitespace-nowrap"
            >
              Limpiar filtros ({totalFiltered} resultados)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
