document.addEventListener("DOMContentLoaded", () => {
  // 1. Cuentas por defecto si localStorage está vacío
  const cuentasPorDefecto = [
    { email: "admin@gmail.com", pass: "123456", nombre: "Administrador", rol: "Administrador" },
    { email: "usuario@gmail.com", pass: "clavelogin", nombre: "usuario", rol: "Cliente" }
  ];

  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios"));
  if (!usuariosGuardados) {
    localStorage.setItem("usuarios", JSON.stringify(cuentasPorDefecto));
  }

  // 2. FUNCIÓN PARA MOSTRAR ALERTAS TOAST DE BOOTSTRAP
  function lanzarToast(mensaje, esExito = true) {
    const toastEl = document.getElementById("appToast");
    const toastMsg = document.getElementById("toastMessage");

    if (!toastEl || !toastMsg) return;

    toastMsg.textContent = mensaje;
    toastEl.className = `toast align-items-center text-white border-0 bg-${esExito ? 'success' : 'danger'}`;

    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
  }

  // 3. FUNCIÓN PARA ACTUALIZAR EL NAVBAR SI HAY SESIÓN ACTIVA
  function actualizarUINavbar() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const contenedor = document.getElementById("contenedorUsuario");

    if (contenedor && usuarioLogueado) {
      contenedor.innerHTML = `
        <a href="Usuario.html" class="text-dark fw-bold text-decoration-none d-flex align-items-center gap-2" title="Perfil">
          <i class="bi bi-person-circle fs-4"></i>
          <span>${usuarioLogueado.nombre}</span>
        </a>
      `;
    }

    // Mostrar el botón de acceso al Dashboard solo si el usuario es Administrador
    const navDashboard = document.getElementById("navDashboardAdmin");
    if (navDashboard) {
      const esAdministrador = usuarioLogueado && usuarioLogueado.rol === "Administrador";
      navDashboard.classList.toggle("d-none", !esAdministrador);
    }
  }

  // Ejecutamos la actualización al cargar la vista
  actualizarUINavbar();

  // 4. Mostrar el total de usuarios registrados (usado en el Dashboard)
  function renderizarUsuariosTotal() {
    const elemento = document.getElementById("usuariosTotal");
    if (!elemento) return;

    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || cuentasPorDefecto;
    elemento.textContent = listaUsuarios.length;
  }

  renderizarUsuariosTotal();

  // 5. Manejo del formulario de Login
  const formLogin = document.getElementById("formLogin") || document.querySelector("form");

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailIngresado = (document.getElementById("emailLogin") || document.getElementById("email") || {}).value?.trim() || "";
      const passIngresada = (document.getElementById("pwdLogin") || document.getElementById("pwd") || {}).value?.trim() || "";

      const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || cuentasPorDefecto;

      // Buscar usuario en el listado
      const usuarioEncontrado = listaUsuarios.find(
        u => u.email.toLowerCase() === emailIngresado.toLowerCase()
      );

      if (!usuarioEncontrado) {
        lanzarToast("El correo electrónico no está registrado.", false);
        return;
      }

      if (usuarioEncontrado.pass !== passIngresada) {
        lanzarToast("Contraseña incorrecta. Inténtalo de nuevo.", false);
        return;
      }

      // Crear objeto de sesión activa
      const usuarioLogueado = {
        nombre: usuarioEncontrado.nombre || emailIngresado.split("@")[0],
        correo: usuarioEncontrado.email,
        rol: usuarioEncontrado.rol || (emailIngresado.includes("admin") ? "Administrador" : "Cliente")
      };

      localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));

      lanzarToast("¡Inicio de sesión exitoso! Redirigiendo...", true);

      setTimeout(() => {
        window.location.href = "PaginaPrincipal.html";
      }, 1500);
    });
  }
});