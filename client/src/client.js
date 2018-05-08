console.log("clinet.js loading");

const writeEvent = (text) => {
	const parent = document.querySelector('#events');// ul element
	const el = document.createElement('li'); // li element
	el.innerHTML = text;
	parent.appendChild(el);
};

const onFormSubmitted = (e) => {
     e.preventDefault();

     const input = document.querySelector('#chat');
      console.log('text ' + input);
     const text = input.value;
    
    
     socket.emit('message', text);
      input.value = '';
};

writeEvent('Welcome to Game'); 

const socket = io();
socket.on('message', writeEvent);

document.querySelector('#chat-form').addEventListener('submit', onFormSubmitted);