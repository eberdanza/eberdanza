import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const container = document.getElementById("videos-container");

const videosRef = ref(window.db, "videos");

onValue(videosRef, (snapshot) => {
  container.innerHTML = "";

  if (!snapshot.exists()) {
    container.textContent = "No hay videos aún.";
    return;
  }

  const data = snapshot.val();

  Object.values(data).forEach(video => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${video.youtubeId}`;
    iframe.width = "560";
    iframe.height = "315";
    iframe.allowFullscreen = true;

    container.appendChild(iframe);
  });
});
