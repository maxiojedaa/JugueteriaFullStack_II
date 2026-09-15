document.addEventListener("DOMContentLoaded", function () {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  const iconoPerfil = document.getElementById("iconoPerfil");
  const menuUsuario = document.getElementById("menuUsuario");
  const nombreUsuarioMenu = document.getElementById("nombreUsuarioMenu");
  const btnVerPerfil = document.getElementById("btnVerPerfil");
  const btnCerrarSesion = document.getElementById("btnCerrarSesion");

  if (iconoPerfil) {
    iconoPerfil.addEventListener("click", function (e) {
      e.stopPropagation();

      if (!usuarioActivo) {
        // Redirige al login si no hay sesión
        window.location.href = "Usuario.html";
      } else {
        // Despliega el menú si hay sesión activa
        menuUsuario.classList.toggle("d-none");
        nombreUsuarioMenu.textContent = usuarioActivo.nombre || usuarioActivo.email || "Usuario";
      }
    });
  }

  // Ocultar menú al hacer clic fuera
  document.addEventListener("click", function (e) {
    if (menuUsuario && !menuUsuario.contains(e.target) && e.target !== iconoPerfil) {
      menuUsuario.classList.add("d-none");
    }
  });

  // Ir a la vista de Perfil (HU-2 a HU-8)
  if (btnVerPerfil) {
    btnVerPerfil.addEventListener("click", function () {
      window.location.href = "Perfil.html";
    });
  }

  // Cerrar sesión
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", function () {
      localStorage.removeItem("usuarioActivo");
      window.location.href = "Usuario.html";
    });
  }
});