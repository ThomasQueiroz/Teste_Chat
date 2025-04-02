// Importação das bibliotecas 
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

// Iniciando o express e o socket.io
const app = express()
const server = http.createServer(app)
const io = new Server(server)

const SERVER_PORT = process.env.PORT || 3000;

// Objeto para armazenar os usuários conectados
const users = {}

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'))


// Configuração dos eventos de conexão do Socket.IO
io.on("connection", function(socket) {
    console.log("Novo usuário conectado: " + socket.id)
    
    // Registro do usuário
    socket.on("register", function(username) {
        users[socket.id] = username  // Salva o nome usando socket.id
        socket.broadcast.emit("user joined", username)  // Notifica os demais
    })

    // Quando recebe uma mensagem, emite para todos os clientes
    socket.on("chat message", function(msg) {
        const username = users[socket.id] || 'Anônimo'
        io.emit("chat message", {username, msg})
    })

    // Quando o usuário desconecta, remove-o do objeto e notifica os demais
    socket.on("disconnect", function() {
        const username = users[socket.id]
        delete users[socket.id]
        if (username) {
            io.emit("user left", username)
        }
    })
})

// Inicia o servidor
server.listen(SERVER_PORT, function() {
    console.log("Servidor rodando na porta " + SERVER_PORT)
})
