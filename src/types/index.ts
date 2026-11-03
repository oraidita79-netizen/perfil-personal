export type WorkModality = 'Presencial' | 'Híbrido' | 'Remoto';
export type ContractType = 'Indefinido' | 'Temporal' | 'Prácticas / Formación' | 'Por proyecto';
export type WorkdayType = 'Jornada completa' | 'Jornada parcial' | 'Turnos rotativos' | 'Fines de semana';
export type JobSector = 'Logística y Almacén' | 'Administración y Finanzas' | 'Atención al Cliente' | 'Producción e Industria' | 'Hostelería y Retail' | 'Tecnología y Soporte';

export interface RequirementItem {
  id: string;
  name: string;
  category: 'hard_skill' | 'soft_skill' | 'license' | 'tool' | 'language' | 'schedule';
  presentInCV: boolean;
  needsConfirmation: boolean;
  confirmationReason?: string;
  userConfirmed?: boolean;
}

export interface JobOffer {
  id: string;
  title: string;
  company: string;
  sector: JobSector;
  location: string;
  modality: WorkModality;
  contract: ContractType;
  workday: WorkdayType;
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: 'año' | 'mes' | 'hora';
  publishedDate: string; // e.g. "2026-11-03"
  isVerified: boolean;
  lastCheckedDate: string;
  sourceUrl?: string;
  description: string;
  responsibilities: string[];
  requirements: RequirementItem[];
  benefits: string[];
  contactEmail?: string;
}

export interface CandidateProfile {
  name: string;
  title: string;
  location: string;
  avatarUrl?: string;
  summary: string;
  email: string;
  phone: string;
  experienceYears: number;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  experiences: Array<{
    role: string;
    company: string;
    period: string;
    bullets: string[];
  }>;
  knownSkills: string[];
  // Special flags that need confirmation
  confirmationAttributes: {
    vehiculoPropio: boolean;
    manejoPDA: boolean;
    excelAvanzado: boolean;
    inglesB2: boolean;
    turnosRotativos: boolean;
    incorporacionInmediata: boolean;
  };
  notesOnAttributes: Record<string, string>;
  languages: Array<{ language: string; level: string }>;
  uploadedCvName?: string;
}

export interface MatchScoreResult {
  offerId: string;
  score: number; // 0 - 100
  matchedCount: number;
  totalRequirements: number;
  unconfirmedCount: number;
  missingCrucial: string[];
  matchTier: 'Excelente' | 'Muy Alto' | 'Medio' | 'Requiere Adaptación';
}

export interface ApplicationTrackerItem {
  offerId: string;
  status: 'Guardada' | 'En preparación' | 'Enviada' | 'En entrevista' | 'Descartada';
  notes: string;
  updatedAt: string;
  customCoverLetter?: string;
}
