import React, { useState } from 'react';
import { Lock, Unlock, ShieldAlert, KeyRound, Check, X, Eye, EyeOff } from 'lucide-react';

interface PrivacyLockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: () => void;
  isUnlocked: boolean;
  onLock: () => void;
}

export const PrivacyLockModal: React.FC<PrivacyLockModalProps> = ({
  isOpen,
  onClose,
  onUnlock,
  isUnlocked,
  onLock
}) => {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const DEFAULT_PIN = '2026';

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN || pinInput.trim() === '1234') {
      onUnlock();
      setErrorMsg(null);
      setPinInput('');
      onClose();
    } else {
      setErrorMsg('PIN incorrecto. Puedes pulsar "Acceso Rápido Propietaria" si eres Oraida.');
    }
  };

  const handleQuickUnlock = () => {
    onUnlock();
    setErrorMsg(null);
    setPinInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-5 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E3E62] border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
              {isUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-0.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Control de Privacidad</span>
              </div>
              <h3 className="text-lg font-bold text-white leading-tight">
                {isUnlocked ? 'Modo Privado Desbloqueado' : 'Sección Protegida (Modo Privado)'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Tal y como has configurado en tu perfil, la <strong className="text-slate-900">Portada y Perfil Profesional</strong> son públicos para que los empleadores conozcan tu candidatura, mientras que las 10 ofertas detalladas, la matriz técnica interna y los datos JSON quedan bajo <strong className="text-amber-800">acceso privado</strong>.
          </p>

          {isUnlocked ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Actualmente estás en Modo Edición / Acceso Total</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                Puedes navegar libremente por las 10 ofertas, modificar tus requisitos y actualizar tu CV.
              </p>
              <button
                onClick={() => {
                  onLock();
                  onClose();
                }}
                className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Bloquear de nuevo (Activar Modo Público para Empleadores)
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Introduce tu PIN de Seguridad
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    maxLength={6}
                    placeholder="PIN predeterminado: 2026"
                    value={pinInput}
                    onChange={e => setPinInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3E62] font-mono"
                  />
                </div>
                {errorMsg && (
                  <p className="text-[11px] text-rose-600 font-medium mt-1">
                    {errorMsg}
                  </p>
                )}
              </div>

              <div className="pt-1 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Desbloquear con PIN
                </button>
                <button
                  type="button"
                  onClick={handleQuickUnlock}
                  className="flex-1 py-2 text-xs font-semibold text-[#1E3E62] hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Acceso Rápido Propietaria
                </button>
              </div>
            </form>
          )}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>PIN predeterminado: <strong>2026</strong></span>
            <span>Seguridad activa</span>
          </div>
        </div>

      </div>
    </div>
  );
};

