const container =
document.getElementById("videos-container");


/* LISTA DE VIDEOS (PEGÁS LOS JSON ACÁ) */

const videos = [

{
  "youtubeId": "Weov97w93-4",
  "title": "¿POR QUE ODIAN A ADAM SANDLER? - SUFICIENTE INTERNET",
  "description": "¿De dónde sale el odio hacia Adam Sandler?\n¿Por qué un actor que solo quiere hacer reír genera tanta bronca en internet?\nEn este video analizo el fenómeno detrás del “odio gratuito” a Sandler:\nsu estilo, su humor, su lealtad a sus amigos y por qué su felicidad simple incomoda tanto a cierta parte del público.💛 Mi nombre es Eber Danza y esto es Suficiente Internet: un lugar donde hay un tipo opinando de cosas.\n",
  "date": "2026-02-01",
  "thumbnail": "https://img.youtube.com/vi/Weov97w93-4/hqdefault.jpg"
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