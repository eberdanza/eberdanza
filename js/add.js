import { db } from "./firebase.js";

import {
  ref,
  push
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";


const form = document.getElementById("video-form");

const status = document.getElementById("status");


form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const youtubeUrl =
    document.getElementById("youtubeUrl").value;

  const title =
    document.getElementById("title").value;

  const author =
    document.getElementById("author").value;

  const date =
    document.getElementById("date").value;


  const youtubeId =
    extractYoutubeId(youtubeUrl);


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

  }

  catch (err) {

    status.textContent =
      "Error al guardar";

    console.error(err);

  }

});



function extractYoutubeId(url) {

  const regExp =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

  const match = url.match(regExp);

  return match ? match[1] : null;

}