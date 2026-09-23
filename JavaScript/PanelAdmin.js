document.addEventListener("DOMContentLoaded", () => {
  const formProducto = document.getElementById("formProducto");
  const inputId = document.getElementById("productoId");
  const inputNombre = document.getElementById("nombreProducto");
  const inputPrecio = document.getElementById("precioProducto");
  const inputImagen = document.getElementById("imagenProducto");
  const tablaProductos = document.getElementById("tablaProductos");
  const formTitulo = document.getElementById("formTitulo");
  const btnGuardar = document.getElementById("btnGuardar");
  const btnCancelar = document.getElementById("btnCancelar");

  // Lista base inicial si no existen productos en localStorage
  const productosBase = [
    { id: 1, nombre: "Pinta tu Juguete", precio: 12990, imagen: "PintaTuJuguete.jpg" },
    { id: 2, nombre: "Robot de Madera", precio: 15990, imagen: "RobotMadera.jpg" },
    { id: 3, nombre: "Colección Creativa", precio: 19990, imagen: "Coleccion Creativa.jpg" },
    { id: 4, nombre: "Kit de Dinosaurios para Armar", precio: 18990, imagen: "Dinosaurios.jpg" },
    { id: 5, nombre: "Tren de Madera Magnético", precio: 21990, imagen: "TrenMadera.jpg" },
    { id: 6, nombre: "Mini Laboratorio de Ciencias", precio: 24990, imagen: "LaboratorioCiencias.jpg" }
  ];

  // Cargar productos de localStorage
  let productos = JSON.parse(localStorage.getItem("productos")) || productosBase;

  const guardarEnStorage = () => {
    localStorage.setItem("productos", JSON.stringify(productos));
  };

  const renderizarTabla = () => {
    tablaProductos.innerHTML = "";
    productos.forEach((prod) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img src="../Img/${prod.imagen}" alt="${prod.nombre}" style="width: 45px; height: 45px; object-fit: cover;" class="rounded-3 border"></td>
        <td class="fw-semibold">${prod.nombre}</td>
        <td>$${prod.precio.toLocaleString("es-CL")}</td>
        <td class="text-center">
          <button class="btn btn-sm btn-warning me-1 fw-semibold" onclick="editarProducto(${prod.id})">
            <i class="bi bi-pencil-square"></i> Editar
          </button>
          <button class="btn btn-sm btn-danger fw-semibold" onclick="eliminarProducto(${prod.id})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      tablaProductos.appendChild(tr);
    });
    guardarEnStorage();
  };

  formProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = inputId.value;
    const nombre = inputNombre.value.trim();
    const precio = parseInt(inputPrecio.value);
    const imagen = inputImagen.value.trim();

    if (id) {
      // Editar existente
      productos = productos.map((p) => (p.id == id ? { id: parseInt(id), nombre, precio, imagen } : p));
    } else {
      // Crear nuevo
      const nuevoId = productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;
      productos.push({ id: nuevoId, nombre, precio, imagen });
    }

    limpiarFormulario();
    renderizarTabla();
  });

  window.editarProducto = (id) => {
    const prod = productos.find((p) => p.id === id);
    if (prod) {
      inputId.value = prod.id;
      inputNombre.value = prod.nombre;
      inputPrecio.value = prod.precio;
      inputImagen.value = prod.imagen;

      formTitulo.textContent = "Editar Producto";
      btnGuardar.textContent = "Actualizar Producto";
      btnCancelar.classList.remove("d-none");
    }
  };

  window.eliminarProducto = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      productos = productos.filter((p) => p.id !== id);
      renderizarTabla();
    }
  };

  const limpiarFormulario = () => {
    inputId.value = "";
    formProducto.reset();
    formTitulo.textContent = "Agregar Producto";
    btnGuardar.textContent = "Guardar Producto";
    btnCancelar.classList.add("d-none");
  };

  btnCancelar.addEventListener("click", limpiarFormulario);

  renderizarTabla();
});