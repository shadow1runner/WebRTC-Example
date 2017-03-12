var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'WebRTC Signaler',
  description: 'WebRTC Signaling Server using WebSockets',
  script: 'C:\\app\\WebRTC-Example\\server\\server.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();