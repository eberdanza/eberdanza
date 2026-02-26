import { ref, onValue }
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

import { db } from "./firebase.js";

const container =
document.getElementById("videos-container");


function createVideoCard(video){

  const card = document.createElement("div");

  card.className = "video-card";

  const thumbnail =
  `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  card.innerHTML = `

    <img
      src="${thumbnail}"
      class="video-thumb"
    >

    <div class="video-info">

      <div class="video-title">
        ${video.title}
      </div>

      <div class="video-meta">
        ${video.author || "Comunidad"} · ${video.date || ""}
      </div>

    </div>

  `;

  return card;

}


function loadVideos() {

  const videosRef = ref(db, "videos");

  onValue(videosRef, (snapshot) => {

    container.innerHTML = "";

    if (!snapshot.exists()) {

      container.innerHTML =
        "<p>No hay videos aún.</p>";

      return;

    }

    const data = snapshot.val();

    Object.values(data)
      .reverse()
      .forEach(video => {

        const card =
          createVideoCard(video);

        container.appendChild(card);

      });

  });

}


loadVideos();