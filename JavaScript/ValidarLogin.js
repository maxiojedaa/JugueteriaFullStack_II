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

  // 2. FUNCIÓN PARA ACTUALIZAR EL NAVBAR SI HAY SESIÓN ACTIVA
  function actualizarUINavbar() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const contenedor = document.getElementById("contenedorUsuario");

    if (contenedor && usuarioLogueado) {
      contenedor.innerHTML = `
        <a href="Usuario.html" class="text-dark fw-bold text-decoration-none d-flex align-items-center gap-2" title="Perfil">
          <i class="bi bi-robot fs-4"></i>
          <span>${usuarioLogueado.nombre}</span>
        </a>
      `;
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

  // 3. Manejo del formulario de Login
  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailIngresado = document.getElementById("emailLogin").value.trim();
      const passIngresada = document.getElementById("pwdLogin").value.trim();

      const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || cuentasPorDefecto;

      // Buscar usuario
      const usuarioEncontrado = listaUsuarios.find(
        u => u.email.toLowerCase() === emailIngresado.toLowerCase()
      );

      if (!usuarioEncontrado) {
        alert("Error: El correo electrónico no está registrado.");
        return;
      }

      if (usuarioEncontrado.pass !== passIngresada) {
        alert("Error: Contraseña incorrecta.");
        return;
      }

      // Crear objeto de sesión activa
      const usuarioLogueado = {
        nombre: usuarioEncontrado.nombre || emailIngresado.split("@")[0],
        correo: usuarioEncontrado.email,
        rol: usuarioEncontrado.rol || (emailIngresado.includes("admin") ? "Administrador" : "Cliente")
      };

      localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));

      // Redireccionar
      // Redireccionar (Todos entran a la tienda)
      window.location.href = "PaginaPrincipal.html";
    });
  }
});