document.addEventListener("DOMContentLoaded", () => {
  // Manejar clics en las imágenes y títulos de los productos
  document.body.addEventListener("click", (e) => {
    // Si presiona el botón de carrito o favorito, no redirigir
    if (e.target.closest(".btn-agregar-carrito") || e.target.closest(".btn-favorito")) {
      return;
    }

    const contenedorDetalle = e.target.closest(".enlace-detalle");
    if (contenedorDetalle) {
      const card = contenedorDetalle.closest(".card-producto");
      if (card) {
        const idProducto = card.dataset.id;
        if (idProducto) {
          window.location.href = `DetalleProducto.html?id=${idProducto}`;
        }
      }
    }
  });
});