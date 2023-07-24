const socket = io();
console.log(socket);

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');



const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`,'center');
})

socket.on('receive', data => {
    console.log('my data:', data);
    append(`${data.name}: ${data.message}`, 'left');
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value;
    if (message!=undefined) {
        socket.emit('send', message);
        append(`${name}: ${message}`, 'right');
        
        messageInput.value = "";
    }
})
