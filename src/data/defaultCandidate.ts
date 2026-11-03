import { CandidateProfile } from '../types/index.ts';

export const DEFAULT_CANDIDATE: CandidateProfile = {
  name: 'Oraida Rodriguez Gonzales',
  title: 'Especialista Polivalente en Logística, Contabilidad y Gestión Administrativa',
  location: 'Señorío de Illescas (45200), Toledo / Madrid Sur',
  avatarUrl: '/assets/oraida_photo.jpg',
  email: 'Oraidita.79@gmail.com',
  phone: '614.632.194',
  experienceYears: 20,
  summary: 'Perfil polivalente con experiencia en gestión de almacén, apoyo en facturación y registros contables y actividades de venta. Con sólida experiencia en gestión administrativa y atención al cliente con habilidades avanzadas en el uso de herramientas informáticas y capacidad para optimizar procesos con un estilo de trabajo responsable comprometido con la mejora y capacidad para responder de forma eficaz en distintos tipos de tareas.',
  education: [
    {
      degree: 'Curso de Organización y Técnicas para la Venta',
      institution: 'Cámara de Comercio',
      year: '2026'
    },
    {
      degree: 'Carnet de Picking con Radiofrecuencia (PDA)',
      institution: 'Centro de Formación Majem',
      year: '2025'
    },
    {
      degree: 'Carnet de Carretilla',
      institution: 'Centro de Formación Majem',
      year: '2025'
    },
    {
      degree: 'Curso Actividades Auxiliar de Almacén y Preparación de Pedidos',
      institution: 'Centro de Formación Majem & Cruz Roja',
      year: '2025'
    },
    {
      degree: 'Curso de Operario de Limpieza Industrial',
      institution: 'Centro Homologado',
      year: '2025'
    }
  ],
  experiences: [
    {
      role: 'Responsable de Contabilidad',
      company: 'Empresa Eléctrica de la Habana',
      period: '2014 - 2024',
      bullets: [
        'Control y análisis del consumo eléctrico y estado de cuentas de clientes.',
        'Investigación rigurosa de irregularidades en la facturación de clientes, identificando y analizando patrones de fraude.',
        'Solución de incidencias complejas en las facturaciones y conciliaciones bancarias.',
        'Supervisión de registros contables y archivo digital de expedientes.'
      ]
    },
    {
      role: 'Recepcionista y Gestión de Oficina',
      company: 'Pan y Dulce',
      period: '2010 - 2014',
      bullets: [
        'Recibir y dar la bienvenida a visitantes de forma profesional, cortés y protocolaria.',
        'Responder y dirigir centralita de llamadas telefónicas, tomar mensajes y resolver consultas.',
        'Gestionar correspondencia entrante y saliente, paquetería y entregas urgentes.',
        'Programar citas, gestión de agendas y calendarios corporativos, y asistencia en tareas administrativas.'
      ]
    },
    {
      role: 'Operaria de Almacén y Gestión de Stocks',
      company: 'Almacenes de Base Militar (Sector Logística)',
      period: '2005 - 2009',
      bullets: [
        'Control estricto de entrada y salida de mercancía y comprobación física de pedidos.',
        'Inventariado periódico y rotativo de almacén.',
        'Control de stock, roturas y calibración de ubicaciones.',
        'Facturación de mercancía y gestión documental de albaranes.'
      ]
    },
    {
      role: 'Administrativo y Atención a Clientes',
      company: 'Empresa Eléctrica',
      period: '2000 - 2005',
      bullets: [
        'Atención telefónica directa y gestión de incidencias con clientes y proveedores.',
        'Gestión de correspondencia y comunicaciones internas y externas.',
        'Tareas administrativas generales y archivo.',
        'Coordinación y programación de reuniones y visitas.'
      ]
    }
  ],
  knownSkills: [
    'Gestión de inventarios',
    'Facturación y registros contables',
    'Control de Calidad',
    'Organización y rigor',
    'Resolución de incidencias',
    'Manejo Paquete Office (Avanzado)',
    'Trabajo en equipo',
    'Manejo de PDA y Picking con Radiofrecuencia (Carnet 2025)',
    'Carnet de Carretilla (2025)',
    'Atención al cliente y proveedores',
    'Mecanografía y gestión documental'
  ],
  // Special attributes updated with real data from CV:
  confirmationAttributes: {
    vehiculoPropio: false, // Pendiente confirmar si tiene coche propio para polígonos alejados
    manejoPDA: true, // ¡ACREDITADO! Posee Carnet de Picking con Radiofrecuencia (Majem 2025)
    excelAvanzado: true, // ¡ACREDITADO! Habilidades informáticas avanzadas y 10 años como Responsable de Contabilidad
    inglesB2: false, // Pendiente confirmar si puesto exige inglés conversacional
    turnosRotativos: true, // ¡ACREDITADO! Consta en datos de interés: "Jornada completa / turno rotativo"
    incorporacionInmediata: true // ¡ACREDITADO! Consta en datos de interés: "Incorporación inmediata"
  },
  notesOnAttributes: {
    vehiculoPropio: 'Residencia en Señorío de Illescas (45200); confirmar si dispone de vehículo particular para turnos específicos.',
    manejoPDA: 'Acreditado con Carnet Oficial de Picking con Radiofrecuencia (Centro Majem, 2025).',
    excelAvanzado: 'Acreditado con más de 10 años de Responsable de Contabilidad y resolución de irregularidades en facturación.',
    inglesB2: 'Nivel básico escolar; pendiente validar fluidez oral si la oferta es internacional.',
    turnosRotativos: 'Acreditado en currículum: total disponibilidad para jornada completa y turnos rotativos.',
    incorporacionInmediata: 'Acreditado en currículum: disponibilidad para incorporación inmediata en 24h.'
  },
  languages: [
    { language: 'Español', level: 'Nativo' },
    { language: 'Inglés', level: 'Básico / Nociones' }
  ],
  uploadedCvName: 'CV_Oraida_Rodriguez_Gonzales.jpg'
};
