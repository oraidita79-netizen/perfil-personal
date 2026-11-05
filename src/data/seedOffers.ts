import { NEARBY_OFFERS as SEED_OFFERS, NEARBY_OFFERS_JSON as RAW_JSON_STRING } from './nearbyOffers.ts';

export { SEED_OFFERS, RAW_JSON_STRING };

export const MASTER_PROMPT_TEXT = `# PROMPT MAESTRO PARA GOOGLE AI STUDIO
# Sistema de Auditoría de Empleo y Matching de CV (5 de noviembre de 2026)

## OBJETIVO
Construir una plataforma web moderna, interactiva y visualmente refinada para analizar la compatibilidad entre un perfil profesional y ofertas de empleo cercanas.

## REGLAS ESPECÍFICAS
1. Mostrar ofertas con enlaces a sus fuentes y señalar la fecha de publicación cuando esté disponible.
2. Priorizar vacantes dentro de un radio de 30 km de Illescas, Toledo.
3. Comparar requisitos de cada oferta con la experiencia y formación declaradas en el currículum.
4. Permitir confirmar requisitos pendientes y recalcular el índice de compatibilidad.
5. Generar cartas de presentación adaptadas a cada vacante.
6. Mantener las claves de IA en el servidor y no incluirlas en el navegador.`;
