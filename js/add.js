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

fetchBtn.addEventListener("click", async () => {

  const url =
    document.getElementById("youtubeUrl").value;

  if (!url) return;

  try {

    const res =
      await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
      );

    if (!res.ok)
      throw new Error("No se pudo obtener info");

    const data = await res.json();

    document.getElementById("title").value =
      data.title;

    document.getElementById("author").value =
      data.author_name;

    preview.innerHTML = `

      <img src="${data.thumbnail_url}"
           style="width:100%;max-width:400px;border-radius:8px;margin-top:10px;">

      <p><strong>${data.title}</strong></p>

      <p>${data.author_name}</p>

    `;

  }

  catch {

    status.textContent =
      "No se pudo obtener información del video";

  }

});


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