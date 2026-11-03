import React, { useState, useRef } from 'react';
import { CandidateProfile, JobOffer } from '../types/index.ts';
import { computeOfferMatch } from '../utils/matchingEngine.ts';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Languages,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Download,
  Car,
  ScanBarcode,
  FileSpreadsheet,
  Globe,
  Clock,
  Sparkles,
  Edit3,
  Check,
  Camera,
  RotateCcw,
  Plus,
  Trash2,
  Lock,
  Unlock
} from 'lucide-react';

interface CandidateCvViewProps {
  candidate: CandidateProfile;
  offers: JobOffer[];
  onToggleAttribute: (key: keyof CandidateProfile['confirmationAttributes']) => void;
  onUpdateCandidate: (updated: Partial<CandidateProfile>) => void;
  isPrivateUnlocked?: boolean;
  onOpenPrivacyModal?: () => void;
}

export const CandidateCvView: React.FC<CandidateCvViewProps> = ({
  candidate,
  offers,
  onToggleAttribute,
  onUpdateCandidate,
  isPrivateUnlocked = true,
  onOpenPrivacyModal
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(candidate.name);
  const [titleInput, setTitleInput] = useState(candidate.title);
  const [emailInput, setEmailInput] = useState(candidate.email);
  const [phoneInput, setPhoneInput] = useState(candidate.phone);
  const [locationInput, setLocationInput] = useState(candidate.location);
  const [summaryInput, setSummaryInput] = useState(candidate.summary);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [copiedCvData, setCopiedCvData] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compute stats across all 10 offers
  const matchResults = offers.map(o => computeOfferMatch(o, candidate));
  const avgScore = Math.round(
    matchResults.reduce((acc, curr) => acc + curr.score, 0) / (matchResults.length || 1)
  );

  // Handle uploading custom photo
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onUpdateCandidate({ avatarUrl: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    onUpdateCandidate({
      avatarUrl: '/src/assets/images/candidate_portrait_executive_1793705684479.jpg'
    });
  };

  const handleSaveProfile = () => {
    onUpdateCandidate({
      name: nameInput,
      title: titleInput,
      email: emailInput,
      phone: phoneInput,
      location: locationInput,
      summary: summaryInput
    });
    setIsEditingProfile(false);
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim()) {
      const updated = [...candidate.knownSkills, newSkillInput.trim()];
      onUpdateCandidate({ knownSkills: updated });
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = candidate.knownSkills.filter(s => s !== skillToRemove);
    onUpdateCandidate({ knownSkills: updated });
  };

  const handleCopyCvJson = () => {
    navigator.clipboard.writeText(JSON.stringify(candidate, null, 2));
    setCopiedCvData(true);
    setTimeout(() => setCopiedCvData(false), 2000);
  };

  // Critical flags
  const CRITICAL_FLAGS = [
    {
      key: 'vehiculoPropio' as const,
      title: 'Vehículo Propio / Carné de Conducir',
      icon: Car,
      impact: 'Exigido en ofertas de Coslada (Madrid), Martorell (Barcelona) y PLAZA (Zaragoza)',
      description: 'El currículum acredita carné B, pero las ofertas logísticas de polígonos industriales exigen confirmar vehículo propio para turnos y accesibilidad.'
    },
    {
      key: 'manejoPDA' as const,
      title: 'Manejo de PDA y Pistola de Radiofrecuencia',
      icon: ScanBarcode,
      impact: 'Exigido en preparación de pedidos y control de stock e inventarios',
      description: 'Herramienta común en almacenes modernos de e-commerce. Si marcas que sí lo dominas, aumentará tu compatibilidad en los puestos de mozo de almacén y controlador de stock.'
    },
    {
      key: 'excelAvanzado' as const,
      title: 'Excel Avanzado (Tablas Dinámicas & BUSCARV)',
      icon: FileSpreadsheet,
      impact: 'Exigido en puestos de Auxiliar Administrativo, Facturación y Control de Stock',
      description: 'El currículum indica ofimática general; varios puestos realizan prueba técnica con tablas dinámicas y conciliación de albaranes.'
    },
    {
      key: 'inglesB2' as const,
      title: 'Inglés Nivel B2 / Conversacional Fluido',
      icon: Globe,
      impact: 'Exigido en Customer Support Multicanal y Recepción VIP internacional',
      description: 'El currículum declara nivel básico; se requiere confirmar fluidez oral y escrita para atención a usuarios europeos.'
    },
    {
      key: 'turnosRotativos' as const,
      title: 'Disponibilidad para Turnos Rotativos',
      icon: Clock,
      impact: 'Exigido en plantas de envasado, líneas continuas y preparación logística',
      description: 'Flexibilidad horaria para turnos de mañana, tarde o noche según rotación quincenal.'
    },
    {
      key: 'incorporacionInmediata' as const,
      title: 'Disponibilidad de Incorporación Inmediata',
      icon: Sparkles,
      impact: 'Prioridad alta en campañas de noviembre 2026 de e-commerce y backoffice',
      description: 'Posibilidad de incorporación en 24-48 horas sin periodo de preaviso largo pendiente.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner: Candidate Identity Lockup */}
      <div className="bg-[#0B192C] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            
            {/* Candidate Photo with Upload Overlay */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-lg bg-slate-800">
                <img
                  src={candidate.avatarUrl || '/src/assets/images/candidate_portrait_executive_1793705684479.jpg'}
                  alt={candidate.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Upload trigger button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Subir foto de tu CV"
                className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center text-white text-[11px] font-bold cursor-pointer backdrop-blur-2xs"
              >
                <Camera className="w-5 h-5 text-amber-400 mb-0.5" />
                <span>Cambiar Foto</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
                <span>Perfil del Candidato</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">Base de Datos 2026</span>
                {onOpenPrivacyModal && (
                  <button
                    onClick={onOpenPrivacyModal}
                    className="ml-2 inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 cursor-pointer"
                  >
                    {isPrivateUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    <span>{isPrivateUnlocked ? 'Modo Total' : 'Modo Privado'}</span>
                  </button>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {candidate.name}
              </h1>
              <p className="text-slate-300 text-sm mt-0.5">
                {candidate.title}
              </p>

              {/* Contact metadata */}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {candidate.location}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  {candidate.email}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  {candidate.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions (Upload photo, Edit, Copy JSON) */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-2 bg-[#1E3E62] hover:bg-[#254d79] text-white text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>Subir Foto CV</span>
            </button>

            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingProfile ? 'Cancelar Edición' : 'Editar Datos'}</span>
            </button>

            <button
              onClick={handleCopyCvJson}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl transition-colors cursor-pointer"
              title="Copiar JSON del perfil"
            >
              {copiedCvData ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Inline Profile Editor Form if toggled */}
        {isEditingProfile && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 bg-slate-900/60 p-5 rounded-xl space-y-4 text-xs animate-in fade-in duration-150">
            <div className="font-bold text-amber-400 text-sm">
              Editar Datos Principales del Perfil
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nombre Completo</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Titular Profesional</label>
                <input
                  type="text"
                  value={titleInput}
                  onChange={e => setTitleInput(e.target.value)}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Ubicación</label>
                <input
                  type="text"
                  value={locationInput}
                  onChange={e => setLocationInput(e.target.value)}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Correo Electrónico</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Teléfono</label>
                <input
                  type="text"
                  value={phoneInput}
                  onChange={e => setPhoneInput(e.target.value)}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Extracto / Resumen Profesional</label>
              <textarea
                rows={3}
                value={summaryInput}
                onChange={e => setSummaryInput(e.target.value)}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
              >
                Descartar
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg cursor-pointer shadow-xs"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CRITICAL AUDIT PANEL: Requisitos a Confirmar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Auditoría de Requisitos Críticos (Requisitos a Confirmar)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Las ofertas semilla piden requisitos que no constan explícitamente en tu currículum. Activa el interruptor si posees el requisito para recalcular automáticamente tu índice de afinidad en todo el catálogo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {CRITICAL_FLAGS.map(flag => {
            const Icon = flag.icon;
            const isConfirmed = candidate.confirmationAttributes[flag.key];

            return (
              <div
                key={flag.key}
                className={`p-4 rounded-xl border transition-all ${
                  isConfirmed
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isConfirmed
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {flag.title}
                      </div>
                      <div className="text-[11px] font-semibold text-amber-900 mt-0.5">
                        {flag.impact}
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                        {flag.description}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Button */}
                  <div className="shrink-0 pt-0.5">
                    <button
                      onClick={() => onToggleAttribute(flag.key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1E3E62] focus:ring-offset-2 ${
                        isConfirmed ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isConfirmed ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className="block text-[10px] text-center font-bold mt-1 text-slate-600">
                      {isConfirmed ? 'SÍ' : 'NO'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: CV Experience & Education */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 spans): Experience & Summary */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Extracto Profesional
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {candidate.summary}
            </p>
          </div>

          {/* Work History */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#1E3E62]" />
              <span>Experiencia Laboral Acreditada</span>
            </h3>

            <div className="space-y-6">
              {candidate.experiences.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-slate-200 space-y-2">
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-[#1E3E62] border-2 border-white"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      {exp.role}
                    </h4>
                    <span className="text-xs font-mono tabular-nums text-slate-500">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-700">
                    {exp.company}
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0"></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (1 span): Education, Skills, Languages */}
        <div className="space-y-6">
          
          {/* Education */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#1E3E62]" />
              <span>Formación y Titulaciones</span>
            </h3>

            <div className="space-y-4">
              {candidate.education.map((edu, idx) => (
                <div key={idx} className="text-xs space-y-1 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div className="font-bold text-slate-900 leading-snug">
                    {edu.degree}
                  </div>
                  <div className="text-slate-600">{edu.institution}</div>
                  <div className="font-mono tabular-nums text-slate-400 text-[11px]">{edu.year}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Competencias y Habilidades with add/remove */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Competencias Validadas
            </h3>
            
            <div className="flex flex-wrap gap-1.5">
              {candidate.knownSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs text-slate-700 bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1 flex items-center gap-1.5 group"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-rose-600 cursor-pointer"
                    title="Eliminar competencia"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            {/* Add skill input */}
            <div className="flex items-center gap-1.5 pt-2">
              <input
                type="text"
                placeholder="Añadir habilidad..."
                value={newSkillInput}
                onChange={e => setNewSkillInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleAddSkill();
                }}
                className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none"
              />
              <button
                onClick={handleAddSkill}
                className="px-2.5 py-1 text-xs font-semibold bg-[#1E3E62] text-white rounded-md hover:bg-[#0B192C] cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Languages className="w-4 h-4 text-[#1E3E62]" />
              <span>Idiomas</span>
            </h3>

            <div className="space-y-2 text-xs">
              {candidate.languages.map((lang, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-800">{lang.language}</span>
                  <span className="text-slate-500 font-mono text-[11px]">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
