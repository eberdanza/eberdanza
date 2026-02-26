// comunidad.js
import { auth, observeAuth } from './auth.js';
import { getDatabase, ref, push, set, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

const db = getDatabase();
let currentUser = null;

// Detectar usuario logueado
observeAuth(user => {
  console.log("Usuario detectado:", user);
  if (user) {
    currentUser = user;
    loadMessages();
  } else {
    currentUser = null;
    chatMessages.innerHTML = '<p>Inicia sesión para participar en el chat.</p>';
  }
});

// Cargar mensajes en tiempo real
function loadMessages() {
  const messagesRef = ref(db, 'chat');

  onChildAdded(messagesRef, snapshot => {
  const data = snapshot.val();

  // Extraer solo la parte antes de "@"
  const username = data.name ? data.name.split('@')[0] : 'Anon';

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message');
  messageDiv.classList.add(data.uid === currentUser?.uid ? 'user' : 'other');

  // Crear un span para el nombre del usuario
  const nameSpan = document.createElement('span');
  nameSpan.classList.add('chat-username');
  nameSpan.textContent = username;

  // Crear un span para el texto del mensaje
  const textSpan = document.createElement('span');
  textSpan.classList.add('chat-text');
  textSpan.textContent = data.message;

  // Agregar nombre y mensaje al div
  messageDiv.appendChild(nameSpan);
  messageDiv.appendChild(textSpan);

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
}

// Enviar mensaje
chatForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!currentUser) return alert('Debes iniciar sesión');

  const msg = chatInput.value.trim();
  if (!msg) return;

  const newMsgRef = push(ref(db, 'chat'));
  set(newMsgRef, {
    uid: currentUser.uid,
    name: currentUser.email,
    message: msg,
    timestamp: Date.now()
  });

  chatInput.value = '';
});