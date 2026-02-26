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
{
    "youtubeId": "Gr6UFNr01t4",
    "title": "LOS SIMPSON NO PREDICEN EL FUTURO, NOS PREDICEN A NOSOTROS - Suficiente Internet",
    "description": "¿POR QUÉ nos identificamos tanto con Los Simpson?\n¿Por qué sentimos que esa familia amarilla nos entiende más que la nuestra?\n\nEn este episodio de Suficiente Internet analizo por qué Los Simpson se convirtieron en el espejo de toda una generación:\n✔️ Familias disfuncionales (o sea, normales)\n✔️ Humor que te describe sin avisar\n✔️ Predicciones que no son predicciones\n✔️ Memes eternos\n✔️ Todo lo absurdo que vivimos… pero dibujado\n\nSi creciste con Los Simpson, si los consumiste en Telefe, Fox, o de fondo mientras comías, este video es para vos.",
    "date": "2026-02-08",
    "thumbnail": "https://img.youtube.com/vi/Gr6UFNr01t4/hqdefault.jpg",
    "createdAt": 1772080108039
  },
  {
    "youtubeId": "cHfrfyDLfgw",
    "title": "¿POR QUE NO VEMOS CINE ARGENTINO? - Suficiente Internet",
    "description": "🎬 ¿Por qué hay gente que dice “el cine argentino es malo” aunque no vio ni tres películas?\nEn este video me meto con el mito más grande de la industria: el odio injustificado al cine argento. ¿Es todo drama? ¿Todo en un departamento? ¿Todo financiado por “Ricardo INCAA”? Spoiler: no.\n\nAcá hablamos de prejuicios, marketing inexistente, películas tapadas y por qué terminamos viendo siempre lo mismo.",
    "date": "2026-02-15",
    "thumbnail": "https://img.youtube.com/vi/cHfrfyDLfgw/hqdefault.jpg",
    "createdAt": 1772080319060
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