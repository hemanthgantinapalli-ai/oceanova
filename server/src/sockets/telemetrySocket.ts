import { Server, Socket } from 'socket.io';

export const setupSocketHandlers = (io: Server) => {
  console.log('[Socket.IO] Real-time engine initialized.');

  io.on('connection', (socket: Socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    socket.emit('system:ready', {
      message: 'Connected to OceaNova Live Telemetry Stream',
      timestamp: new Date()
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });

  // Telemetry broadcast interval every 5 seconds
  let battery1 = 88;
  let solarInput1 = 4.2;
  let distance1 = 1240.5;

  setInterval(() => {
    battery1 = Math.min(100, Math.max(20, battery1 + (Math.random() > 0.4 ? 0.3 : -0.2)));
    solarInput1 = parseFloat((3.8 + Math.random() * 1.5).toFixed(2));
    distance1 += 0.05;

    io.emit('telemetry:surya1', {
      vesselId: 'SURYA-01',
      vesselName: 'Surya Boat 1.0',
      status: 'Operational',
      batteryPercent: parseFloat(battery1.toFixed(1)),
      solarInputKw: solarInput1,
      totalEnergyGeneratedKwh: parseFloat((1248 + distance1 * 0.4).toFixed(1)),
      co2AvoidedKg: parseFloat((842 + distance1 * 0.28).toFixed(1)),
      totalDistanceKm: parseFloat(distance1.toFixed(2)),
      speedKnots: parseFloat((6.2 + Math.random() * 0.8).toFixed(1)),
      currentLat: 16.9891 + (Math.random() - 0.5) * 0.002,
      currentLng: 82.2475 + (Math.random() - 0.5) * 0.002,
      timestamp: new Date()
    });

    io.emit('telemetry:mangrove2', {
      vesselId: 'MANGROVE-02',
      vesselName: 'AI Mangrove Boat 2.0',
      status: 'Operational',
      batteryPercent: 94.5,
      solarInputKw: 6.8,
      totalEnergyGeneratedKwh: 2410.8,
      co2AvoidedKg: 1680.4,
      totalDistanceKm: 1890.2,
      speedKnots: 8.4,
      currentLat: 16.5412 + (Math.random() - 0.5) * 0.002,
      currentLng: 81.5231 + (Math.random() - 0.5) * 0.002,
      timestamp: new Date()
    });
  }, 5000);
};
