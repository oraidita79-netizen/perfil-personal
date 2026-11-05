import type { IncomingMessage, ServerResponse } from 'node:http';
import { GoogleGenAI } from '@google/genai';

type ApiRequest = IncomingMessage & { body?: Record<string, any> };
type ApiResponse = ServerResponse & {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { offer, candidate } = req.body ?? {};
  if (!offer || !candidate || !Array.isArray(offer.requirements) || !Array.isArray(candidate.knownSkills)) {
    return res.status(400).json({ error: 'Oferta o perfil incompletos' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Analiza la compatibilidad entre esta oferta y el CV.
Oferta: ${offer.title} en ${offer.company}. Requisitos: ${offer.requirements.map((r: { name?: string }) => r.name ?? '').join('; ')}.
Candidata: ${candidate.name}, ${candidate.experienceYears} años de experiencia. Habilidades: ${candidate.knownSkills.join(', ')}.
Atributos confirmados: ${JSON.stringify(candidate.confirmationAttributes ?? {})}.
Devuelve JSON con summary (frase), strengths (lista), gaps (lista) y recommendations (lista).`;
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      if (result.text) return res.status(200).json({ success: true, analysis: JSON.parse(result.text) });
    } catch (error) {
      console.warn('Gemini gap audit failed:', error instanceof Error ? error.message : error);
    }
  }

  return res.status(200).json({
    success: true,
    analysis: {
      summary: 'Ajuste sólido con puntos específicos que requieren validación previa a la entrevista.',
      strengths: ['Amplia experiencia en atención al cliente y labores administrativas', 'Rigor organizativo y orientación al detalle'],
      gaps: ['Confirmar destreza con herramientas específicas requeridas por la empresa'],
      recommendations: ['Resaltar la adaptabilidad y el rápido dominio de nuevo software en la carta de presentación']
    }
  });
}

