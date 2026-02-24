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
