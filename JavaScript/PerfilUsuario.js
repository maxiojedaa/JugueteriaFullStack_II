document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuario) {
    window.location.href = "Usuario.html";
    return;
  }

  // Actualizar elementos visuales del perfil
  const elNombre = document.getElementById("perfilNombre") || document.querySelector("h3");
  const elRol = document.getElementById("perfilRol") || document.querySelector(".badge");
  const inputNombre = document.getElementById("inputNombre") || document.querySelectorAll("input")[0];
  const inputCorreo = document.getElementById("inputCorreo") || document.querySelectorAll("input")[1];

  if (elNombre) elNombre.textContent = usuario.nombre;
  if (elRol) {
    elRol.textContent = usuario.rol;
    elRol.className = usuario.rol === "Administrador" ? "badge bg-danger" : "badge bg-primary";
  }
  if (inputNombre) inputNombre.value = usuario.nombre;
  if (inputCorreo) inputCorreo.value = usuario.correo;

  // Mostrar botón de Panel Admin en el centro si es Administrador
  if (usuario.rol === "Administrador") {
    const contenedorBotones = document.querySelector(".card-body") || document.querySelector("main");
    if (contenedorBotones && !document.getElementById("btnIrAdminPerfil")) {
      const btnAdminPerfil = document.createElement("a");
      btnAdminPerfil.id = "btnIrAdminPerfil";
      btnAdminPerfil.href = "PanelAdmin.html";
      btnAdminPerfil.className = "btn btn-warning w-100 fw-bold mb-2";
      btnAdminPerfil.innerHTML = `<i class="bi bi-gear-fill me-1"></i> Ir al Panel de Administración`;
      
      const btnVolver = document.querySelector("a[href='PaginaPrincipal.html']") || document.getElementById("btnVolver");
      if (btnVolver) {
        btnVolver.parentNode.insertBefore(btnAdminPerfil, btnVolver);
      }
    }
  }

  // --- LÓGICA DEL MÉTODO DE PAGO ---
document.addEventListener("DOMContentLoaded", () => {
  const selectPago = document.getElementById("selectMetodoPago");
  if (selectPago) {
    const metodoGuardado = localStorage.getItem("metodoPago");
    if (metodoGuardado) {
      selectPago.value = metodoGuardado;
    }
  }
});

function guardarMetodoPago() {
  const combo = document.getElementById("selectMetodoPago");
  if (!combo) return;

  const valor = combo.value;
  if (!valor) {
    alert("Por favor selecciona un método de pago.");
    return;
  }

  localStorage.setItem("metodoPago", valor);

  const alerta = document.getElementById("alertaPago");
  if (alerta) {
    alerta.classList.remove("d-none");
    setTimeout(() => alerta.classList.add("d-none"), 3000);
  }
}
});

