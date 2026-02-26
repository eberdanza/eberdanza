const urlInput = document.getElementById("youtubeUrl");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const dateInput = document.getElementById("date");

const preview = document.getElementById("preview");
const jsonOutput = document.getElementById("jsonOutput");



/* Detectar cambios */

urlInput.addEventListener("input", updateData);
titleInput.addEventListener("input", updateJSON);
descInput.addEventListener("input", updateJSON);
dateInput.addEventListener("input", updateJSON);



/* Extraer ID */

function extractYoutubeId(url){

const regExp =
/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

const match = url.match(regExp);

return match ? match[1] : null;

}



/* Actualizar preview */

function updateData(){

const url = urlInput.value;

const videoId = extractYoutubeId(url);

if(!videoId){

preview.innerHTML = "";
jsonOutput.textContent = "";
return;

}



const thumbnail =
`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;



preview.innerHTML = `

<img src="${thumbnail}">

<p>Miniatura cargada correctamente</p>

`;



updateJSON();

}



/* Generar JSON */

function updateJSON(){

const videoId = extractYoutubeId(urlInput.value);

if(!videoId) return;



const data = {

youtubeId: videoId,

title: titleInput.value || "",

description: descInput.value || "",

date: dateInput.value || "",

thumbnail:
`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

};



jsonOutput.textContent =
JSON.stringify(data, null, 2);

}