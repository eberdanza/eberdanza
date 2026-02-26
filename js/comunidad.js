import { database } from './firebaseDatabase.js'; // crea este archivo
import { auth, observeAuth } from './auth.js';

const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

let currentUser = null;

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

// Cargar mensajes en tiempo real (modular)
import { getDatabase, ref, push, set, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const db = getDatabase();

function loadMessages() {
  const messagesRef = ref(db, 'chat');

  onChildAdded(messagesRef, snapshot => {
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

  const newMsgRef = push(ref(db, 'chat'));
  set(newMsgRef, {
    uid: currentUser.uid,
    name: currentUser.email,
    message: msg,
    timestamp: Date.now()
  });

  chatInput.value = '';
});