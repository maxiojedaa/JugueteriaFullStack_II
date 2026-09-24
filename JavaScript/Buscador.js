document.addEventListener("DOMContentLoaded", () => {

    const inputBuscador = document.getElementById("inputBuscador");
    const formBuscador = document.getElementById("formBuscador");

    const listaProductos = document.getElementById("listaProductos");
    const sinResultados = document.getElementById("sinResultados");
    const tituloProductos = document.getElementById("tituloProductos");

    if (!inputBuscador || !formBuscador) return;


    // ==========================================
    // NORMALIZAR TEXTO
    // ==========================================

    function normalizarTexto(texto) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

    }


    // ==========================================
    // LEER PARÁMETROS DE LA URL
    // ==========================================

    const parametros =
        new URLSearchParams(window.location.search);

    let categoriaActiva =
        parametros.get("categoria");

    const busquedaURL =
        parametros.get("buscar");


    // ==========================================
    // CAMBIAR TÍTULO SEGÚN CATEGORÍA
    // ==========================================

    function actualizarTitulo() {

        if (!tituloProductos) return;

        if (categoriaActiva === "educativos") {

            tituloProductos.textContent =
                "Juguetes Educativos";

        } else if (categoriaActiva === "creativos") {

            tituloProductos.textContent =
                "Juguetes Creativos";

        } else {

            tituloProductos.textContent =
                "Productos Destacados";

        }

    }


    // ==========================================
    // FILTRAR PRODUCTOS
    // ==========================================

    function filtrarProductos() {

        if (!listaProductos) return;

        const busqueda =
            normalizarTexto(inputBuscador.value);

        const productos = Array.from(
            listaProductos.querySelectorAll(".col-md-4")
        );

        let productosVisibles = 0;


        productos.forEach(producto => {

            // Texto completo de la tarjeta
            const textoProducto =
                normalizarTexto(producto.innerText);


            // Categorías de la tarjeta
            const categoriasProducto =
                (producto.dataset.categoria || "")
                    .split(" ")
                    .map(normalizarTexto);


            // ¿Coincide con la búsqueda?
            const coincideBusqueda =
                busqueda === "" ||
                textoProducto.includes(busqueda);


            // ¿Coincide con la categoría?
            const coincideCategoria =
                !categoriaActiva ||
                categoriasProducto.includes(
                    normalizarTexto(categoriaActiva)
                );


            // Debe cumplir ambas condiciones
            if (
                coincideBusqueda &&
                coincideCategoria
            ) {

                producto.classList.remove("d-none");
                productosVisibles++;

            } else {

                producto.classList.add("d-none");

            }

        });


        // ======================================
        // MENSAJE SIN RESULTADOS
        // ======================================

        if (sinResultados) {

            if (productosVisibles === 0) {

                sinResultados.classList.remove("d-none");

            } else {

                sinResultados.classList.add("d-none");

            }

        }

    }


    // ==========================================
    // BÚSQUEDA EN TIEMPO REAL
    // ==========================================

    if (listaProductos) {

        inputBuscador.addEventListener("input", () => {

            filtrarProductos();

        });

    }


    // ==========================================
    // AL PRESIONAR ENTER EN EL BUSCADOR
    // ==========================================

    formBuscador.addEventListener("submit", event => {

        event.preventDefault();

        const busqueda =
            inputBuscador.value.trim();


        // Estamos en Página Principal
        if (listaProductos) {

            const nuevosParametros =
                new URLSearchParams();


            // Mantener categoría si existe
            if (categoriaActiva) {

                nuevosParametros.set(
                    "categoria",
                    categoriaActiva
                );

            }


            // Agregar búsqueda
            if (busqueda !== "") {

                nuevosParametros.set(
                    "buscar",
                    busqueda
                );

            }


            const nuevaURL =
                nuevosParametros.toString()
                    ? `PaginaPrincipal.html?${nuevosParametros.toString()}`
                    : "PaginaPrincipal.html";


            history.replaceState(
                null,
                "",
                nuevaURL
            );


            filtrarProductos();

        }


        // Estamos en otra página
        else {

            if (busqueda === "") return;

            window.location.href =
                `PaginaPrincipal.html?buscar=${encodeURIComponent(busqueda)}`;

        }

    });


    // ==========================================
    // INICIALIZAR PÁGINA PRINCIPAL
    // ==========================================

    if (listaProductos) {

        // Si venimos con búsqueda desde otra página
        if (busquedaURL) {

            inputBuscador.value =
                busquedaURL;

        }


        actualizarTitulo();

        filtrarProductos();

    }

});