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
  renderizarStockTotal();
  renderizarPedidosTotal();

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



function renderizarStockTotal() {
  const elemento = document.getElementById("stockTotal");
  if (!elemento) return;
  let inventario = JSON.parse(localStorage.getItem("productosDisponibles"));
  if (!inventario) {
    inventario = productosDisponiblesBaseRespaldo;
    localStorage.setItem("productosDisponibles", JSON.stringify(inventario));
  }
  const totalStock = inventario.reduce((total, p) => total + Number(p.stock), 0);
  elemento.textContent = totalStock;
}


const productosDisponiblesBaseRespaldo = [
  { id: 1, nombre: "Pinta tu Juguete", precio: 12990, stock: 5, imagen: "../Img/Pinta tu juguete 1.jpe" },
  { id: 2, nombre: "Robot de Madera", precio: 15990, stock: 3, imagen: "../Img/Robot madera 1.jpe" },
  { id: 3, nombre: "Colección Creativa", precio: 19990, stock: 8, imagen: "../Img/Pinta tu juguete 2.jpg" },
  { id: 4, nombre: "Kit de Dinosaurios para Armar", precio: 18990, stock: 6, imagen: "../Img/kit de dinosarios para armar.png" },
  { id: 5, nombre: "Tren de Madera Magnético", precio: 21990, stock: 7, imagen: "../Img/tren de madera magnetico.png" },
  { id: 6, nombre: "Mini Laboratorio de Ciencias", precio: 24990, stock: 5, imagen: "../Img/Mini laboratorio de ciencias.png" }
];



function renderizarPedidosTotal() {
  const elemento = document.getElementById("pedidosTotal");
  if (!elemento) return;

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  elemento.textContent = pedidos.length;
}