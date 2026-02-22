const VIDEO_DATA = {
  url: 'https://www.youtube.com/watch?v=cHfrfyDLfgw',
  title: '¿POR QUE NO VEMOS CINE ARGENTINO? - Suficiente Internet',
  description: '🎬 ¿Por qué hay gente que dice “el cine argentino es malo” aunque no vio ni tres películas?\nEn este video me meto con el mito más grande de la industria: el odio injustificado al cine argento. ¿Es todo drama? ¿Todo en un departamento? ¿Todo financiado por “Ricardo INCAA”? Spoiler: no.',
  fecha: '15/02/2026'

};

function getVideoId(url) {
  return new URL(url).searchParams.get("v");
}

function renderYouTubeVideo() {
  const container = document.getElementById("youtube-card");
  const videoId = getVideoId(VIDEO_DATA.url);

  if (!videoId) {
    container.innerHTML = "<p>Video no disponible</p>";
    return;
  }

  container.innerHTML = `
    <div class="youtube-frame">
      <iframe 
        src="https://www.youtube.com/embed/${videoId}"
        allowfullscreen
      ></iframe>
    </div>

    <div class="youtube-title">${VIDEO_DATA.title}</div>
    <div class="youtube-description">${VIDEO_DATA.description}</div>
    <div class="youtube-fecha">${VIDEO_DATA.fecha}</div>
  `;
}

renderYouTubeVideo();
