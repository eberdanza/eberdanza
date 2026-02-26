import {
  getDatabase,
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import { auth } from "./firebase.js";

const db = getDatabase();
const messagesRef = ref(db, "messages");

export function sendMessage(text) {

  const user = auth.currentUser;

  if (!user) return;

  push(messagesRef, {
    uid: user.uid,
    email: user.email,
    text,
    timestamp: Date.now()
  });

}

export function listenMessages(callback) {

  onChildAdded(messagesRef, snapshot => {

    callback(snapshot.val());

  });

}
