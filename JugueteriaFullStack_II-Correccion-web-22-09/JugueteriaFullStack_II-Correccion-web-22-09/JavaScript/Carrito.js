// Inventario simulado
const productosDisponibles = [
  { id: 1, nombre: "Pinta tu Juguete", precio: 12990, stock: 5, imagen: "../Img/Pinta tu juguete 1.jpe" },

  { id: 2, nombre: "Robot de Madera", precio: 15990, stock: 3, imagen: "../Img/Robot madera 1.jpe" },

  { id: 3, nombre: "Colección Creativa", precio: 19990, stock: 8, imagen: "../Img/Pinta tu juguete 2.jpg" },

  { id: 4, nombre: "Kit de Dinosaurios para Armar", precio: 18990, stock: 6, imagen: "../Img/kit de dinosarios para armar.png" },

  { id: 5, nombre: "Tren de Madera Magnético", precio: 21990, stock: 7, imagen: "../Img/tren de madera magnetico.png" },

  { id: 6, nombre: "Mini Laboratorio de Ciencias", precio: 24990, stock: 5, imagen: "../Img/Mini laboratorio de ciencias.png" }
];

// Obtener el inventario actual (si no existe en localStorage, se crea desde la base)
function obtenerProductosDisponibles() {
  const guardados = JSON.parse(localStorage.getItem("productosDisponibles"));
  if (guardados) return guardados;
  localStorage.setItem("productosDisponibles", JSON.stringify(productosDisponibles));
  return productosDisponibles;
}

// Guardar el inventario actualizado (por ejemplo, tras descontar stock)
function guardarProductosDisponibles(productos) {
  localStorage.setItem("productosDisponibles", JSON.stringify(productos));
}

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
  const productoBase = obtenerProductosDisponibles().find(p => p.id === productoId);
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
  const productoBase = obtenerProductosDisponibles().find(p => p.id === productoId);

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
function confirmarPedido(mostrarAlerta = true) {
  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return false;
  }

  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (!usuarioLogueado) {
    alert("Debes iniciar sesión para confirmar tu pedido.");
    return false;
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

  // Descontar el stock de cada producto comprado
  const inventario = obtenerProductosDisponibles();
  carrito.forEach(item => {
    const producto = inventario.find(p => p.id === item.id);
    if (producto) {
      producto.stock = Math.max(0, producto.stock - item.cantidad);
    }
  });
  guardarProductosDisponibles(inventario);

  localStorage.removeItem("carrito");
  renderizarCarritoModal();

  if (mostrarAlerta) {
    alert(`¡Pedido #${nuevoPedido.numero} confirmado con éxito!`);
  }

  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
});


function procesarPago() {
    // 1. Confirmar el pedido: esto valida el carrito y la sesión,
    //    guarda el pedido en localStorage y descuenta el stock.
    //    Le pasamos "false" para que no muestre su propio alert,
    //    porque acá abajo mostramos el mensaje de pago en su lugar.
    const pedidoConfirmado = confirmarPedido(false);

    // Si confirmarPedido() no pudo completarse (carrito vacío o sin
    // sesión), ya mostró su propio alert explicando por qué, así que
    // no seguimos con el mensaje de pago.
    if (!pedidoConfirmado) {
        return;
    }

    // 2. Mostrar el mensaje de confirmación de pago
    alert('¡Pago realizado correctamente! Muchas gracias por tu compra en Pixel&Toys.');

    // 3. Cerrar el modal de Bootstrap automáticamente
    const modalElement = document.getElementById('modalCarrito');
    if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
    }
}

// Paso 1 -> Paso 2: Mostrar formulario de pago si hay productos
function irAMetodoPago() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de pagar.');
        return;
    }

    // Actualizar el total en la vista de pago
    const totalActual = document.getElementById('totalCarrito').textContent;
    document.getElementById('totalPagoCheckout').textContent = totalActual;

    // Cambiar de sección
    document.getElementById('modalCarritoLabel').textContent = 'Paso 2: Método de Pago';
    document.getElementById('seccionListaCarrito').classList.add('d-none');
    document.getElementById('seccionMetodoPago').classList.remove('d-none');
}

// Volver al Paso 1
function volverAlCarrito() {
    document.getElementById('modalCarritoLabel').textContent = 'Tu Carrito';
    document.getElementById('seccionMetodoPago').classList.add('d-none');
    document.getElementById('seccionListaCarrito').classList.remove('d-none');
}

// Alternar campos dinámicos según el método seleccionado
function mostrarCamposPagoCheckout() {
    const seleccion = document.getElementById('selectPagoCheckout').value;

    document.getElementById('camposTarjetaCheckout').classList.add('d-none');
    document.getElementById('camposBilleteraCheckout').classList.add('d-none');
    document.getElementById('camposTransferenciaCheckout').classList.add('d-none');

    if (seleccion === 'tarjeta') {
        document.getElementById('camposTarjetaCheckout').classList.remove('d-none');
    } else if (seleccion === 'billetera') {
        document.getElementById('camposBilleteraCheckout').classList.remove('d-none');
    } else if (seleccion === 'transferencia') {
        document.getElementById('camposTransferenciaCheckout').classList.remove('d-none');
    }
}

// Confirmar el pago, vaciar el carrito y cerrar el modal
function confirmarPagoFinal(e) {
    e.preventDefault();

    const metodo = document.getElementById('selectPagoCheckout').value;
    if (!metodo) {
        alert('Por favor selecciona un método de pago.');
        return;
    }

    if (metodo === 'tarjeta') {
        const num = document.getElementById('numTarjetaCheckout').value;
        if (num.length < 15) {
            alert('Ingresa un número de tarjeta válido.');
            return;
        }
    }

    // 1. Mostrar pantalla de éxito
    document.getElementById('seccionMetodoPago').classList.add('d-none');
    document.getElementById('seccionExitoPago').classList.remove('d-none');

    // 2. Vaciar el carrito de localStorage
    localStorage.removeItem('carrito');

    // 3. Resetear contador del badge
    const contador = document.getElementById('contadorCarrito');
    if (contador) contador.textContent = '0';

    // 4. Cerrar el modal tras 2.5 segundos y resetear a su estado original
    setTimeout(() => {
        const modalElement = document.getElementById('modalCarrito');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();

        // Restablecer vistas del modal para la próxima vez que se abra
        document.getElementById('seccionExitoPago').classList.add('d-none');
        document.getElementById('seccionListaCarrito').classList.remove('d-none');
        document.getElementById('modalCarritoLabel').textContent = 'Tu Carrito';
        document.getElementById('formCheckoutPago').reset();
        mostrarCamposPagoCheckout();

        // Volver a renderizar la lista vacía
        renderizarCarritoModal();
    }, 2500);
}