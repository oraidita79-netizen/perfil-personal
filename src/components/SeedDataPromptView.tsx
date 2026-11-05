import React, { useState } from 'react';
import { NEARBY_OFFERS_JSON as RAW_JSON_STRING } from '../data/nearbyOffers.ts';
import { MASTER_PROMPT_TEXT } from '../data/seedOffers.ts';
import { Code2, FileText, Copy, Check, Download, Upload, Sparkles, RefreshCw } from 'lucide-react';
import { JobOffer } from '../types/index.ts';

interface SeedDataPromptViewProps {
  onImportNewOffers?: (offers: JobOffer[]) => void;
}

export const SeedDataPromptView: React.FC<SeedDataPromptViewProps> = ({ onImportNewOffers }) => {
  const [activeSubTab, setActiveSubTab] = useState<'json' | 'prompt' | 'importar'>('json');
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [customJsonInput, setCustomJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(RAW_JSON_STRING);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2200);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(MASTER_PROMPT_TEXT);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2200);
  };

  const handleDownload = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleApplyCustomJson = () => {
    try {
      const parsed = JSON.parse(customJsonInput);
      if (Array.isArray(parsed) && onImportNewOffers) {
        onImportNewOffers(parsed);
        setImportStatus(`Se importaron ${parsed.length} ofertas correctamente.`);
      } else {
        setImportStatus('Error: El JSON debe ser un array de ofertas.');
      }
    } catch (err: any) {
      setImportStatus(`Error de sintaxis JSON: ${err.message}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Datos Semilla & Prompt Maestro
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Catálogo local de ofertas cerca de Illescas, actualizado el 5 de noviembre de 2026, más el prompt original de especificaciones.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveSubTab('json')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'json'
                  ? 'bg-[#1E3E62] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>OFERTAS-SEMILLA.json</span>
            </button>
            <button
              onClick={() => setActiveSubTab('prompt')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'prompt'
                  ? 'bg-[#1E3E62] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PROMPT-MAESTRO.txt</span>
            </button>
            <button
              onClick={() => setActiveSubTab('importar')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'importar'
                  ? 'bg-[#1E3E62] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Importar / Editar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab: JSON Semilla */}
      {activeSubTab === 'json' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
          <div className="bg-[#0B192C] px-6 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>OFERTAS-CERCA-ILLESCAS.json (5 ofertas consultadas el 05/11/2026)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyJson}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedJson ? 'Copiado' : 'Copiar JSON'}</span>
              </button>
              <button
                onClick={() =>
                  handleDownload('OFERTAS-SEMILLA-GOOGLE-AI-STUDIO.json', RAW_JSON_STRING, 'application/json')
                }
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar archivo</span>
              </button>
            </div>
          </div>

          <pre className="p-6 text-xs font-mono text-slate-300 max-h-[600px] overflow-y-auto leading-relaxed selection:bg-amber-400/30 selection:text-white">
            {RAW_JSON_STRING}
          </pre>
        </div>
      )}

      {/* Tab: Prompt Maestro */}
      {activeSubTab === 'prompt' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="bg-slate-50 px-6 py-3.5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <FileText className="w-4 h-4 text-[#1E3E62]" />
              <span>PROMPT-GOOGLE-AI-STUDIO.txt (Referencia Completa)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyPrompt}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompt ? 'Copiado' : 'Copiar Texto'}</span>
              </button>
              <button
                onClick={() =>
                  handleDownload('PROMPT-GOOGLE-AI-STUDIO.txt', MASTER_PROMPT_TEXT, 'text/plain')
                }
                className="px-3 py-1.5 bg-[#1E3E62] hover:bg-[#0B192C] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar .txt</span>
              </button>
            </div>
          </div>

          <div className="p-6 text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed text-slate-700 bg-slate-50/50">
            {MASTER_PROMPT_TEXT}
          </div>
        </div>
      )}

      {/* Tab: Importar Nuevas Ofertas */}
      {activeSubTab === 'importar' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Cargar o Reemplazar Ofertas Personalizadas
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Pega un array JSON con el mismo esquema para sustituir las ofertas semilla por tus propias convocatorias laborales:
            </p>
          </div>

          <textarea
            rows={10}
            value={customJsonInput}
            onChange={e => setCustomJsonInput(e.target.value)}
            placeholder={`[\n  {\n    "id": "mi-oferta-01",\n    "title": "...",\n    "company": "...",\n    ...\n  }\n]`}
            className="w-full p-4 font-mono text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3E62]"
          />

          {importStatus && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs font-medium text-amber-900">
              {importStatus}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setCustomJsonInput(RAW_JSON_STRING)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              Cargar formato semilla en el editor
            </button>
            <button
              onClick={handleApplyCustomJson}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Aplicar nuevas ofertas</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
