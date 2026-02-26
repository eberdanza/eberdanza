import { db } from './firebase.js'; // tu config de Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase.js';
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

let currentUser = null;

// Detecta usuario
onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
  } else {
    currentUser = null;
    chatMessages.innerHTML = `<p>Inicia sesión para participar en el chat.</p>`;
  }
});

// Escucha mensajes en tiempo real
const chatCol = collection(db, "chat");
const q = query(chatCol, orderBy("timestamp"));

onSnapshot(q, snapshot => {
  chatMessages.innerHTML = '';
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement('div');
    div.classList.add('chat-message');
    div.classList.add(data.uid === currentUser?.uid ? 'user' : 'other');
    div.textContent = `${data.name || 'Anon'}: ${data.message}`;
    chatMessages.appendChild(div);
  });

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Envía mensaje
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUser) return alert('Debes iniciar sesión');

  const msg = chatInput.value.trim();
  if (!msg) return;

  await addDoc(chatCol, {
    uid: currentUser.uid,
    name: currentUser.email,
    message: msg,
    timestamp: new Date()
  });

  chatInput.value = '';
});