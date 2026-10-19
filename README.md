# OceaNova

OceaNova Blue Economy Foundation website, with a React/Vite client and a Node.js/Express API.

## Development

Install dependencies in each application:

```sh
cd client
npm install
npm run dev
```

In a second terminal, start the API:

```sh
cd server
npm install
npm run dev
```

The client runs on `http://localhost:3000` and proxies API and Socket.IO requests to the server on port `5000`. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`, `JWT_SECRET`, and `REFRESH_SECRET`. The `.env` file is ignored by Git. Use a different long, random value for each JWT secret outside local development.

## Production builds

```sh
cd client
npm run build
```

```sh
cd server
npm run build
```

## Vercel environment variables

Add these variables to the **server service** in Vercel Project Settings → Environment Variables. Set them for each environment (Production, Preview, and Development) you plan to use:

- `MONGODB_URI` — connection string for a reachable MongoDB deployment (for example, MongoDB Atlas).
- `JWT_SECRET` — a long, randomly generated signing secret.
- `REFRESH_SECRET` — a separate long, randomly generated refresh-token secret.

Do not commit real `.env` files or paste secret values into source code. The client uses same-origin `/api/v1` and `/socket.io` paths; Vercel routes those requests to the server service.

The production service does not run the development database seeder, because that seeder replaces existing records. Populate production data only through a separately reviewed, intentional migration or seed operation.
