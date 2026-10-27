# Juego Frontend

Frontend del proyecto educativo infantil con React + Vite.

## Requisitos

- Node.js 18+
- Backend de [juego_backend](../juego_backend) ejecutándose en `http://localhost:3000`

## Configuración

Opcionalmente puedes crear un archivo `.env` en esta carpeta para cambiar la URL de la API:

```env
VITE_API_URL=http://localhost:3000
```

Si no lo defines, el frontend usa `http://localhost:3000` por defecto.

## Scripts

- `npm run dev`: inicia el entorno local.
- `npm run build`: genera build de producción.
- `npm run lint`: ejecuta oxlint.
