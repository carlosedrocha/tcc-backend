/* eslint-disable @typescript-eslint/no-var-requires */
const io = require('socket.io-client');
const readline = require('readline');

// Conectar ao WebSocket Gateway do NestJS
function teste(){
    const socket = io('http://localhost:3333');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    // Envia a mensagem para o bot GPT
    socket.on('connect', () => {
        console.log('Conectado ao servidor WebSocket');
      });
    // Recebe a resposta do bot GPT
    socket.on('waiterNotification', (response) => {
      console.log(response);
    });
}
teste()