var P2P = require('socket.io-p2p');
var socket = require('socket.io-client')();

var opts = {
  numClients: 2
};

var p2p = new P2P(socket, opts, function() {
  console.log("we're speaking WebRTC now");
});

// this event will be triggered over the socket transport
// until `usePeerConnection` is set to `true`
p2p.on('peer-msg', function(data) {
  console.log(data);
});

p2p.on('upgrade', function(data) {
  p2p.emit('peer-msg', 'hi');
  console.log('upgrade');
});

p2p.on('peer-error', function(data) {
  console.log('peer error');
  console.log(data);
});

module.exports = p2p;
