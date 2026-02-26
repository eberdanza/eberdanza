const container = document.getElementById("videos-container");

/* LISTA DE VIDEOS (PEGÁS LOS JSON ACÁ) */

export const videos = [

{
  youtubeId: "Weov97w93-4",
  title: "¿POR QUE ODIAN A ADAM SANDLER? - SUFICIENTE INTERNET",
  description: "¿De dónde sale el odio hacia Adam Sandler?",
  date: "2026-02-01",
  thumbnail: "https://img.youtube.com/vi/Weov97w93-4/hqdefault.jpg"
},
{
  youtubeId: "Gr6UFNr01t4",
  title: "LOS SIMPSON NO PREDICEN EL FUTURO",
  description: "Análisis de Los Simpson",
  date: "2026-02-08",
  thumbnail: "https://img.youtube.com/vi/Gr6UFNr01t4/hqdefault.jpg"
},
{
  youtubeId: "cHfrfyDLfgw",
  title: "¿POR QUE NO VEMOS CINE ARGENTINO?",
  description: "Análisis del cine argentino",
  date: "2026-02-15",
  thumbnail: "https://img.youtube.com/vi/cHfrfyDLfgw/hqdefault.jpg"
},
{
  youtubeId: "P2taMPgp7-Q",
  title: "¿TIKTOK ARRUINO EL HUMOR?",
  description: "Análisis del humor actual",
  date: "2026-02-22",
  thumbnail: "https://img.youtube.com/vi/P2taMPgp7-Q/hqdefault.jpg"
}

];


/* CREAR CARD */

function createVideoCard(video){

const card = document.createElement("div");

card.className = "video-card";

card.innerHTML = `
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

videos.forEach(video => {

container.appendChild(
createVideoCard(video)

);

});

}

renderVideos();