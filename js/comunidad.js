const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

let currentUser = null;

// Detecta usuario
auth.onAuthStateChanged(user => {
  console.log("Usuario detectado:", user);
  if (user) {
    currentUser = user;
    loadMessages();
  } else {
    currentUser = null;
    chatMessages.innerHTML = '<p>Inicia sesión para participar en el chat.</p>';
  }
});

// Función para cargar mensajes en tiempo real
function loadMessages() {
  const messagesRef = database.ref('chat');
  messagesRef.off(); // Limpiamos listeners previos

  messagesRef.on('child_added', snapshot => {
    const data = snapshot.val();
    const div = document.createElement('div');
    div.classList.add('chat-message');
    div.classList.add(data.uid === currentUser?.uid ? 'user' : 'other');
    div.textContent = `${data.name || 'Anon'}: ${data.message}`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}

// Enviar mensaje
chatForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!currentUser) return alert('Debes iniciar sesión');

  const msg = chatInput.value.trim();
  if (!msg) return;

  const newMsgRef = database.ref('chat').push();
  newMsgRef.set({
    uid: currentUser.uid,
    name: currentUser.email,
    message: msg,
    timestamp: Date.now()
  });

  chatInput.value = '';
});