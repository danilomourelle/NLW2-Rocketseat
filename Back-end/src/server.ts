import express, { json } from 'express';
import cors from 'cors';
import { AddressInfo } from "net";
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json())
app.use(routes)

const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});