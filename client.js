/* eslint-disable @typescript-eslint/no-var-requires */
const io = require('socket.io-client');
const readline = require('readline');

// Conectar ao WebSocket Gateway do NestJS
const socket = io('http://localhost:3333');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Envia a mensagem para o bot GPT
function sendMessageToGPT() {
  rl.question('you: ',(message) => {
    socket.emit('callWaiter', message); // Enviar a mensagem ao servidor WebSocket
    sendMessageToGPT(); // Continuar o loop
  });
}

// Recebe a resposta do bot GPT
socket.on('cliente', (response) => {
  console.log('callWaiter: ' + response);
});

// Iniciar a interação com o GPT
sendMessageToGPT();