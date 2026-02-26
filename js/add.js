import { db }
from "./firebase.js";

import {
ref,
push
}
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";


const form =
document.getElementById("video-form");

const status =
document.getElementById("status");

const fetchBtn =
document.getElementById("fetch-btn");

const preview =
document.getElementById("preview");

const youtubeUrlInput =
document.getElementById("youtubeUrl");


/* AUTOCOMPLETAR AL HACER CLICK */

fetchBtn.addEventListener(
"click",
fetchVideoInfo
);


/* AUTOCOMPLETAR AUTOMÁTICO AL PEGAR LINK */

youtubeUrlInput.addEventListener(
"change",
fetchVideoInfo
);



/* OBTENER INFO DEL VIDEO */

async function fetchVideoInfo() {

const url =
youtubeUrlInput.value;

const videoId =
extractYoutubeId(url);

if (!videoId) {

status.textContent =
"URL inválida";

return;

}


try {

const res =
await fetch(
`https://yewtu.be/api/v1/videos/${videoId}`
);

const data =
await res.json();


document.getElementById("title").value =
data.title || "";


document.getElementById("author").value =
data.author || "";


document.getElementById("description").value =
data.description || "";


const date =
new Date(data.published * 1000)
.toISOString()
.split("T")[0];


document.getElementById("date").value =
date;


preview.innerHTML = `

<img
src="${data.videoThumbnails[3].url}"
style="
width:100%;
max-width:400px;
border-radius:8px;
margin-top:10px;
">

<p>
<strong>${data.title}</strong>
</p>

<p>
${data.author}
</p>

<small>
${date}
</small>

`;


status.textContent =
"Datos cargados automáticamente";


}

catch {

status.textContent =
"No se pudo obtener información del video";

}

}



/* GUARDAR EN FIREBASE */

form.addEventListener(
"submit",
async (e) => {

e.preventDefault();


const youtubeUrl =
youtubeUrlInput.value;

const youtubeId =
extractYoutubeId(youtubeUrl);

const title =
document.getElementById("title").value;

const author =
document.getElementById("author").value;

const date =
document.getElementById("date").value;

const description =
document.getElementById("description").value;


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
description,
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

catch {

status.textContent =
"Error al guardar";

}

});



/* EXTRAER ID */

function extractYoutubeId(url) {

const regExp =
/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

const match =
url.match(regExp);

return match
? match[1]
: null;

}