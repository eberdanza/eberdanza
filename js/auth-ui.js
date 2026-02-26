import { observeAuth, logout } from "./auth.js";

export function initAuthUI() {

  const authArea = document.getElementById("authArea");

  if (!authArea) {
    console.warn("authArea no encontrado");
    return;
  }

  observeAuth(user => {

    if (user) {

      authArea.innerHTML = `
        <div class="auth-user">
          <span class="auth-email">${user.email}</span>
          <button id="logoutBtn" class="auth-btn logout">
            Salir
          </button>
        </div>
      `;

      document
        .getElementById("logoutBtn")
        .onclick = logout;

    } else {

      authArea.innerHTML = `
        <a href="login.html?redirect=${encodeURIComponent(window.location.href)}" class="auth-btn login">
          Iniciar Sesión
        </a>
      `;

    }

  });

}