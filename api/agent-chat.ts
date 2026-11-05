import type { IncomingMessage, ServerResponse } from 'node:http';
import { GoogleGenAI } from '@google/genai';

type ApiRequest = IncomingMessage & { body?: { message?: unknown } };
type ApiResponse = ServerResponse & {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
};

function fallbackReply(message: string) {
  const query = message.toLowerCase();
  if (query.includes('almacén') || query.includes('logística') || query.includes('pedidos') || query.includes('picking')) {
    return 'Oraida tiene experiencia como operaria de almacén y cuenta con Carnet de Carretilla y de Picking con Radiofrecuencia (PDA), homologados en 2025 por el Centro Majem.';
  }
  if (query.includes('contabilidad') || query.includes('factura') || query.includes('excel')) {
    return 'Cuenta con 10 años de experiencia como Responsable de Contabilidad, gestionando facturación, incidencias y análisis de datos.';
  }
  if (query.includes('disponibilidad') || query.includes('turno') || query.includes('incorporación') || query.includes('horario')) {
    return 'Oraida tiene disponibilidad para incorporación inmediata y flexibilidad para jornada completa y turnos rotativos.';
  }
  if (query.includes('contacto') || query.includes('entrevista') || query.includes('teléfono') || query.includes('llamar')) {
    return 'Puedes contactar con Oraida en el 614.632.194 o escribir a Oraidita.79@gmail.com, o solicitar una entrevista desde la portada.';
  }
  if (query.includes('dónde') || query.includes('vive') || query.includes('ubicación') || query.includes('reside')) {
    return 'Oraida reside en Señorío de Illescas (45200), con conexión hacia el sur de Madrid y Toledo.';
  }
  return '¡Hola! Soy Elena, asistente de Oraida. Tiene más de 20 años de experiencia en contabilidad, administración y logística. ¿Quieres conocer alguna experiencia o solicitar una entrevista?';
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  if (!message || message.length > 2000) {
    return res.status(400).json({ error: 'Escribe una consulta de hasta 2000 caracteres' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Eres Elena, asistente virtual de Oraida Rodriguez Gonzales. Responde a empleadores en español con tono cálido, profesional y directo, en 2 o 3 frases. No inventes experiencia ni datos.
Oraida vive en Señorío de Illescas (45200), Toledo/Madrid Sur. Tiene más de 20 años de experiencia: 10 como Responsable de Contabilidad, experiencia en almacén, recepción y administración. Cuenta con Carnet de Picking con PDA y de Carretilla (2025), disponibilidad inmediata, jornada completa y turnos rotativos. Movilidad/vehículo e inglés avanzado requieren confirmación.
Pregunta: "${message}"`;
      const result = await ai.models.generateContent({ model: 'gemini-3.8-flash', contents: prompt });
      if (result.text) return res.status(200).json({ success: true, reply: result.text.trim() });
    } catch (error) {
      console.warn('Agent chat failed:', error instanceof Error ? error.message : error);
    }
  }

  return res.status(200).json({ success: true, reply: fallbackReply(message) });
}

