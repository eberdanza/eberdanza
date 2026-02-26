import { observeAuth, logout } from "./auth.js";

const authArea = document.getElementById("authArea");

observeAuth(user => {

  if (!authArea) return;

  if (user) {

    authArea.innerHTML = `
      <div class="auth-user">
        <span class="auth-email">${user.email}</span>
        <button id="logoutBtn" class="auth-btn logout">
          Logout
        </button>
      </div>
    `;

    document
      .getElementById("logoutBtn")
      .onclick = logout;

  } else {

    authArea.innerHTML = `
      <a href="login.html" class="auth-btn login">
        Login
      </a>
    `;

  }

});
