const HTTPS_PORT = 8443;

const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

// Yes, SSL is required
const serverConfig = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
};

// ----------------------------------------------------------------------------------------

var handleRequest = function(request, response) {
    // Render the single client html file for any request the HTTP server receives
    console.log('request received: ' + request.url);
};

var httpsServer = https.createServer(serverConfig, handleRequest);
httpsServer.listen(HTTPS_PORT, '0.0.0.0');

// ----------------------------------------------------------------------------------------

// Create a server for handling websocket calls
var wss = new WebSocketServer({server: httpsServer});

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        // Broadcast any received message to all clients
        console.log('received: %s', message);
        wss.broadcast(message);
        console.log('broadcasted');
    });
});

wss.broadcast = function(data) {
    for(let ws of this.clients) {
        console.log('broadcasting to client');
        ws.send(data);
    }
};

console.log('Server running. Visit https://0.0.0.0:' + HTTPS_PORT + ' in Firefox/Chrome (note the HTTPS; there is no HTTP -> HTTPS redirect!)');
