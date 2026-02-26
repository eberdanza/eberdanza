const urlInput =
document.getElementById("youtubeUrl");

const titleInput =
document.getElementById("title");

const descInput =
document.getElementById("description");

const dateInput =
document.getElementById("date");

const preview =
document.getElementById("preview");

const jsonOutput =
document.getElementById("jsonOutput");

const status =
document.getElementById("status");

const generateBtn =
document.getElementById("generateBtn");

const copyBtn =
document.getElementById("copyBtn");

const clearBtn =
document.getElementById("clearBtn");


/* ARRAY QUE GUARDA TODOS LOS JSON */

let videos = [];



/* DETECTAR URL Y MOSTRAR MINIATURA */

urlInput.addEventListener("input", ()=>{

const videoId =
extractYoutubeId(urlInput.value);

if(!videoId){

preview.innerHTML = "";
return;

}

const thumbnail =
`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

preview.innerHTML = `
<img src="${thumbnail}">
<p>Miniatura cargada correctamente</p>
`;

});



/* GENERAR JSON */

generateBtn.addEventListener("click", ()=>{

const videoId =
extractYoutubeId(urlInput.value);

if(!videoId){

status.textContent =
"URL inválida";

return;

}


const data = {

youtubeId: videoId,

title: titleInput.value,

description: descInput.value,

date: dateInput.value,

thumbnail:
`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,

createdAt: Date.now()

};


/* AGREGAR ARRIBA (MAS NUEVO PRIMERO) */

videos.unshift(data);


/* MOSTRAR */

renderJSON();


status.textContent =
"JSON agregado correctamente";

});



/* MOSTRAR TODOS LOS JSON */

function renderJSON(){

jsonOutput.textContent =
JSON.stringify(videos, null, 2);

}



/* COPIAR TODO */

copyBtn.addEventListener("click", async ()=>{

if(videos.length===0){

status.textContent =
"No hay JSON";

return;

}

await navigator.clipboard.writeText(

JSON.stringify(videos, null, 2)

);

status.textContent =
"JSON copiado";

});



/* LIMPIAR TODO */

clearBtn.addEventListener("click", ()=>{

videos = [];

renderJSON();

status.textContent =
"JSON eliminados";

});



/* EXTRAER ID */

function extractYoutubeId(url){

const regExp =
/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

const match =
url.match(regExp);

return match ? match[1] : null;

}