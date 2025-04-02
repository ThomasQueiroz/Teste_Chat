function registerUser() {
    const username = document.getElementById('username').value.trim();
    if (!username) { 
        alert("Por favor, insira um nome de usuário!"); 
        return;
    }
    localStorage.setItem("chatUsername", username);
    console.log("Nome salvo no localStorage:", username);
    window.location.href = "chat.html";
}
