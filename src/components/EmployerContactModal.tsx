import React, { useState } from 'react';
import { CandidateProfile } from '../types/index.ts';
import { X, Mail, Phone, Calendar, Send, Check, Building2, User, MessageSquare } from 'lucide-react';

interface EmployerContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: CandidateProfile;
}

export const EmployerContactModal: React.FC<EmployerContactModalProps> = ({
  isOpen,
  onClose,
  candidate
}) => {
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterCompany, setRecruiterCompany] = useState('');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [proposalType, setProposalType] = useState('Entrevista laboral');
  const [message, setMessage] = useState(
    `Hola ${candidate.name}, he revisado tu perfil y el informe de coincidencia de requisitos y me gustaría concertar una breve entrevista para comentar una vacante en nuestra empresa.`
  );
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-5 border-b border-slate-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
              <span>Canal Exclusivo para Empleadores y Selección</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Contactar con {candidate.name}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Solicitud de entrevista o propuesta laboral directa
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contact info quick bar */}
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-medium">
            <Mail className="w-3.5 h-3.5 text-amber-600" />
            <a href={`mailto:${candidate.email}`} className="text-slate-900 hover:underline">
              {candidate.email}
            </a>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            <a href={`tel:${candidate.phone}`} className="text-slate-900 hover:underline">
              {candidate.phone}
            </a>
          </div>
        </div>

        {isSent ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              ¡Mensaje enviado con éxito!
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Se ha remitido tu solicitud a {candidate.name}. Recibirás respuesta en su correo electrónico o teléfono en menos de 24 horas laborables.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tu Nombre y Cargo
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carmen Ruiz (HR Lead)"
                    value={recruiterName}
                    onChange={e => setRecruiterName(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3E62]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Empresa u Organización
                </label>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Logística Global S.A."
                    value={recruiterCompany}
                    onChange={e => setRecruiterCompany(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3E62]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Correo Electrónico de Contacto
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="seleccion@empresa.com"
                    value={recruiterEmail}
                    onChange={e => setRecruiterEmail(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3E62]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tipo de Propuesta
                </label>
                <select
                  value={proposalType}
                  onChange={e => setProposalType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3E62] cursor-pointer"
                >
                  <option value="Entrevista laboral">Concertar Entrevista</option>
                  <option value="Oferta formal">Envío de Oferta Laboral</option>
                  <option value="Consulta sobre requisitos">Pregunta sobre Requisitos</option>
                </select>
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-slate-700 mb-1">
                Mensaje para la Candidata
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3E62]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-500">
                Respuesta garantizada en menos de 24h
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Invitación</span>
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

