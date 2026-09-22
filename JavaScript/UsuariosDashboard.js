// ===== UsuariosDashboard: Ver usuarios registrados =====
// (ValidarLogin.js ya siembra localStorage["usuarios"] con los
// usuarios base, así que aquí solo hace falta leerlo)

function formatearFecha(fechaISO) {
  const [anio, mes, dia] = fechaISO.split("-");
  return `${dia}-${mes}-${anio}`;
}

// Cuenta cuántos pedidos ha hecho un usuario, buscando por su correo
function contarPedidosDeUsuario(correo) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  return pedidos.filter((p) => p.correo === correo).length;
}

function renderizarTablaUsuarios() {
  const tabla = document.getElementById("tablaUsuarios");
  if (!tabla) return;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  tabla.innerHTML = "";

  if (usuarios.length === 0) {
    tabla.innerHTML = `
      <tr><td colspan="4" class="text-center text-muted py-3">
        Aún no hay usuarios registrados.
      </td></tr>`;
    return;
  }

  usuarios.forEach((usuario) => {
    const cantidadPedidos = contarPedidosDeUsuario(usuario.email);

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td class="fw-semibold">${usuario.nombre}</td>
      <td>${usuario.email}</td>
      <td class="text-center">${cantidadPedidos}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-secondary btn-ver-historial" data-correo="${usuario.email}" data-nombre="${usuario.nombre}">
          <i class="bi bi-clock-history"></i> Ver historial
        </button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarTablaUsuarios();

  const tabla = document.getElementById("tablaUsuarios");
  const modalEl = document.getElementById("modalHistorialUsuario");
  if (!tabla || !modalEl) return;

  const modalHistorial = new bootstrap.Modal(modalEl);
  const historialBody = document.getElementById("historialUsuarioBody");

  tabla.addEventListener("click", (e) => {
    const boton = e.target.closest(".btn-ver-historial");
    if (!boton) return;

    const correo = boton.dataset.correo;
    const nombre = boton.dataset.nombre;

    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const pedidosUsuario = pedidos
      .filter((p) => p.correo === correo)
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    modalEl.querySelector(".modal-title").textContent = `Historial de pedidos de ${nombre}`;

    if (pedidosUsuario.length === 0) {
      historialBody.innerHTML = `<p class="text-center text-muted my-3">Este usuario aún no ha realizado pedidos.</p>`;
    } else {
      historialBody.innerHTML = `
        <div class="table-responsive">
          <table class="table table-sm align-middle">
            <thead>
              <tr>
                <th>N° Pedido</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${pedidosUsuario.map((pedido) => `
                <tr>
                  <td class="fw-semibold">#${pedido.numero}</td>
                  <td>${formatearFecha(pedido.fecha)}</td>
                  <td>${pedido.estado}</td>
                  <td>$${Number(pedido.total).toLocaleString("es-CL")}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    modalHistorial.show();
  });
});
