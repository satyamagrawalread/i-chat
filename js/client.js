const socket = io();
console.log(socket);

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const audioClip = document.getElementById('audioClip');



const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const name = prompt("Enter your name to join");
if(name!=undefined) {
    socket.emit('new-user-joined', name);
    socket.on('user-joined', name => {
        append(`${name} joined the chat`,'center');
    })
    
    socket.on('user-left', name => {
        append(`${name} left the chat`,'center');
        
    })
    
    socket.on('receive', data => {
        console.log('my data:', data);
        append(`${data.name}: ${data.message}`, 'left');
    });
}



form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value;
    if (message!=undefined) {
        if(audioClip.paused) {
            audioClip.currentTime = 0;
        }
        audioClip.play();
        socket.emit('send', message);
        append(`${name}: ${message}`, 'right');
        
        messageInput.value = "";
        
    }
})
