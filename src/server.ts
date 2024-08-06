import express from 'express';
import * as http from 'http';
import * as net from 'net';

const app = express();

function findAvailablePort(startingPort: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const port = startingPort;
    const server = net.createServer();

    server.unref();
    server.on('error', () => {
      resolve(findAvailablePort(port + 1)); // Try the next port
    });

    server.listen(port, () => {
      server.close(() => resolve(port)); // Port is available
    });
  });
}

findAvailablePort(3000).then((port) => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('Error finding an available port:', err);
});
