const container =
document.getElementById("videos-container");


/* LISTA DE VIDEOS (PEGÁS LOS JSON ACÁ) */

const videos = [

{
youtubeId: "Weov97w93-4",
title: "Video de prueba",
description: "Descripción del video",
date: "2026-02-26",
thumbnail: "https://img.youtube.com/vi/Weov97w93-4/hqdefault.jpg"
},

// pegás más videos acá

];



/* CREAR CARD */

function createVideoCard(video){

const card =
document.createElement("div");

card.className =
"video-card";

card.innerHTML =
`
<iframe
src="https://www.youtube.com/embed/${video.youtubeId}"
allowfullscreen>
</iframe>

<h3>${video.title}</h3>

<p>${video.date}</p>

`;

return card;

}



/* MOSTRAR VIDEOS */

function renderVideos(){

if(!container) return;

container.innerHTML = "";

videos.forEach(video=>{

container.appendChild(
createVideoCard(video)
);

});

}



renderVideos();