const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
// show prompt
do {
	name = prompt('Please enter your name: ');
} while (!name);

// add message
textarea.addEventListener('keyup', (e) => {
	// SEND MESSAGE ON ENTER
	if (e.key === 'Enter') {
		sendMessage(e.target.value);
	}
});

function sendMessage(message) {
	let msg = {
		user: name,
		message: message.trim(),
	};
	// Append Message to the chat with class name OUtgoing
	appendMessage(msg, 'outgoing');
	// Clearing the textarea
	textarea.value = '';
	scrollToBottom();

	// Send Message to Server
	socket.emit('message', msg);
}

//  Creating a new div and appending the message
function appendMessage(msg, type) {
	let mainDiv = document.createElement('div');
	let className = type;
	// Adding a class to maindiv
	mainDiv.classList.add(className, 'message');

	// The message
	let add = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
	// setting the value of maindDiv

	mainDiv.innerHTML = add;
	messageArea.appendChild(mainDiv);
}

// Recieve messages
socket.on('message', (msg) => {
	appendMessage(msg, 'incoming');
	scrollToBottom();
});

function scrollToBottom() {
	messageArea.scrollTop = messageArea.scrollHeight;
}
