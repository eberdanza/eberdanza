document.addEventListener("DOMContentLoaded", () => {

  const urlInput = document.getElementById("youtubeUrl");

  if (!urlInput) return;

  urlInput.addEventListener("change", handleYouTubeUrl);

});


// Extraer ID
function extractVideoId(url) {

  if (!url) return null;

  const regExp =
    /^.*(youtu\.be\/|v\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

  const match = url.match(regExp);

  return match && match[2].length === 11
    ? match[2]
    : null;
}


// Función principal
async function handleYouTubeUrl() {

  const url = document.getElementById("youtubeUrl").value;

  const videoId = extractVideoId(url);

  if (!videoId) {

    alert("URL inválida");

    return;

  }

  await autofillFields(videoId);

  renderPreview(videoId);

}



// Autocompletar datos
async function autofillFields(videoId) {

  try {

    // oEmbed
    const oembed = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );

    const data = await oembed.json();


    // RSS
    const rss = await fetch(
      `https://www.youtube.com/feeds/videos.xml?video_id=${videoId}`
    );

    const text = await rss.text();

    const parser = new DOMParser();

    const xml = parser.parseFromString(text, "text/xml");

    const entry = xml.querySelector("entry");


    const description =
      entry?.querySelector("media\\:description")?.textContent || "";

    const published =
      entry?.querySelector("published")?.textContent || "";


    // completar inputs
    setValue("title", data.title);
    setValue("channel", data.author_name);
    setValue("thumbnail",
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    );
    setValue("description", description);
    setValue("publishedAt", published);


  } catch (e) {

    console.error(e);

    alert("No se pudo obtener info del video");

  }

}



// Preview visual
function renderPreview(videoId) {

  const preview = document.getElementById("youtube-preview");

  if (!preview) return;

  preview.innerHTML = `
  
  <iframe
    width="100%"
    height="315"
    src="https://www.youtube.com/embed/${videoId}"
    frameborder="0"
    allowfullscreen>
  </iframe>
  
  `;

}



// helper
function setValue(id, value) {

  const el = document.getElementById(id);

  if (el) el.value = value;

}