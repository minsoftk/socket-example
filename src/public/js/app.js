// socket은 서버로의 연결을 의미한다.
const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#message');
const nickForm = document.querySelector('#nick');

const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  return JSON.stringify({ type, payload });
}

socket.addEventListener('open', (socket) => {
  console.log('connect Server');
});

socket.addEventListener('message', (message) => {
  // console.log('just got this:', message, 'from the server');

  const li = document.createElement('li');
  li.innerText = message.data.toString('utf-8');
  messageList.append(li);
});

socket.addEventListener('close', (message) => {
  console.log('disconnected from Server');
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(makeMessage('new_message', input.value));
  input.value = '';
});

nickForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = nickForm.querySelector('input');
  socket.send(makeMessage('nickname', input.value));
  input.value = '';
});

// setTimeout(() => {
//   socket.send('hello from the browser');
// }, 10000);
