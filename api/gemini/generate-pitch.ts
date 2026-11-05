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
      const prompt = `Actúa como asesor experto en inserción laboral y redacción de candidaturas de alto impacto.
Escribe una carta de presentación profesional y persuasiva en castellano para:
Puesto: "${offer.title}"
Empresa: "${offer.company}"
Sector: "${offer.sector}"
Ubicación / Modalidad: "${offer.location}" (${offer.modality})
Requisitos clave: ${offer.requirements.map((r: { name?: string }) => r.name ?? '').join(', ')}

Perfil de la candidata:
Nombre: ${candidate.name}
Resumen: ${candidate.summary}
Años de experiencia: ${candidate.experienceYears}
Habilidades: ${candidate.knownSkills.join(', ')}
Requisitos confirmados: ${JSON.stringify(candidate.confirmationAttributes ?? {})}

Instrucciones: máximo 3 o 4 párrafos, tono formal y centrado en el valor que aportará. Aborda los requisitos con honestidad. Incluye encabezado y despedida formal.`;

      const result = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
      if (result.text) return res.status(200).json({ success: true, coverLetter: result.text, source: 'gemini-2.5-flash' });
    } catch (error) {
      console.warn('Gemini pitch failed:', error instanceof Error ? error.message : error);
    }
  }

  return res.status(200).json({ success: true, fallback: true, source: 'template_engine' });
}

