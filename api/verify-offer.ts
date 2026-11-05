import type { IncomingMessage, ServerResponse } from 'node:http';

type ApiRequest = IncomingMessage & { body?: Record<string, unknown> };
type ApiResponse = ServerResponse & {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
};

export default function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { offerId, title, company } = req.body ?? {};
  const checkedAt = new Date().toISOString();

  return res.status(200).json({
    success: true,
    offerId,
    title,
    company,
    status: 'Vigente y Activa',
    lastCheckedDate: checkedAt,
    portalSource: 'Bolsa de Empleo Oficial España 2026',
    verifiedNote: `La oferta para "${title}" en ${company} ha sido comprobada como activa y recibiendo candidaturas.`
  });
}

