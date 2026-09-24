document.addEventListener("DOMContentLoaded", () => {

  const inputBuscador = document.getElementById("inputBuscador");
  const formBuscador = document.getElementById("formBuscador");
  const listaProductos = document.getElementById("listaProductos");
  const sinResultados = document.getElementById("sinResultados");

  if (!inputBuscador || !listaProductos) return;


  // Obtener todas las tarjetas de productos
  const productos = Array.from(
    listaProductos.querySelectorAll(".col-md-4")
  );


  // Permite buscar aunque el usuario no escriba tildes
  function normalizarTexto(texto) {

    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  }


  function buscarProductos() {

    const busqueda = normalizarTexto(inputBuscador.value);

    let productosVisibles = 0;


    productos.forEach(producto => {

      const textoProducto = normalizarTexto(producto.innerText);

      const coincide =
        busqueda === "" ||
        textoProducto.includes(busqueda);


      if (coincide) {

        producto.classList.remove("d-none");

        productosVisibles++;

      } else {

        producto.classList.add("d-none");

      }

    });


    // Mostrar mensaje si no existe ningún producto
    if (sinResultados) {

      if (productosVisibles === 0) {

        sinResultados.classList.remove("d-none");

      } else {

        sinResultados.classList.add("d-none");

      }

    }

  }


  // Buscar mientras se escribe
  inputBuscador.addEventListener("input", buscarProductos);


  // Evitar que ENTER recargue la página
  if (formBuscador) {

    formBuscador.addEventListener("submit", event => {

      event.preventDefault();

      buscarProductos();

      listaProductos.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  }

});