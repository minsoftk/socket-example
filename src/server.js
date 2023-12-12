import express from 'express';
import http from 'http';
import WebSocket from 'ws';
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));

const handleListen = () => {
  console.log('ws & http://localhost:3000');
};
// app.listen(3000, handleListen);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

// socket은 연결된 브라우저를 의미한다
function handleConnection(socket) {
  console.log(socket);
}

const sockets = [];
wss.on('connection', (socket) => {
  console.log('connect Browser');
  sockets.push(socket);
  socket['nickname'] = 'Anonmyous';
  socket.on('close', () => console.log('disconnect from browswer!'));
  socket.on('message', (message) => {
    const { type, payload } = JSON.parse(message);
    console.log('type, payload :', type, payload);
    if (type === 'new_message') {
      sockets.forEach((asocket) => {
        asocket.send(`${socket.nickname}: ${payload}`);
      });
    } else if (type === 'nickname') {
      socket['nickname'] = payload;
    }
  });
});
server.listen(3000, handleListen);
