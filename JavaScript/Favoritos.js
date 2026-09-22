// ==========================================
// SISTEMA DE FAVORITOS
// ==========================================

// Obtener favoritos guardados
function obtenerFavoritos() {
    return JSON.parse(localStorage.getItem("favoritos")) || [];
}


// Guardar favoritos
function guardarFavoritos(favoritos) {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}


// Saber si un producto ya está guardado
function esFavorito(idProducto) {

    const favoritos = obtenerFavoritos();

    return favoritos.some(
        producto => producto.id === idProducto
    );
}


// Agregar o eliminar favorito
function alternarFavorito(producto, boton) {

    let favoritos = obtenerFavoritos();

    const indice = favoritos.findIndex(
        favorito => favorito.id === producto.id
    );

    if (indice !== -1) {

        // Ya estaba guardado → eliminar
        favoritos.splice(indice, 1);

    } else {

        // No estaba guardado → agregar
        favoritos.push(producto);
    }

    guardarFavoritos(favoritos);

    actualizarEstadoBoton(boton, producto.id);
    actualizarContadorFavoritos();
}


// Cambiar corazón vacío / lleno
function actualizarEstadoBoton(boton, idProducto) {

    const icono = boton.querySelector("i");

    if (esFavorito(idProducto)) {

        icono.classList.remove("bi-heart");
        icono.classList.add("bi-heart-fill");

        boton.classList.add("favorito-activo");

    } else {

        icono.classList.remove("bi-heart-fill");
        icono.classList.add("bi-heart");

        boton.classList.remove("favorito-activo");
    }
}


// Actualizar contador de favoritos
function actualizarContadorFavoritos() {

    const contador = document.getElementById("contador-favoritos");

    if (!contador) return;

    contador.textContent = obtenerFavoritos().length;
}


// ==========================================
// CREAR BOTÓN DE FAVORITOS EN TODAS LAS TARJETAS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const tarjetas = document.querySelectorAll(".card");

    tarjetas.forEach(tarjeta => {

        // Buscar enlace al detalle del producto
        const enlaceProducto = tarjeta.querySelector(
            'a[href*="DetalleProducto.html?id="]'
        );

        // Si no es una tarjeta de producto, la ignoramos
        if (!enlaceProducto) return;


        // Obtener ID desde la URL
        const url = new URL(
            enlaceProducto.getAttribute("href"),
            window.location.href
        );

        const idProducto = url.searchParams.get("id");

        if (!idProducto) return;


        // Obtener información del producto
        const titulo = tarjeta.querySelector(".card-title");

        const precio = tarjeta.querySelector(".card-text");

        const imagen = tarjeta.querySelector(".card-img-top");

        const cuerpo = tarjeta.querySelector(".card-body");


        if (!titulo || !precio || !imagen || !cuerpo) return;


        // Evitar crear dos corazones
        if (tarjeta.querySelector(".btn-favorito")) return;


        const producto = {

            id: idProducto,

            nombre: titulo.textContent.trim(),

            precio: precio.textContent.trim(),

            imagen: imagen.getAttribute("src")

        };


        // ======================================
        // CREAR BOTÓN
        // ======================================

        const botonFavorito = document.createElement("button");

        botonFavorito.type = "button";

        botonFavorito.className =
            "btn btn-light rounded-circle btn-favorito ms-3";

        botonFavorito.innerHTML =
            '<i class="bi bi-heart"></i>';


        // ======================================
        // UBICARLO AL LADO DEL NOMBRE Y PRECIO
        // ======================================

        const informacionProducto = cuerpo.firstElementChild;

        if (!informacionProducto) return;


        const filaSuperior = document.createElement("div");

        filaSuperior.className =
            "d-flex justify-content-between align-items-start";


        // Insertamos la nueva fila
        cuerpo.insertBefore(
            filaSuperior,
            informacionProducto
        );


        // Movemos nombre/precio dentro
        filaSuperior.appendChild(informacionProducto);


        // Agregamos corazón
        filaSuperior.appendChild(botonFavorito);


        // ======================================
        // ESTADO INICIAL
        // ======================================

        actualizarEstadoBoton(
            botonFavorito,
            idProducto
        );


        // ======================================
        // CLICK
        // ======================================

        botonFavorito.addEventListener("click", () => {

            alternarFavorito(
                producto,
                botonFavorito
            );

        });

    });


    actualizarContadorFavoritos();

});

// ==========================================
// MOSTRAR PÁGINA DE FAVORITOS
// ==========================================

function mostrarPaginaFavoritos() {

    const contenedor = document.getElementById("lista-favoritos");
    const mensajeVacio = document.getElementById("favoritos-vacios");

    // Si no estamos dentro de Favoritos.html,
    // esta función no hace nada
    if (!contenedor) return;


    const favoritos = obtenerFavoritos();

    contenedor.innerHTML = "";


    // Si no existen favoritos
    if (favoritos.length === 0) {

        if (mensajeVacio) {
            mensajeVacio.classList.remove("d-none");
        }

        return;
    }


    if (mensajeVacio) {
        mensajeVacio.classList.add("d-none");
    }


    // Crear una tarjeta por cada favorito
    favoritos.forEach(producto => {

        const columna = document.createElement("div");

        columna.className = "col-md-6 col-lg-4";


        columna.innerHTML = `

            <div class="card h-100 shadow-sm">

                <a href="DetalleProducto.html?id=${producto.id}">

                    <img
                        src="${producto.imagen}"
                        class="card-img-top"
                        style="height: 220px; object-fit: cover;"
                        alt="${producto.nombre}">

                </a>


                <div class="card-body d-flex flex-column">

                    <div class="d-flex justify-content-between align-items-start">

                        <div>

                            <a
                                href="DetalleProducto.html?id=${producto.id}"
                                class="text-decoration-none text-dark">

                                <h5 class="card-title fw-bold">
                                    ${producto.nombre}
                                </h5>

                            </a>

                            <p class="card-text text-muted">
                                ${producto.precio}
                            </p>

                        </div>


                        <button
                            type="button"
                            class="btn btn-light rounded-circle btn-favorito favorito-activo"
                            onclick="eliminarDesdeFavoritos('${producto.id}')"
                            title="Quitar de favoritos">

                            <i class="bi bi-heart-fill"></i>

                        </button>

                    </div>


                    <a
                        href="DetalleProducto.html?id=${producto.id}"
                        class="btn btn-primary w-100 mt-auto">

                        <i class="bi bi-eye me-1"></i>
                        Ver Producto

                    </a>

                </div>

            </div>

        `;


        contenedor.appendChild(columna);

    });

}

// Eliminar producto directamente desde Favoritos.html
function eliminarDesdeFavoritos(idProducto) {

    let favoritos = obtenerFavoritos();

    favoritos = favoritos.filter(
        producto => producto.id !== idProducto
    );

    guardarFavoritos(favoritos);

    mostrarPaginaFavoritos();
    actualizarContadorFavoritos();
}

document.addEventListener("DOMContentLoaded", () => {

    const tarjetas = document.querySelectorAll(".card");

    tarjetas.forEach(tarjeta => {

        // Aquí está el código de los corazones
        // que ya hicimos anteriormente

    });

    actualizarContadorFavoritos();

    // Cargar los productos cuando estamos en Favoritos.html
    mostrarPaginaFavoritos();

});