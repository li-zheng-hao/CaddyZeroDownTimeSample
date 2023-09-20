const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const ip = getServerIP();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Server: "+ip+":"+port);
  }
  else if (req.url === '/health') {
    const ip = getServerIP();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("healthy");
  }
  else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

function getServerIP() {
  const interfaces = os.networkInterfaces();
  for (let interfaceName in interfaces) {
    const addresses = interfaces[interfaceName];
    for (let i = 0; i < addresses.length; i++) {
      const address = addresses[i];
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
  return 'Unknown';
}

const port = 8081;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});