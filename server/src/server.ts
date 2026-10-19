import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

import { connectDB } from './config/db';
import { seedDatabase } from './config/seed';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { setupSocketHandlers } from './sockets/telemetrySocket';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  }
});

// Middleware setup
app.use(helmet({
  contentSecurityPolicy: false // Allow Leaflet maps and external CDN assets
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

// Mount API routes
// Base Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    organization: 'OceaNova Blue Economy Foundation',
    timestamp: new Date()
  });
});

app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api/v1', routes);

// Global Error Handler
app.use(errorHandler);

// Setup Socket.IO Telemetry Engine
setupSocketHandlers(io);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  if (process.env.NODE_ENV !== 'production') {
    await seedDatabase();
  }

  server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` OCEAN OVA BLUE ECONOMY FOUNDATION SERVER ACTIVE`);
    console.log(` Port: http://localhost:${PORT}`);
    console.log(` API Endpoint: http://localhost:${PORT}/api/v1`);
    console.log(` Socket.IO Stream: Active on port ${PORT}`);
    console.log(`====================================================`);
  });
};

export { app, server };
export default server;

if (process.env.VERCEL !== '1') {
  startServer().catch((error: unknown) => {
    console.error('[Server] Startup failed.', error);
    process.exitCode = 1;
  });
}
