import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'node:http';
import { WebSocketServer, WebSocket } from 'ws'; // Asegurarse de que WebSocket está importado

const app = express();
const serverPort = 4000;
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/', (req, res) => res.send('server running'));

wss.on('connection', (ws) => {
  console.log('Cliente WebSocket conectado.');

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    console.log('Datos recibidos del cliente:', data);

    // Enviar el mensaje recibido a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on('close', () => {
    console.log('Cliente WebSocket desconectado.');
  });
});

server.listen(serverPort, () => {
  console.log(`Servidor escuchando en http://localhost:${serverPort}`);
});
