// stash-proofs: tiny proof server for the vps-deploy skill.
// Binds ONLY to the tailnet IP - nothing here should ever answer on
// the public interface.
const http = require('http');

const HOST = '100.76.240.40';
const PORT = 3021;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ service: 'stash-proofs', message: 'stash proofs online' }));
});

server.listen(PORT, HOST, () => {
  console.log('stash-proofs listening on http://' + HOST + ':' + PORT);
});
