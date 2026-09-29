document.addEventListener("DOMContentLoaded", () => {
    const inputBusqueda = document.getElementById("inputBusqueda");
    const selectCategoria = document.getElementById("selectCategoria");
    const selectOrdenPrecio = document.getElementById("selectOrdenPrecio");
    const contenedor = document.getElementById("contenedorProductos");

    if (!contenedor) return;

    function filtrarProductos() {
        const texto = inputBusqueda ? inputBusqueda.value.toLowerCase().trim() : "";
        const categoria = selectCategoria ? selectCategoria.value : "todas";
        const orden = selectOrdenPrecio ? selectOrdenPrecio.value : "normal";

        let tarjetas = Array.from(contenedor.querySelectorAll(".card-producto"));

        tarjetas.forEach(tarjeta => {
            const titulo = tarjeta.querySelector(".card-title").textContent.toLowerCase();
            const catProducto = tarjeta.getAttribute("data-categoria");

            const coincideTexto = titulo.includes(texto);
            const coincideCat = (categoria === "todas" || catProducto === categoria);

            if (coincideTexto && coincideCat) {
                tarjeta.parentElement.classList.remove("d-none");
            } else {
                tarjeta.parentElement.classList.add("d-none");
            }
        });

        // Ordenar por precio
        if (orden !== "normal") {
            tarjetas.sort((a, b) => {
                const precioA = parseInt(a.getAttribute("data-precio"));
                const precioB = parseInt(b.getAttribute("data-precio"));
                return orden === "asc" ? precioA - precioB : precioB - precioA;
            });

            tarjetas.forEach(tarjeta => contenedor.appendChild(tarjeta.parentElement));
        }
    }

    if (inputBusqueda) inputBusqueda.addEventListener("input", filtrarProductos);
    if (selectCategoria) selectCategoria.addEventListener("change", filtrarProductos);
    if (selectOrdenPrecio) selectOrdenPrecio.addEventListener("change", filtrarProductos);

    // Capturar categoría desde la URL (ej: Categorias.html?cat=educativos)
    const urlParams = new URLSearchParams(window.location.search);
    const catUrl = urlParams.get("cat");
    if (catUrl && selectCategoria) {
        selectCategoria.value = catUrl;
        filtrarProductos();
    }
});