import { CandidateProfile, JobOffer, MatchScoreResult, RequirementItem } from '../types/index.ts';

export function evaluateRequirement(
  req: RequirementItem,
  candidate: CandidateProfile
): { isMatched: boolean; isPendingConfirmation: boolean } {
  const reqLower = req.name.toLowerCase();

  // Check specific confirmation attributes
  if (reqLower.includes('vehículo') || reqLower.includes('coche') || reqLower.includes('desplazamiento al polígono')) {
    if (candidate.confirmationAttributes.vehiculoPropio) {
      return { isMatched: true, isPendingConfirmation: false };
    }
    return { isMatched: false, isPendingConfirmation: true };
  }

  if (reqLower.includes('pda') || reqLower.includes('radiofrecuencia') || reqLower.includes('pistola')) {
    if (candidate.confirmationAttributes.manejoPDA) {
      return { isMatched: true, isPendingConfirmation: false };
    }
    return { isMatched: false, isPendingConfirmation: true };
  }

  if (reqLower.includes('excel avanzado') || reqLower.includes('tablas dinámicas') || reqLower.includes('buscarv')) {
    if (candidate.confirmationAttributes.excelAvanzado) {
      return { isMatched: true, isPendingConfirmation: false };
    }
    return { isMatched: false, isPendingConfirmation: true };
  }

  if (reqLower.includes('inglés nivel b2') || reqLower.includes('inglés') || reqLower.includes('inglés b2') || reqLower.includes('inglés fluido')) {
    if (candidate.confirmationAttributes.inglesB2) {
      return { isMatched: true, isPendingConfirmation: false };
    }
    return { isMatched: false, isPendingConfirmation: true };
  }

  if (reqLower.includes('turnos rotativos') || reqLower.includes('rotación')) {
    if (candidate.confirmationAttributes.turnosRotativos) {
      return { isMatched: true, isPendingConfirmation: false };
    }
    return { isMatched: false, isPendingConfirmation: true };
  }

  if (reqLower.includes('inmediata') || reqLower.includes('incorporación inmediata')) {
    if (candidate.confirmationAttributes.incorporacionInmediata) {
      return { isMatched: true, isPendingConfirmation: false };
    }
    return { isMatched: false, isPendingConfirmation: true };
  }

  // General check against known skills & past experiences
  if (req.presentInCV) {
    return { isMatched: true, isPendingConfirmation: false };
  }

  const skillMatches = candidate.knownSkills.some(skill =>
    reqLower.includes(skill.toLowerCase()) || skill.toLowerCase().includes(reqLower)
  );
  if (skillMatches) {
    return { isMatched: true, isPendingConfirmation: false };
  }

  if (req.needsConfirmation) {
    return { isMatched: false, isPendingConfirmation: true };
  }

  return { isMatched: false, isPendingConfirmation: false };
}

export function computeOfferMatch(offer: JobOffer, candidate: CandidateProfile): MatchScoreResult {
  const total = offer.requirements.length;
  if (total === 0) {
    return {
      offerId: offer.id,
      score: 100,
      matchedCount: 0,
      totalRequirements: 0,
      unconfirmedCount: 0,
      missingCrucial: [],
      matchTier: 'Excelente'
    };
  }

  let matchedCount = 0;
  let unconfirmedCount = 0;
  const missingCrucial: string[] = [];

  offer.requirements.forEach(req => {
    const evalRes = evaluateRequirement(req, candidate);
    if (evalRes.isMatched) {
      matchedCount += 1;
    } else if (evalRes.isPendingConfirmation) {
      unconfirmedCount += 1;
      missingCrucial.push(req.name);
    } else {
      missingCrucial.push(req.name);
    }
  });

  // Calculate score: matched = 1.0 point, unconfirmed counts as 0.25 (as potential match if verified)
  const rawScore = Math.round(((matchedCount + (unconfirmedCount * 0.25)) / total) * 100);
  const score = Math.min(100, Math.max(15, rawScore));

  let matchTier: MatchScoreResult['matchTier'] = 'Medio';
  if (score >= 85) matchTier = 'Excelente';
  else if (score >= 70) matchTier = 'Muy Alto';
  else if (score >= 50) matchTier = 'Medio';
  else matchTier = 'Requiere Adaptación';

  return {
    offerId: offer.id,
    score,
    matchedCount,
    totalRequirements: total,
    unconfirmedCount,
    missingCrucial,
    matchTier
  };
}

export function generateSmartPitch(offer: JobOffer, candidate: CandidateProfile): string {
  const missingReqs: string[] = [];
  offer.requirements.forEach(r => {
    const res = evaluateRequirement(r, candidate);
    if (!res.isMatched) missingReqs.push(r.name);
  });

  let pitch = `Estimado/a responsable de selección de ${offer.company},\n\n`;
  pitch += `Me dirijo a ustedes para presentar mi candidatura al puesto de "${offer.title}". Con más de ${candidate.experienceYears} años de experiencia en entornos administrativos y operativos, considero que mi perfil encaja plenamente con los objetivos de su equipo.\n\n`;
  pitch += `A lo largo de mi trayectoria he desarrollado una sólida capacidad de organización, rigor en la gestión documental y un trato al cliente caracterizado por la empatía y la eficacia. `;

  if (offer.sector === 'Logística y Almacén') {
    pitch += `Comprendo el ritmo exigente y la precisión que demandan las operaciones de distribución. `;
    if (candidate.confirmationAttributes.vehiculoPropio) {
      pitch += `Cuento con vehículo propio para garantizar máxima puntualidad y disponibilidad en sus instalaciones. `;
    }
    if (candidate.confirmationAttributes.manejoPDA) {
      pitch += `Asimismo, tengo soltura en el manejo de PDA y dispositivos de radiofrecuencia para un flujo ágil de preparación de pedidos. `;
    } else {
      pitch += `Cuento con una rápida capacidad de asimilación tecnológica para dominar los dispositivos PDA de su centro en cuestión de horas. `;
    }
  } else if (offer.sector === 'Administración y Finanzas') {
    pitch += `Mi experiencia gestionando facturación, cotejo de albaranes y atención a proveedores me permite aportar valor desde el primer día. `;
    if (candidate.confirmationAttributes.excelAvanzado) {
      pitch += `Domino herramientas avanzadas de Excel (tablas dinámicas y fórmulas) para la automatización de procesos contables. `;
    } else {
      pitch += `Cuento con un manejo fluido de hojas de cálculo y una actitud proactiva para adaptarme a sus sistemas de gestión y ERP internos. `;
    }
  } else if (offer.sector === 'Atención al Cliente') {
    pitch += `La resolución de incidencias en primera instancia y el cuidado de la reputación corporativa han sido pilares clave en mi trabajo diario. `;
    if (candidate.confirmationAttributes.inglesB2) {
      pitch += `Mi soltura comunicativa en inglés me permite asistir a clientes internacionales con fluidez y cortesía. `;
    }
  }

  if (candidate.confirmationAttributes.incorporacionInmediata) {
    pitch += `\n\nCuento con disponibilidad para incorporación inmediata y total compromiso para integrarme en sus proyectos con dedicación plena.`;
  }

  pitch += `\n\nAgradeciendo de antemano su tiempo y consideración, quedo a su disposición para mantener una entrevista y ampliar cualquier detalle sobre mi experiencia.\n\nAtentamente,\n${candidate.name}\n${candidate.phone} · ${candidate.email}`;

  return pitch;
}
