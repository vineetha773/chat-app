const socket = io();
let username = '';

while (!username) {
  username = prompt('Enter your name:');
}
socket.emit('set username', username);
document.getElementById('user-label').innerText = `You: ${username}`;
const form = document.getElementById('chat-form');
const input = document.getElementById('message');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
