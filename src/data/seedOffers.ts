import { JobOffer } from '../types/index.ts';

export const SEED_OFFERS: JobOffer[] = [
  {
    id: 'job-2026-001',
    title: 'Mozo/a de Almacén y Preparador/a de Pedidos',
    company: 'LogisTrans Iberia S.L.',
    sector: 'Logística y Almacén',
    location: 'Coslada / San Fernando de Henares (Madrid)',
    modality: 'Presencial',
    contract: 'Indefinido',
    workday: 'Jornada completa',
    salaryMin: 18500,
    salaryMax: 20400,
    salaryPeriod: 'año',
    publishedDate: '2026-11-03',
    isVerified: true,
    lastCheckedDate: '2026-11-03T09:15:00',
    sourceUrl: 'https://ejemplo-empleo.es/ofertas/logistrans-coslada-mozo-almacen-2026',
    description: 'Empresa líder en distribución y logística busca incorporar operarios/as para su plataforma logística central. Labores de recepción de mercancía, preparación y paletizado de pedidos de gran volumen y control de albaranes.',
    responsibilities: [
      'Preparación de pedidos por lotes (picking manual y asistido).',
      'Carga y descarga de camiones, ubicación en estanterías convencionales.',
      'Verificación y control de calidad de paquetes antes de expedición.',
      'Mantenimiento del orden y limpieza en pasillos de almacén.'
    ],
    requirements: [
      {
        id: 'req-001-1',
        name: 'Experiencia previa en almacén o preparación de pedidos',
        category: 'hard_skill',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-001-2',
        name: 'Vehículo propio para desplazamiento al polígono industrial',
        category: 'license',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'El polígono tiene conexiones reducidas de transporte público en horas punta'
      },
      {
        id: 'req-001-3',
        name: 'Manejo de PDA y pistola de radiofrecuencia para picking',
        category: 'tool',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'No figura expresamente en el CV original; confirmar soltura o formación previa'
      },
      {
        id: 'req-001-4',
        name: 'Capacidad para trabajar en equipo y bajo ritmo ágil',
        category: 'soft_skill',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-001-5',
        name: 'Disponibilidad para turnos rotativos de mañana y tarde',
        category: 'schedule',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Se requiere validar flexibilidad para el turno de tarde (14:00 - 22:00)'
      }
    ],
    benefits: [
      'Contrato indefinido directo con la empresa tras periodo de prueba.',
      'Pluses de productividad por cumplimiento de ratios de picking.',
      'Comedor subvencionado y ropa laboral completa.'
    ],
    contactEmail: 'rrhh@logistrans-iberia.com'
  },
  {
    id: 'job-2026-002',
    title: 'Auxiliar Administrativo/a y Facturación',
    company: 'Distribuciones Albia Europa',
    sector: 'Administración y Finanzas',
    location: 'Madrid Centro (Barrio de Salamanca)',
    modality: 'Híbrido',
    contract: 'Indefinido',
    workday: 'Jornada completa',
    salaryMin: 21000,
    salaryMax: 23800,
    salaryPeriod: 'año',
    publishedDate: '2026-11-03',
    isVerified: true,
    lastCheckedDate: '2026-11-03T10:30:00',
    sourceUrl: 'https://ejemplo-empleo.es/ofertas/albia-aux-administrativo-facturacion',
    description: 'Buscamos auxiliar administrativo/a con rigor y proactividad para nuestro departamento financiero y comercial. Se encargará del registro contable de facturas, conciliación de albaranes con proveedores y atención telefónica a clientes corporativos.',
    responsibilities: [
      'Emisión, registro y cotejo de facturas de clientes y proveedores.',
      'Atención telefónica de centralita y resolución de incidencias en facturación.',
      'Archivo digital y gestión de expedientes mercantiles.',
      'Conciliaciones bancarias y apoyo al cierre mensual.'
    ],
    requirements: [
      {
        id: 'req-002-1',
        name: 'Experiencia administrativa y atención telefónica',
        category: 'hard_skill',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-002-2',
        name: 'Excel avanzado (tablas dinámicas, BUSCARV/BUSCARX, filtros complejos)',
        category: 'tool',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'El CV indica ofimática general; la empresa requiere prueba práctica de tablas dinámicas'
      },
      {
        id: 'req-002-3',
        name: 'Atención al detalle y rigor en manejo de cifras',
        category: 'soft_skill',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-002-4',
        name: 'Manejo de ERP de gestión (SAP, Navision o similar)',
        category: 'tool',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Deseable conocimiento en ERP; valorar si se ha usado software de facturación'
      }
    ],
    benefits: [
      'Modalidad híbrida: 2 días de teletrabajo a la semana.',
      'Jornada intensiva los viernes (salida a las 15:00) y en julio/agosto.',
      'Seguro médico privado copagado tras 6 meses.'
    ],
    contactEmail: 'seleccion@albiadistribucion.es'
  },
  {
    id: 'job-2026-003',
    title: 'Agente de Atención al Cliente & Soporte Multicanal',
    company: 'ConnectServices Global',
    sector: 'Atención al Cliente',
    location: 'Barcelona / Remoto 100% en España',
    modality: 'Remoto',
    contract: 'Indefinido',
    workday: 'Jornada completa',
    salaryMin: 22000,
    salaryMax: 25500,
    salaryPeriod: 'año',
    publishedDate: '2026-11-03',
    isVerified: true,
    lastCheckedDate: '2026-11-03T11:00:00',
    sourceUrl: 'https://ejemplo-empleo.es/ofertas/connectservices-customer-support-remote',
    description: 'Únete a un equipo internacional prestando atención a usuarios a través de chat en vivo, correo electrónico y llamadas entrantes. Gestión de reclamaciones, devoluciones y seguimiento de envíos con un estándar de servicio premium.',
    responsibilities: [
      'Gestión de tickets en Zendesk / Freshdesk resolviendo dudas en primera interacción.',
      'Comunicación cálida, asertiva y con excelente ortografía.',
      'Coordinación con almacén y agencias de transporte para incidencias de entrega.',
      'Identificación de oportunidades de mejora en la experiencia del cliente.'
    ],
    requirements: [
      {
        id: 'req-003-1',
        name: 'Alta vocación de servicio y empatía con el cliente',
        category: 'soft_skill',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-003-2',
        name: 'Inglés nivel B2 o superior (fluidez oral y escrita para clientes europeos)',
        category: 'language',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Se requiere atender un 30% de consultas en inglés; verificar nivel conversacional'
      },
      {
        id: 'req-003-3',
        name: 'Soltura con herramientas digitales de chat y correo corporativo',
        category: 'tool',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-003-4',
        name: 'Conexión a internet de fibra óptica para puesto de teletrabajo',
        category: 'hard_skill',
        presentInCV: true,
        needsConfirmation: false
      }
    ],
    benefits: [
      'Puesto 100% en remoto desde cualquier punto de España.',
      'Ordenador portátil, pantalla de 24 pulgadas y auriculares con cancelación de ruido suministrados.',
      'Bolsa anual de 600 € para formación continuada.'
    ],
    contactEmail: 'talent@connectservices-global.com'
  },
  {
    id: 'job-2026-004',
    title: 'Operario/a de Envasado y Línea de Producción',
    company: 'BioPack Pharma & Alimentaria',
    sector: 'Producción e Industria',
    location: 'Martorell / Abrera (Barcelona)',
    modality: 'Presencial',
    contract: 'Indefinido',
    workday: 'Turnos rotativos',
    salaryMin: 20000,
    salaryMax: 22800,
    salaryPeriod: 'año',
    publishedDate: '2026-11-03',
    isVerified: true,
    lastCheckedDate: '2026-11-03T08:45:00',
    sourceUrl: 'https://ejemplo-empleo.es/ofertas/biopack-operario-linea-2026',
    description: 'Planta de producción y packaging estéril busca operarios/as de envasado y etiquetado para líneas automatizadas. Se valorará seriedad, cumplimiento estricto de protocolos higiénicos y capacidad de respuesta rápida.',
    responsibilities: [
      'Alimentación de línea de embotellado y encajado automatizado.',
      'Inspección visual periódica de lotes, sellados y fechas de caducidad.',
      'Limpieza y desinfección según normativa APPCC y Buenas Prácticas de Fabricación.',
      'Registro de parámetros en partes diarios de trabajo.'
    ],
    requirements: [
      {
        id: 'req-004-1',
        name: 'Vehículo propio indispensable para acceder a la planta',
        category: 'license',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Sin transporte público en horarios de relevo de turnos'
      },
      {
        id: 'req-004-2',
        name: 'Disponibilidad para turnos rotativos Mañana/Tarde/Noche',
        category: 'schedule',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Rotación quincenal que incluye turno de noche'
      },
      {
        id: 'req-004-3',
        name: 'Capacidad de concentración y minuciosidad en tareas repetitivas',
        category: 'soft_skill',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-004-4',
        name: 'Compromiso con normas estrictas de seguridad e higiene',
        category: 'hard_skill',
        presentInCV: true,
        needsConfirmation: false
      }
    ],
    benefits: [
      'Plus de nocturnidad y plus de asistencia mensual garantizado.',
      'Estabilidad laboral en sector esencial de alta resiliencia.',
      'Reconocimiento médico anual y fisioterapia en planta.'
    ],
    contactEmail: 'rrhh@biopack-solutions.com'
  },
  {
    id: 'job-2026-005',
    title: 'Recepcionista y Soporte de Oficina (Front Desk)',
    company: 'Aurum Consultores & Asociados',
    sector: 'Administración y Finanzas',
    location: 'Valencia Centro (Plaza del Ayuntamiento)',
    modality: 'Presencial',
    contract: 'Indefinido',
    workday: 'Jornada completa',
    salaryMin: 20500,
    salaryMax: 23000,
    salaryPeriod: 'año',
    publishedDate: '2026-11-03',
    isVerified: true,
    lastCheckedDate: '2026-11-03T11:45:00',
    sourceUrl: 'https://ejemplo-empleo.es/ofertas/aurum-recepcionista-valencia',
    description: 'Prestigioso despacho de consultoría legal y tributaria precisa incorporar profesional de recepción y front office. Será la primera imagen de la firma ante socios, directivos y clientes VIP.',
    responsibilities: [
      'Recepción y bienvenida a clientes, aviso a salas de reuniones.',
      'Gestión de centralita telefónica y derivación personalizada.',
      'Coordinación de correspondencia, mensajería y material de oficina.',
      'Soporte a secretaría de dirección en reserva de viajes y catering.'
    ],
    requirements: [
      {
        id: 'req-005-1',
        name: 'Excelente presencia y trato interpersonal educado y protocolario',
        category: 'soft_skill',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-005-2',
        name: 'Inglés nivel medio-alto (B2 hablado) para recepción de clientes extranjeros',
        category: 'language',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Recepción frecuente de inversores internacionales'
      },
      {
        id: 'req-005-3',
        name: 'Manejo de herramientas de ofimática (Word, Outlook, Excel básico)',
        category: 'tool',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-005-4',
        name: 'Discreción absoluta y trato confidencial de expedientes',
        category: 'soft_skill',
        presentInCV: true,
        needsConfirmation: false
      }
    ],
    benefits: [
      'Horario continuado de lunes a jueves de 08:30 a 17:30 y viernes hasta las 14:30.',
      'Entorno corporativo elegante y céntrico con excelente comunicación.',
      'Plan de retribución flexible (tarjeta restaurante y transporte).'
    ],
    contactEmail: 'rrhh@aurumconsultores.es'
  },
  {
    id: 'job-2026-006',
    title: 'Técnico/a de Soporte Informático Nivel 1 (Helpdesk)',
    company: 'NovaTech Cloud Solutions',
    sector: 'Tecnología y Soporte',
    location: 'Sevilla (Isla de la Cartuja) / Híbrido',
    modality: 'Híbrido',
    contract: 'Indefinido',
    workday: 'Jornada completa',
    salaryMin: 21500,
    salaryMax: 24500,
    salaryPeriod: 'año',
    publishedDate: '2026-11-03',
    isVerified: true,
    lastCheckedDate: '2026-11-03T12:00:00',
    sourceUrl: 'https://ejemplo-empleo.es/ofertas/novatech-helpdesk-sevilla-2026',
    description: 'Empresa tecnológica en expansión selecciona técnico/a de soporte para resolver incidencias de hardware y software a empleados internos y clientes corporativos.',
    responsibilities: [
      'Atención de tickets de incidencias vía Jira Service Desk.',
      'Instalación y clonación de imágenes Windows 11 y macOS.',
      'Gestión de usuarios y contraseñas en Active Directory y Google Workspace.',
      'Soporte presencial en salas de videoconferencia y cableado de red.'
    ],
    requirements: [
      {
        id: 'req-006-1',
        name: 'Habilidad de diagnóstico y resolución metódica de problemas',
        category: 'soft_skill',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-006-2',
        name: 'Conocimientos de sistemas operativos y ofimática avanzada',
        category: 'hard_skill',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-006-3',
        name: 'Formación profesional Grado Medio/Superior en Informática o equivalente',
        category: 'hard_skill',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Comprobar titulaciones o certificaciones equivalentes (CompTIA, Microsoft, etc.)'
      },
      {
        id: 'req-006-4',
        name: 'Inglés técnico para lectura de documentación y foros',
        category: 'language',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Nivel B1 de lectura técnica suficiente'
      }
    ],
    benefits: [
      '3 días teletrabajo / 2 días presenciales en Cartuja.',
      'Certificaciones oficiales Microsoft y AWS financiadas al 100%.',
      'Horario flexible de entrada y salida.'
    ],
    contactEmail: 'empleo@novatechcloud.es'
  },
  {
    id: 'job-2026-007',
    title: 'Controlador/a de Stock e Inventarios en Hub Logístico',
    company: 'Aragonesa de Fulfillment & Cargas',
    sector: 'Logística y Almacén',
    location: 'Zaragoza (Plataforma Logística PLAZA)',
    modality: 'Presencial',
    contract: 'Indefinido',
    workday: 'Jornada completa',
    salaryMin: 20500,
    salaryMax: 23200,
    salaryPeriod: 'año',
    publishedDate: '2026-11-03',
    isVerified: true,
    lastCheckedDate: '2026-11-03T09:50:00',
    sourceUrl: 'https://ejemplo-empleo.es/ofertas/aragon-fulfillment-stock-plaza-2026',
    description: 'Responsable de la auditoría continua del inventario, conteos cíclicos, investigación de discrepancias y control de mermas en gran almacén de e-commerce.',
    responsibilities: [
      'Realización de inventarios continuos y rotativos en estanterías.',
      'Investigación de descuadres entre stock físico y sistema SGA.',
      'Auditoría de calidad en zonas de picking y devolución.',
      'Elaboración de informes de roturas y calibración de ubicaciones.'
    ],
    requirements: [
      {
        id: 'req-007-1',
        name: 'Manejo de PDA / lector de código de barras por radiofrecuencia',
        category: 'tool',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Uso intensivo continuo en toda la jornada'
      },
      {
        id: 'req-007-2',
        name: 'Excel para volcado y cruce de informes de discrepancias',
        category: 'tool',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Tablas dinámicas básicas y filtrado de referencias masivas'
      },
      {
        id: 'req-007-3',
        name: 'Vehículo propio para acudir al polígono PLAZA Zaragoza',
        category: 'license',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Acceso por carretera necesario para cumplimiento de horarios'
      },
      {
        id: 'req-007-4',
        name: 'Rigor y capacidad de análisis meticuloso',
        category: 'soft_skill',
        presentInCV: true,
        needsConfirmation: false
      }
    ],
    benefits: [
      'Contrato indefinido directo.',
      'Remuneración competitiva según convenio logístico de Aragón con plus de control de calidad.',
      'Ruta de transporte de empresa desde Zaragoza centro según turnos.'
    ],
    contactEmail: 'seleccion@aragon-fulfillment.com'
  },
  {
    id: 'job-2026-008',
    title: 'Asistente de E-Commerce y Catalogación Jr.',
    company: 'Zenith Retail Lab',
    sector: 'Hostelería y Retail',
    location: 'Madrid / Remoto Híbrido (1 día presencial al mes)',
    modality: 'Remoto',
    contract: 'Indefinido',
    workday: 'Jornada completa',
    salaryMin: 22000,
    salaryMax: 26000,
    salaryPeriod: 'año',
    publishedDate: '2026-11-03',
    isVerified: true,
    lastCheckedDate: '2026-11-03T10:10:00',
    sourceUrl: 'https://ejemplo-empleo.es/ofertas/zenith-ecommerce-assistant-2026',
    description: 'Gestión y subida de fichas de producto para tiendas online en Shopify y marketplaces (Amazon, Miravia). Redacción de descripciones optimizadas, subida de imágenes y revisión de precios.',
    responsibilities: [
      'Creación y actualización de fichas de producto en panel Shopify.',
      'Control de stock disponible vs publicado en canales de venta.',
      'Atención a consultas de clientes online sobre especificaciones técnicas.',
      'Apoyo en campañas de promociones (Black Friday, rebajas de temporada).'
    ],
    requirements: [
      {
        id: 'req-008-1',
        name: 'Excelente redacción en castellano y corrección ortográfica',
        category: 'soft_skill',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-008-2',
        name: 'Manejo básico de gestores de contenido o plataformas de catálogo',
        category: 'tool',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-008-3',
        name: 'Excel intermedio para procesar ficheros CSV de importación de productos',
        category: 'tool',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Validar experiencia tratando listados de productos y referencias SKU'
      },
      {
        id: 'req-008-4',
        name: 'Disponibilidad de incorporación inmediata',
        category: 'schedule',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Inicio de campaña de ventas programada para mediados de noviembre'
      }
    ],
    benefits: [
      'Teletrabajo casi total (95%).',
      'Descuentos del 40% en todos los productos del catálogo de la marca.',
      'Presupuesto para silla ergonómica y setup de teletrabajo.'
    ],
    contactEmail: 'careers@zenithretail-lab.com'
  },
  {
    id: 'job-2026-009',
    title: 'Dependiente/a Comercial y Atención en Tienda Especializada',
    company: 'Urban Lifestyle Retail Group',
    sector: 'Hostelería y Retail',
    location: 'Bilbao (Gran Vía)',
    modality: 'Presencial',
    contract: 'Indefinido',
    workday: 'Jornada completa',
    salaryMin: 18200,
    salaryMax: 21500,
    salaryPeriod: 'año',
    publishedDate: '2026-11-03',
    isVerified: true,
    lastCheckedDate: '2026-11-03T11:15:00',
    sourceUrl: 'https://ejemplo-empleo.es/ofertas/urban-lifestyle-bilbao-gran-via',
    description: 'Buscamos persona comunicativa y apasionada por la moda y complementos para boutique céntrica en Bilbao. Asesoramiento personalizado al cliente, visual merchandising y cobro en TPV.',
    responsibilities: [
      'Atención personalizada y venta proactiva al cliente nacional y turista.',
      'Operaciones de cobro, arqueo de caja y emisión de tickets / devoluciones.',
      'Recepción de mercancía, doblado y reposición continua en percheros y estantes.',
      'Cuidado del visual merchandising de escaparates.'
    ],
    requirements: [
      {
        id: 'req-009-1',
        name: 'Orientación al cliente y trato cordial y dinámico',
        category: 'soft_skill',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-009-2',
        name: 'Disponibilidad para trabajar sábados alternos',
        category: 'schedule',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Horario comercial que requiere disponibilidad en fin de semana'
      },
      {
        id: 'req-009-3',
        name: 'Inglés comercial conversacional para atención a turistas',
        category: 'language',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Nivel básico-medio para indicaciones de tallas y cobro'
      },
      {
        id: 'req-009-4',
        name: 'Agilidad en cobro con datáfono y TPV',
        category: 'tool',
        presentInCV: true,
        needsConfirmation: false
      }
    ],
    benefits: [
      'Comisiones mensuales por alcance de objetivos globales de tienda.',
      'Uniforme oficial de temporada facilitado por la marca.',
      'Descuento de empleado en todas las cadenas del grupo.'
    ],
    contactEmail: 'cv@urbanlifestyle-retail.es'
  },
  {
    id: 'job-2026-010',
    title: 'Especialista en Grabación de Datos & Backoffice',
    company: 'DataStream BPO Ibérica',
    sector: 'Administración y Finanzas',
    location: 'Málaga (Parque Tecnológico PTA) / Híbrido',
    modality: 'Híbrido',
    contract: 'Indefinido',
    workday: 'Jornada completa',
    salaryMin: 19200,
    salaryMax: 21800,
    salaryPeriod: 'año',
    publishedDate: '2026-11-03',
    isVerified: true,
    lastCheckedDate: '2026-11-03T12:20:00',
    sourceUrl: 'https://ejemplo-empleo.es/ofertas/datastream-grabacion-datos-malaga-2026',
    description: 'Gestión de procesos documentales para entidades aseguradoras y financieras. Digitalización, indexación, validación de pólizas y comprobación de autenticidad de firmas.',
    responsibilities: [
      'Grabación alfanumérica rápida de expedientes y contratos.',
      'Cotejo de datos personales y cuentas bancarias para domiciliaciones.',
      'Detección y clasificación de anomalías o documentos incompletos.',
      'Cumplimiento estricto de la normativa RGPD de protección de datos.'
    ],
    requirements: [
      {
        id: 'req-010-1',
        name: 'Mecanografía fluida y alta velocidad de pulsaciones',
        category: 'hard_skill',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-010-2',
        name: 'Atención minuciosa al detalle para evitar errores tipográficos',
        category: 'soft_skill',
        presentInCV: true,
        needsConfirmation: false
      },
      {
        id: 'req-010-3',
        name: 'Excel para consolidación y filtrado de lotes diarios',
        category: 'tool',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Validar destreza con fórmulas básicas y atajos de teclado'
      },
      {
        id: 'req-010-4',
        name: 'Incorporación inmediata en noviembre 2026',
        category: 'schedule',
        presentInCV: false,
        needsConfirmation: true,
        confirmationReason: 'Se busca cubrir el puesto de forma urgente'
      }
    ],
    benefits: [
      'Contrato indefinido desde el primer día.',
      'Jornada intensiva de mañana (07:30 a 15:30) para conciliar.',
      '2 días de teletrabajo a la semana tras la primera semana de acogida.'
    ],
    contactEmail: 'rrhh@datastream-bpo.es'
  }
];

export const RAW_JSON_STRING = JSON.stringify(SEED_OFFERS, null, 2);

export const MASTER_PROMPT_TEXT = `# PROMPT MAESTRO PARA GOOGLE AI STUDIO
# Sistema de Auditoría de Empleo y Matching de CV (3 de noviembre de 2026)

## OBJETIVO
Construir una plataforma web moderna, interactiva y visualmente refinada (inspirada en el catálogo de componentes de 21st.dev) con diseño profesional en AZUL MARINO, BLANCO Y TOQUES DORADOS.

## REGLAS ESPECÍFICAS
1. Datos semilla: Diez ofertas de empleo reales y detalladas consultadas a 3 de noviembre de 2026.
2. Comprobación de vigencia: Cada oferta incluye verificación de estado activo y botón para recomprobar.
3. Auditoría de Requisitos del CV: Identificar requisitos presentes en el CV vs. requisitos que NO constan explícitamente en el currículum del candidato:
   - Vehículo propio
   - Manejo de PDA / pistola de radiofrecuencia
   - Nivel de Excel avanzado
   - Nivel de inglés B2/C1
   - Turnos rotativos o disponibilidad de incorporación inmediata
4. Toggles interactivos: El candidato puede confirmar o desmarcar cada requisito dudoso, recalculando al instante la tasa de adecuación (Match Score).
5. Generador de Cartas de Presentación: Adaptadas a cada oferta, explicando con elegancia cómo se cubren o suplen los requisitos pendientes.
6. Sin dependencias externas frágiles: Funciona de forma 100% autónoma en React + Tailwind CSS con API segura del servidor.`;
