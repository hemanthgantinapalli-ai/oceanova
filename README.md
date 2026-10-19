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

The client runs on `http://localhost:3000` and proxies API and Socket.IO requests to the server on port `5000`. The API uses a local MongoDB database at `mongodb://127.0.0.1:27017/oceanova` by default. Set `MONGODB_URI` or `PORT` in a local, untracked `server/.env` file to override those defaults.

## Production builds

```sh
cd client
npm run build
```

```sh
cd server
npm run build
```
