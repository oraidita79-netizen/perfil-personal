import React from 'react';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

interface OriginalCvModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
}

export const OriginalCvModal: React.FC<OriginalCvModalProps> = ({
  isOpen,
  onClose,
  candidateName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1E3E62] border border-amber-400/40 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                Currículum Vitae de {candidateName}
              </h3>
              <p className="text-xs text-slate-300">
                Currículum actualizado
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/assets/cv_oraida_actualizado.pdf"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Abrir el CV actualizado en otra pestaña"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="/assets/cv_oraida_actualizado.pdf"
              download
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Descargar el CV actualizado"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image preview area */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-100 flex items-center justify-center">
          <iframe
            src="/assets/cv_oraida_actualizado.pdf#view=FitH"
            title={`Currículum Vitae actualizado de ${candidateName}`}
            className="w-full h-[72vh] rounded-lg shadow-md border border-slate-300 bg-white"
          />
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Perfil y CV actualizados con los cambios recientes</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1E3E62] hover:bg-[#0B192C] text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Cerrar Visor
          </button>
        </div>

      </div>
    </div>
  );
};
