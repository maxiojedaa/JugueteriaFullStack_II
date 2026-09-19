// ===== HU17: Ver últimos pedidos realizados =====

const colorEstado = {
  "Pendiente": "bg-warning text-dark",
  "Enviado": "bg-info text-dark",
  "Entregado": "bg-success",
  "Cancelado": "bg-danger",
};

function formatearFecha(fechaISO) {
  const [anio, mes, dia] = fechaISO.split("-");
  return `${dia}-${mes}-${anio}`;
}

function renderizarTablaPedidos() {
  const tabla = document.getElementById("tablaPedidos");
  if (!tabla) return;

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  // Ordenar del más reciente al más antiguo
  const pedidosOrdenados = [...pedidos].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  tabla.innerHTML = "";

  if (pedidosOrdenados.length === 0) {
    tabla.innerHTML = `
      <tr><td colspan="5" class="text-center text-muted py-3">
        Aún no se han registrado pedidos.
      </td></tr>`;
    return;
  }

  pedidosOrdenados.forEach((pedido) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td class="fw-semibold">#${pedido.numero}</td>
      <td>${pedido.usuario}</td>
      <td>${formatearFecha(pedido.fecha)}</td>
      <td><span class="badge ${colorEstado[pedido.estado] || "bg-secondary"}">${pedido.estado}</span></td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-secondary btn-ver-detalle" data-numero="${pedido.numero}">
          <i class="bi bi-eye"></i> Ver
        </button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarTablaPedidos();

  const tabla = document.getElementById("tablaPedidos");
  const modalEl = document.getElementById("modalDetallePedido");
  if (!tabla || !modalEl) return;

  const modalDetalle = new bootstrap.Modal(modalEl);
  const detalleBody = document.getElementById("detallePedidoBody");

  tabla.addEventListener("click", (e) => {
    const boton = e.target.closest(".btn-ver-detalle");
    if (!boton) return;

    const numero = Number(boton.dataset.numero);
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const pedido = pedidos.find((p) => p.numero === numero);
    if (!pedido) return;

    detalleBody.innerHTML = `
      <p><strong>N° Pedido:</strong> #${pedido.numero}</p>
      <p><strong>Usuario:</strong> ${pedido.usuario}</p>
      <p><strong>Fecha:</strong> ${formatearFecha(pedido.fecha)}</p>
      <p><strong>Estado:</strong> ${pedido.estado}</p>
      <p><strong>Total:</strong> $${Number(pedido.total).toLocaleString("es-CL")}</p>
      <p><strong>Productos:</strong></p>
      <ul>
        ${pedido.productos.map(p => `<li>${p.nombre} x${p.cantidad}</li>`).join("")}
      </ul>
    `;
    modalDetalle.show();
  });
});
