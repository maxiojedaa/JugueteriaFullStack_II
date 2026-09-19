// Inventario simulado
/*const productosDisponibles = [
  { id: 1, nombre: "Pinta tu Juguete", precio: 12990, stock: 5, imagen: "../Img/Pinta tu juguete 1.jpe" },

  { id: 2, nombre: "Robot de Madera", precio: 15990, stock: 3, imagen: "../Img/Robot madera 1.jpe" },

  { id: 3, nombre: "Colección Creativa", precio: 19990, stock: 8, imagen: "../Img/Pinta tu juguete 2.jpg" },

  { id: 4, nombre: "Kit de Dinosaurios para Armar", precio: 18990, stock: 6, imagen: "../Img/kit de dinosarios para armar.png" },

  { id: 5, nombre: "Tren de Madera Magnético", precio: 21990, stock: 7, imagen: "../Img/tren de madera magnetico.png" },

  { id: 6, nombre: "Mini Laboratorio de Ciencias", precio: 24990, stock: 5, imagen: "../Img/Mini laboratorio de ciencias.png" }
];

// Obtener carrito asegurando que cada objeto tenga cantidad válida
function obtenerCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  return carrito.map(item => ({
    ...item,
    cantidad: Number(item.cantidad) || 1
  }));
}

// Guardar carrito
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Actualizar cantidad visible en el icono del carrito
function actualizarContadorCarrito() {

  const contador = document.getElementById("contadorCarrito");

  if (!contador) return;

  const carrito = obtenerCarrito();

  const cantidadTotal = carrito.reduce(
    (total, item) => total + Number(item.cantidad),
    0
  );

  contador.textContent = cantidadTotal;

  contador.classList.remove("d-none");

}

// Agregar producto respetando stock
function agregarAlCarrito(productoId, cantidad) {
  const cantAgregar = Number(cantidad) || 1;
  const productoBase = productosDisponibles.find(p => p.id === productoId);
  if (!productoBase) return alert("Producto no encontrado.");

  let carrito = obtenerCarrito();
  const itemEnCarrito = carrito.find(item => item.id === productoId);
  const cantidadActual = itemEnCarrito ? Number(itemEnCarrito.cantidad) : 0;

  if (cantidadActual + cantAgregar > productoBase.stock) {
    alert(`No hay suficiente stock. Disponible: ${productoBase.stock}`);
    return;
  }

  if (itemEnCarrito) {
    itemEnCarrito.cantidad = cantidadActual + cantAgregar;
  } else {
    carrito.push({
      id: productoBase.id,
      nombre: productoBase.nombre,
      precio: Number(productoBase.precio),
      imagen: productoBase.imagen,
      cantidad: cantAgregar
    });
  }

  guardarCarrito(carrito);
  alert(`${productoBase.nombre} agregado al carrito.`);
  renderizarCarritoModal();
}

// Eliminar un producto
function eliminarDelCarrito(productoId) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(item => item.id !== productoId);
  guardarCarrito(carrito);
  renderizarCarritoModal();
}

// Modificar cantidad con botones + / -
function actualizarCantidad(productoId, nuevaCantidad) {
  const numCantidad = Number(nuevaCantidad);
  const productoBase = productosDisponibles.find(p => p.id === productoId);

  if (numCantidad > productoBase.stock) {
    alert(`Stock máximo disponible: ${productoBase.stock}`);
    return;
  }

  if (numCantidad <= 0) {
    eliminarDelCarrito(productoId);
    return;
  }

  let carrito = obtenerCarrito();
  const item = carrito.find(item => item.id === productoId);
  if (item) {
    item.cantidad = numCantidad;
    guardarCarrito(carrito);
    renderizarCarritoModal();
  }
}

// Vaciar carrito
function vaciarCarrito() {
  if (confirm("¿Estás seguro de vaciar el carrito?")) {
    localStorage.removeItem("carrito");
    renderizarCarritoModal();
  }
}

// Calcular Totales
function obtenerTotalCarrito() {
  const carrito = obtenerCarrito();
  return carrito.reduce((total, item) => total + (Number(item.precio) * Number(item.cantidad)), 0);
}

// Renderizar contenido en el HTML
function renderizarCarritoModal() {

  actualizarContadorCarrito();

  const contenedor = document.getElementById("listaCarrito");
  const elementoTotal = document.getElementById("totalCarrito");
  if (!contenedor) return;

  const carrito = obtenerCarrito();
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = `<p class="text-center text-muted my-3">El carrito está vacío.</p>`;
    if (elementoTotal) elementoTotal.textContent = "$0";
    return;
  }

  carrito.forEach(item => {
    const cant = Number(item.cantidad) || 1;
    contenedor.innerHTML += `
      <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
        <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: cover;" class="rounded">
        <div class="ms-2 flex-grow-1">
          <h6 class="mb-0 small fw-bold">${item.nombre}</h6>
          <small class="text-muted">$${Number(item.precio).toLocaleString("es-CL")}</small>
        </div>
        <div class="d-flex align-items-center gap-1">
          <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="actualizarCantidad(${item.id}, ${cant - 1})">-</button>
          <span class="small px-2 fw-bold">${cant}</span>
          <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="actualizarCantidad(${item.id}, ${cant + 1})">+</button>
        </div>
        <button class="btn btn-sm btn-text text-danger ms-2" onclick="eliminarDelCarrito(${item.id})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
  });

  if (elementoTotal) {
    elementoTotal.textContent = `$${obtenerTotalCarrito().toLocaleString("es-CL")}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
});*/

// Inventario simulado
const productosDisponibles = [
  { id: 1, nombre: "Pinta tu Juguete", precio: 12990, stock: 5, imagen: "../Img/Pinta tu juguete 1.jpe" },

  { id: 2, nombre: "Robot de Madera", precio: 15990, stock: 3, imagen: "../Img/Robot madera 1.jpe" },

  { id: 3, nombre: "Colección Creativa", precio: 19990, stock: 8, imagen: "../Img/Pinta tu juguete 2.jpg" },

  { id: 4, nombre: "Kit de Dinosaurios para Armar", precio: 18990, stock: 6, imagen: "../Img/kit de dinosarios para armar.png" },

  { id: 5, nombre: "Tren de Madera Magnético", precio: 21990, stock: 7, imagen: "../Img/tren de madera magnetico.png" },

  { id: 6, nombre: "Mini Laboratorio de Ciencias", precio: 24990, stock: 5, imagen: "../Img/Mini laboratorio de ciencias.png" }
];

// Obtener carrito asegurando que cada objeto tenga cantidad válida
function obtenerCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  return carrito.map(item => ({
    ...item,
    cantidad: Number(item.cantidad) || 1
  }));
}

// Guardar carrito
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Actualizar cantidad visible en el icono del carrito
function actualizarContadorCarrito() {

  const contador = document.getElementById("contadorCarrito");

  if (!contador) return;

  const carrito = obtenerCarrito();

  const cantidadTotal = carrito.reduce(
    (total, item) => total + Number(item.cantidad),
    0
  );

  contador.textContent = cantidadTotal;

  contador.classList.remove("d-none");

}

// Agregar producto respetando stock
function agregarAlCarrito(productoId, cantidad) {
  const cantAgregar = Number(cantidad) || 1;
  const productoBase = productosDisponibles.find(p => p.id === productoId);
  if (!productoBase) return alert("Producto no encontrado.");

  let carrito = obtenerCarrito();
  const itemEnCarrito = carrito.find(item => item.id === productoId);
  const cantidadActual = itemEnCarrito ? Number(itemEnCarrito.cantidad) : 0;

  if (cantidadActual + cantAgregar > productoBase.stock) {
    alert(`No hay suficiente stock. Disponible: ${productoBase.stock}`);
    return;
  }

  if (itemEnCarrito) {
    itemEnCarrito.cantidad = cantidadActual + cantAgregar;
  } else {
    carrito.push({
      id: productoBase.id,
      nombre: productoBase.nombre,
      precio: Number(productoBase.precio),
      imagen: productoBase.imagen,
      cantidad: cantAgregar
    });
  }

  guardarCarrito(carrito);
  alert(`${productoBase.nombre} agregado al carrito.`);
  renderizarCarritoModal();
}

// Eliminar un producto
function eliminarDelCarrito(productoId) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(item => item.id !== productoId);
  guardarCarrito(carrito);
  renderizarCarritoModal();
}

// Modificar cantidad con botones + / -
function actualizarCantidad(productoId, nuevaCantidad) {
  const numCantidad = Number(nuevaCantidad);
  const productoBase = productosDisponibles.find(p => p.id === productoId);

  if (numCantidad > productoBase.stock) {
    alert(`Stock máximo disponible: ${productoBase.stock}`);
    return;
  }

  if (numCantidad <= 0) {
    eliminarDelCarrito(productoId);
    return;
  }

  let carrito = obtenerCarrito();
  const item = carrito.find(item => item.id === productoId);
  if (item) {
    item.cantidad = numCantidad;
    guardarCarrito(carrito);
    renderizarCarritoModal();
  }
}

// Vaciar carrito
function vaciarCarrito() {
  if (confirm("¿Estás seguro de vaciar el carrito?")) {
    localStorage.removeItem("carrito");
    renderizarCarritoModal();
  }
}

// Calcular Totales
function obtenerTotalCarrito() {
  const carrito = obtenerCarrito();
  return carrito.reduce((total, item) => total + (Number(item.precio) * Number(item.cantidad)), 0);
}

// Renderizar contenido en el HTML
function renderizarCarritoModal() {

  actualizarContadorCarrito();

  const contenedor = document.getElementById("listaCarrito");
  const elementoTotal = document.getElementById("totalCarrito");
  if (!contenedor) return;

  const carrito = obtenerCarrito();
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = `<p class="text-center text-muted my-3">El carrito está vacío.</p>`;
    if (elementoTotal) elementoTotal.textContent = "$0";
    return;
  }

  carrito.forEach(item => {
    const cant = Number(item.cantidad) || 1;
    contenedor.innerHTML += `
      <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
        <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: cover;" class="rounded">
        <div class="ms-2 flex-grow-1">
          <h6 class="mb-0 small fw-bold">${item.nombre}</h6>
          <small class="text-muted">$${Number(item.precio).toLocaleString("es-CL")}</small>
        </div>
        <div class="d-flex align-items-center gap-1">
          <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="actualizarCantidad(${item.id}, ${cant - 1})">-</button>
          <span class="small px-2 fw-bold">${cant}</span>
          <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="actualizarCantidad(${item.id}, ${cant + 1})">+</button>
        </div>
        <button class="btn btn-sm btn-text text-danger ms-2" onclick="eliminarDelCarrito(${item.id})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
  });

  if (elementoTotal) {
    elementoTotal.textContent = `$${obtenerTotalCarrito().toLocaleString("es-CL")}`;
  }
}

// Obtener lista de pedidos guardados
function obtenerPedidos() {
  return JSON.parse(localStorage.getItem("pedidos")) || [];
}

// Guardar lista de pedidos
function guardarPedidos(pedidos) {
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

// Confirmar el pedido: toma el carrito actual, lo registra y vacía el carrito
function confirmarPedido() {
  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (!usuarioLogueado) {
    alert("Debes iniciar sesión para confirmar tu pedido.");
    return;
  }

  const pedidos = obtenerPedidos();
  const numeroNuevo = pedidos.length > 0
    ? Math.max(...pedidos.map(p => p.numero)) + 1
    : 1001;

  const nuevoPedido = {
    numero: numeroNuevo,
    usuario: usuarioLogueado.nombre,
    correo: usuarioLogueado.correo,
    fecha: new Date().toISOString().split("T")[0],
    estado: "Pendiente",
    total: obtenerTotalCarrito(),
    productos: carrito.map(item => ({
      nombre: item.nombre,
      cantidad: item.cantidad,
      precio: item.precio
    }))
  };

  pedidos.push(nuevoPedido);
  guardarPedidos(pedidos);

  localStorage.removeItem("carrito");
  renderizarCarritoModal();

  alert(`¡Pedido #${nuevoPedido.numero} confirmado con éxito!`);
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
});