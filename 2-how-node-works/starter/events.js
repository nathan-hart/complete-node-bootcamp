const { DH_CHECK_P_NOT_SAFE_PRIME } = require('constants');
const EventEmitter = require('events');

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

// Event Listeners - .on
myEmitter.on('newSale', () => {
  console.log('There was a new sale!');
});
myEmitter.on('newSale', () => {
  console.log('Customer Name: Nate');
});
myEmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit('newSale', 9); // Event Emitter

////////////////////////////////////

const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request recieved!');
  res.end('Req recieved');
});

server.on('close', () => {
  console.log('Server closed');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('waiting for req...');
});
