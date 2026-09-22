document.addEventListener("DOMContentLoaded", function () {
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  const iconoPerfil = document.getElementById("iconoPerfil");
  const menuUsuario = document.getElementById("menuUsuario");
  const nombreUsuarioMenu = document.getElementById("nombreUsuarioMenu");
  const textoLogin = document.getElementById("textoLogin");
  const btnVerPerfil = document.getElementById("btnVerPerfil");
  const btnCerrarSesion = document.getElementById("btnCerrarSesion");

  if (usuarioLogueado) {
    // Si hay sesión activa
    if (textoLogin) textoLogin.textContent = usuarioLogueado.nombre;

    if (iconoPerfil) {
      iconoPerfil.addEventListener("click", function (e) {
        e.stopPropagation();
        if (menuUsuario) {
          menuUsuario.classList.toggle("d-none");
          if (nombreUsuarioMenu) {
            nombreUsuarioMenu.textContent = usuarioLogueado.nombre || "Usuario";
          }
        }
      });
    }
  } else {
    // Si NO hay sesión activa, redirige al login
    if (iconoPerfil) {
      iconoPerfil.addEventListener("click", function () {
        window.location.href = "Usuario.html";
      });
    }
  }

  // Ocultar el menú desplegable si se hace clic fuera
  document.addEventListener("click", function (e) {
    if (menuUsuario && !menuUsuario.contains(e.target) && iconoPerfil && !iconoPerfil.contains(e.target)) {
      menuUsuario.classList.add("d-none");
    }
  });

  // Ir a la vista del Perfil
  if (btnVerPerfil) {
    btnVerPerfil.addEventListener("click", function () {
      window.location.href = "PerfilUsuario.html";
    });
  }

  // Cerrar Sesión
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", function () {
      localStorage.removeItem("usuarioLogueado");
      window.location.reload();
    });
  }
});