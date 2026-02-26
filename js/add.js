import { db } from "./firebase.js";

import {
  ref,
  push
}
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const form = document.getElementById("video-form");
const status = document.getElementById("status");
const fetchBtn = document.getElementById("fetch-btn");
const preview = document.getElementById("preview");

/* AUTOCOMPLETAR */
async function fetchVideoInfo() {

  const url =
    document.getElementById("youtubeUrl").value;

  const videoId =
    extractYoutubeId(url);

  if (!videoId) return;

  try {

    const res =
      await fetch(
        `https://yewtu.be/api/v1/videos/${videoId}`
      );

    const data =
      await res.json();

    document.getElementById("title").value =
      data.title;

    document.getElementById("author").value =
      data.author;

    // convertir timestamp a fecha
    const date =
      new Date(data.published * 1000)
        .toISOString()
        .split("T")[0];

    document.getElementById("date").value =
      date;

    document.getElementById("description").value =
      data.description;

    preview.innerHTML = `

      <img src="${data.videoThumbnails[3].url}"
           style="width:100%;max-width:400px;border-radius:8px;">

      <p><strong>${data.title}</strong></p>

      <p>${data.author}</p>

      <small>${date}</small>

    `;

  }

  catch {

    status.textContent =
      "No se pudo obtener información";

  }

}

/* GUARDAR */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const youtubeUrl =
    document.getElementById("youtubeUrl").value;

    const youtubeId =
    extractYoutubeId(youtubeUrl);

    const title =
    document.getElementById("title").value;

  const author =
    document.getElementById("author").value;

  const date =
    document.getElementById("date").value;


  if (!youtubeId) {

    status.textContent =
      "URL inválida";

    return;

  }

  const videoData = {
    youtubeId,
    title,
    author,
    date,
    createdAt: Date.now()
  };

  try {

    await push(
      ref(db, "videos"),
      videoData
    );

    status.textContent =
      "Video agregado correctamente";

    form.reset();
    preview.innerHTML = "";
  }
  catch (err) {
    status.textContent =
      "Error al guardar";

  }

});

function extractYoutubeId(url) {

  const regExp =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;

}