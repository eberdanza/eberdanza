import { videos } from "./videos.js";

document.addEventListener("DOMContentLoaded", renderFeaturedVideo);

function renderFeaturedVideo(){

const container =
document.getElementById("youtube-card");

if(!container) return;

if(!videos || videos.length===0){

container.innerHTML =
"<p>No hay videos disponibles</p>";

return;

}


/* ordenar por createdAt (más nuevo primero) */

const sorted =
[...videos].sort(
(a,b)=>b.createdAt-a.createdAt
);


/* tomar el más nuevo */

const latest =
sorted[0];


/* render */

container.innerHTML = `

<div class="featured-video-card">

<iframe
src="https://www.youtube.com/embed/${latest.youtubeId}"
allowfullscreen>
</iframe>

<h3>
${latest.title}
</h3>

<p>
${latest.description || ""}
</p>

<small>
${latest.date || ""}
</small>

</div>

`;

}