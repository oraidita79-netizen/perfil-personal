import { JobOffer } from '../types/index.ts';

const checkedAt = '2026-11-05';

const makeOffer = (data: {
  id: string;
  title: string;
  company: string;
  sector: JobOffer['sector'];
  location: string;
  contract: JobOffer['contract'];
  workday: JobOffer['workday'];
  salaryMin?: number;
  salaryMax?: number;
  salaryPeriod?: JobOffer['salaryPeriod'];
  publishedDate: string;
  sourceUrl: string;
  description: string;
  responsibilities: string[];
  requirements: Array<{ name: string; category: JobOffer['requirements'][number]['category']; presentInCV?: boolean }>;
  benefits: string[];
}): JobOffer => ({
  ...data,
  modality: 'Presencial',
  salaryMin: data.salaryMin ?? 0,
  salaryMax: data.salaryMax ?? 0,
  salaryPeriod: data.salaryPeriod ?? 'año',
  isVerified: true,
  lastCheckedDate: checkedAt,
  requirements: data.requirements.map((item, index) => ({
    id: `${data.id}-req-${index + 1}`,
    name: item.name,
    category: item.category,
    presentInCV: item.presentInCV ?? false,
    needsConfirmation: !(item.presentInCV ?? false),
    ...(!(item.presentInCV ?? false) ? { confirmationReason: 'Confirma este requisito antes de presentar la candidatura.' } : {})
  }))
});

// Curated from employer or recruiter listings in Illescas; the street address is intentionally not stored.
export const NEARBY_OFFERS: JobOffer[] = [
  makeOffer({
    id: 'nearby-manpower-carretillero-758789',
    title: 'Carretillero/a retráctil y preparación de pedidos',
    company: 'Manpower',
    sector: 'Logística y Almacén',
    location: 'Illescas, Toledo',
    contract: 'Temporal',
    workday: 'Jornada completa',
    salaryMin: 10.18,
    salaryMax: 10.18,
    salaryPeriod: 'hora',
    publishedDate: 'Fecha no indicada; comprobada el 05/11/2026',
    sourceUrl: 'https://www.manpower.es/es/empleos/transporte-y-logistica/carretillero-a-h-m-x-/758789',
    description: 'Vacante presencial en Illescas para manejo de carretilla retráctil, reposición de mercancía y preparación de pedidos. El anuncio indica incorporación inmediata y turnos de mañana y tarde.',
    responsibilities: ['Manejo de carretilla retráctil.', 'Ubicación y reposición de mercancía.', 'Preparación de pedidos, carga y descarga.'],
    requirements: [
      { name: 'Experiencia con carretilla retráctil', category: 'hard_skill' },
      { name: 'Carné de carretillero en vigor', category: 'license', presentInCV: true },
      { name: 'Disponibilidad de incorporación inmediata', category: 'schedule' },
      { name: 'Disponibilidad para turnos de mañana y tarde', category: 'schedule' }
    ],
    benefits: ['10,18 € brutos por hora.', 'Plus de asistencia y transporte.', 'Contrato fijo discontinuo con renovaciones mensuales.']
  }),
  makeOffer({
    id: 'nearby-manpower-mozo-749926',
    title: 'Mozo/a de almacén',
    company: 'Manpower',
    sector: 'Logística y Almacén',
    location: 'Illescas, Toledo',
    contract: 'Temporal',
    workday: 'Turnos rotativos',
    salaryMin: 10.47,
    salaryMax: 10.47,
    salaryPeriod: 'hora',
    publishedDate: 'Fecha no indicada; comprobada el 05/11/2026',
    sourceUrl: 'https://www.manpower.es/es/empleos/transporte-y-logistica/mozo-de-almacen-h-m-x-/749926',
    description: 'Puesto presencial en Illescas con tareas de recepción, preparación y empaquetado de pedidos, devoluciones e inventario.',
    responsibilities: ['Recepción, carga y descarga de mercancía.', 'Preparación y empaquetado de pedidos.', 'Gestión de devoluciones e inventario.'],
    requirements: [
      { name: 'Experiencia previa en almacén o logística', category: 'hard_skill', presentInCV: true },
      { name: 'Disponibilidad de lunes a domingo según cuadrante', category: 'schedule' },
      { name: 'Disponibilidad para turno fijo de mañana o tarde', category: 'schedule' }
    ],
    benefits: ['32 horas semanales con opción de horas complementarias.', 'Turno fijo de mañana o de tarde.', 'Contrato fijo discontinuo de hasta 9 meses.']
  }),
  makeOffer({
    id: 'nearby-eurofirms-carretillero-030027',
    title: 'Carretillero/a retráctil',
    company: 'Eurofirms',
    sector: 'Logística y Almacén',
    location: 'Illescas, Toledo',
    contract: 'Temporal',
    workday: 'Turnos rotativos',
    publishedDate: '2026-10-15',
    sourceUrl: 'https://jobs.eurofirms.com/es/es/illescas/carretillero-a-retractil-154-030027',
    description: 'Oferta de jornada completa con cinco vacantes para ubicación de mercancía con carretilla retráctil y preparación de pedidos.',
    responsibilities: ['Ubicación de mercancía con carretilla retráctil.', 'Preparación de pedidos.'],
    requirements: [
      { name: 'Experiencia manejando carretilla retráctil', category: 'hard_skill' },
      { name: 'Carné de carretillero en vigor', category: 'license', presentInCV: true },
      { name: 'Disponibilidad de lunes a viernes en turnos rotativos', category: 'schedule' }
    ],
    benefits: ['Cinco vacantes.', 'Jornada completa de lunes a viernes.']
  }),
  makeOffer({
    id: 'nearby-eurofirms-preparador-030025',
    title: 'Preparador/a de pedidos',
    company: 'Eurofirms',
    sector: 'Logística y Almacén',
    location: 'Illescas, Toledo',
    contract: 'Temporal',
    workday: 'Turnos rotativos',
    publishedDate: '2026-10-15',
    sourceUrl: 'https://jobs.eurofirms.com/es/es/illescas/preparador-a-de-pedidos-154-030025',
    description: 'Oferta presencial de jornada completa para carga, descarga, traslado y preparación de pedidos con transpaleta eléctrica y apiladores.',
    responsibilities: ['Carga y descarga con transpaleta eléctrica.', 'Traslado de mercancía.', 'Preparación de pedidos con transpaleta y apiladores.'],
    requirements: [
      { name: 'Experiencia con transpaleta eléctrica y apiladores', category: 'hard_skill' },
      { name: 'Certificado de manejo de carretillas elevadoras', category: 'license', presentInCV: true },
      { name: 'Vehículo para desplazarse al centro de trabajo', category: 'license' },
      { name: 'Disponibilidad para turnos rotativos', category: 'schedule' }
    ],
    benefits: ['Cinco vacantes.', 'Jornada completa de lunes a viernes.']
  }),
  makeOffer({
    id: 'nearby-eurofirms-mozo-032846',
    title: 'Mozo/a de almacén',
    company: 'Eurofirms',
    sector: 'Logística y Almacén',
    location: 'Illescas, Toledo',
    contract: 'Temporal',
    workday: 'Jornada completa',
    salaryMin: 11.73,
    salaryMax: 11.73,
    salaryPeriod: 'hora',
    publishedDate: '2026-10-14',
    sourceUrl: 'https://jobs.eurofirms.com/es/es/illescas/mozo-a-almacen-154-032846',
    description: 'Puesto de almacén en Illescas con funciones de manipulación, preparación y movimiento de mercancía.',
    responsibilities: ['Preparación de pedidos.', 'Movimiento y ubicación de mercancía.', 'Apoyo en tareas generales de almacén.'],
    requirements: [
      { name: 'Experiencia en almacén o preparación de pedidos', category: 'hard_skill', presentInCV: true },
      { name: 'Disponibilidad para el horario indicado en la oferta', category: 'schedule' }
    ],
    benefits: ['11,73 € brutos por hora según el anuncio.']
  })
];

export const NEARBY_OFFERS_JSON = JSON.stringify(NEARBY_OFFERS, null, 2);
