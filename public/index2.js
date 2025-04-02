const socket = io();
const messages = document.getElementById('messages');
const input = document.getElementById('input');

// Aguarda a conexão com o socket e então registra o usuário
socket.on('connect', () => {
    const username = localStorage.getItem("chatUsername") || 'Anônimo';
    socket.emit("register", username);
    console.log("Registrado como:", username);
});

// Exibe as mensagens no chat
socket.on("chat message", function(dados) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = `${dados.username}: ${dados.msg}`;
    msgDiv.classList.add("chat-message");
    messages.appendChild(msgDiv);
});

// Notifica quando um usuário entra no chat
socket.on("user joined", function(user) {
    const notification = document.createElement('div');
    notification.textContent = `${user} entrou no chat`;
    notification.style.color = 'green';
    messages.appendChild(notification);
});

// Notifica quando um usuário sai do chat
socket.on("user left", function(user) {
    const notification = document.createElement('div');
    notification.textContent = `${user} saiu do chat`;
    notification.style.color = 'red';
    messages.appendChild(notification);
});

// Envia a mensagem para o servidor
function sendMessage() {
    const message = input.value.trim();
    if (message !== "") {
        socket.emit("chat message", message);
        input.value = "";
    }
}
