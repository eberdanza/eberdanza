function extractYoutubeId(url){

if(!url) return null;

const regExp =
/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

const match = url.match(regExp);

return match ? match[1] : null;

}



function generateJSON(){

const url =
document.getElementById("youtubeUrl").value;

const youtubeId =
extractYoutubeId(url);


if(!youtubeId){

alert("URL inválida");

return;

}


const title =
document.getElementById("title").value;

const author =
document.getElementById("author").value;

const date =
document.getElementById("date").value;

const description =
document.getElementById("description").value;


const json = {

youtubeId: youtubeId,

title: title,

author: author,

date: date,

description: description,

createdAt: Date.now()

};


document.getElementById("output")
.textContent =
JSON.stringify(json, null, 2);

}