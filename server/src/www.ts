import { createServer } from 'http';
import app from './app';

const port: number = Number(process.env.port) || 3000;

const server = createServer(app);

server.listen(port, () => {
  console.log(`${port}포트 서버 대기 중!`);
});

export default server;
export {};
