const urlInput = document.getElementById("youtubeUrl");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const dateInput = document.getElementById("date");

const preview = document.getElementById("preview");
const jsonOutput = document.getElementById("jsonOutput");
const status = document.getElementById("status");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

let currentJSON = "";



/* Detectar URL y mostrar miniatura */

urlInput.addEventListener("input", () => {

const videoId = extractYoutubeId(urlInput.value);

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



/* Botón generar JSON */

generateBtn.addEventListener("click", () => {

const videoId = extractYoutubeId(urlInput.value);

if(!videoId){

status.textContent = "URL inválida";
return;

}

const data = {

youtubeId: videoId,

title: titleInput.value,

description: descInput.value,

date: dateInput.value,

thumbnail:
`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

};

currentJSON =
JSON.stringify(data, null, 2);

jsonOutput.textContent =
currentJSON;

status.textContent =
"JSON generado correctamente";

});



/* Botón copiar JSON */

copyBtn.addEventListener("click", async () => {

if(!currentJSON){

status.textContent =
"Primero generá el JSON";

return;

}

await navigator.clipboard.writeText(
currentJSON
);

status.textContent =
"JSON copiado al portapapeles";

});



/* Extraer ID */

function extractYoutubeId(url){

const regExp =
/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

const match = url.match(regExp);

return match ? match[1] : null;

}