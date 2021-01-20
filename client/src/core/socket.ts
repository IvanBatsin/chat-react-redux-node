import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

socket.on('server', () => console.log('server'));

export { socket };