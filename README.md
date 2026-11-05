# TalentNavy

Portal profesional de candidatura con perfil, catálogo de ofertas, auditoría de requisitos y generación asistida de cartas.

## Desarrollo local

Requisitos: Node.js y npm.

```bash
npm install
npm run dev
```

Las rutas de IA usan `GEMINI_API_KEY` si está configurada; sin ella responden con plantillas de respaldo. No guardes claves en el repositorio.

## Producción en Vercel

El frontend se genera en `dist` con `npm run build`. Las funciones del directorio `api/` atienden los endpoints `/api/*`. Configura `GEMINI_API_KEY` en Vercel para activar las respuestas de Gemini; si no está definida, la app usa el modo de respaldo.

```bash
npm run build
```

## Scripts

- `npm run dev`: servidor local con Express y middleware de Vite.
- `npm run build`: build optimizado del frontend.
- `npm run lint`: comprobación de tipos con TypeScript.
- `npm run preview`: vista local del build estático.

