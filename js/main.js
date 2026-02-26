import "./youtube.js";

document.addEventListener("DOMContentLoaded", () => {

  loadComponent("header", "header.html");
  loadComponent("footer", "footer.html");


});

/* Cargar componentes */
function loadComponent(id, file) {
  const container = document.getElementById(id);
  if (!container) return;

  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error(`No se pudo cargar ${file}`);
      return res.text();
    })
    .then(html => {
  container.innerHTML = html;

  // Si es el header, inicializar auth UI
  if (id === "header") {
    import("./auth-ui.js").then(module => {
      if (module.initAuthUI) {
        module.initAuthUI();
      }
    });
  }
})
    .catch(err => console.error(err));
}

/* ===============================
   MENÚ HAMBURGUESA
================================ */

document.addEventListener("click", (e) => {

  const toggle = e.target.closest("#menuToggle");
  if (!toggle) return;

  const navLinks = document.getElementById("navLinks");
  if (!navLinks) return;

  navLinks.classList.toggle("active");

});

document.addEventListener("click", (e) => {

  if (e.target.matches(".nav-links a")) {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.remove("active");
  }

});

/* ===============================
   SCHEDULE - DÍA ACTIVO
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().getDay(); 
  // JS: 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

  const todayItem = document.querySelector(
    `.schedule-item[data-day="${today}"]`
  );

  if (todayItem) {
    todayItem.classList.add("active");
  }
});


checkTwitchStatus();

async function checkTwitchStatus() {

  const statusElement = document.querySelector(".stream-status .status");
  const player = document.getElementById("twitch-player");
  const watchBtn = document.getElementById("watch-twitch-btn");

  if (!statusElement) return;

  try {

    const res = await fetch(
      "https://decapi.me/twitch/uptime/eberdanza"
    );

    const text = await res.text();

    if (text.toLowerCase().includes("offline")) {

      statusElement.textContent =
        "Ahora offline · Aca vas a poder verme en directo cuando prenda en Twitch!";

      statusElement.classList.remove("online");
      statusElement.classList.add("offline");

      if (player) player.style.display = "none";
      if (watchBtn) watchBtn.style.display = "none";

    } else {

      statusElement.textContent =
        "🔴 ONLINE en Twitch ahora mismo";

      statusElement.classList.remove("offline");
      statusElement.classList.add("online");

      if (player) player.style.display = "block";
      if (watchBtn) watchBtn.style.display = "inline-block";

    }

  } catch (err) {

    console.error("Error Twitch status:", err);

  }

}
setInterval(checkTwitchStatus, 60000);



// LOGIN
import { observeAuth, logout } from "./auth.js";

observeAuth(user => {

  if (user) {

    console.log("Logueado:", user.email);

    // Mostrar botón logout
    const btn = document.createElement("button");
    btn.innerText = "Logout";

    btn.onclick = logout;

    document.body.appendChild(btn);

  } else {

    console.log("No logueado");

  }

});
