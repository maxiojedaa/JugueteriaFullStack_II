const productos = {
    1: {
        id: 1,
        nombre: "Pinta tu Juguete",
        precio: "$12.990",
        imagen: "../Img/Pinta tu juguete 1.jpe",
        descripcion: "Kit creativo para pintar y personalizar tu propio juguete, ideal para estimular la imaginación y creatividad.",
        stock: "En stock",
        categoria: "Juguetes creativos"
    },

    2: {
        id: 2,
        nombre: "Robot de Madera",
        precio: "$15.990",
        imagen: "../Img/Robot madera 1.jpe",
        descripcion: "Robot de madera diseñado para estimular la creatividad, imaginación y coordinación de los niños.",
        stock: "En stock",
        categoria: "Juguetes educativos"
    },

    3: {
        id: 3,
        nombre: "Colección Creativa",
        precio: "$19.990",
        imagen: "../Img/Pinta tu juguete 2.jpg",
        descripcion: "Set creativo con materiales para pintar, decorar y desarrollar habilidades artísticas.",
        stock: "En stock",
        categoria: "Juguetes creativos"
    }
};


// Leer el ID que viene en la URL
const parametros = new URLSearchParams(window.location.search);
const idProducto = parametros.get("id");


// Buscar el producto correspondiente
const producto = productos[idProducto];


if (producto) {

    document.title = producto.nombre + " - Juguetería Chile";

    document.getElementById("nombreProducto").textContent = producto.nombre;

    document.getElementById("precioProducto").textContent = producto.precio;

    document.getElementById("imagenProducto").src = producto.imagen;

    document.getElementById("imagenProducto").alt = producto.nombre;

    document.getElementById("descripcionProducto").textContent =
        producto.descripcion;

    document.getElementById("stockProducto").textContent = producto.stock;

    document.getElementById("categoriaProducto").textContent =
        producto.categoria;


    document.getElementById("btnAgregarCarrito").addEventListener(
        "click",
        function () {
            agregarAlCarrito(producto.id);
        }
    );

} else {

    document.getElementById("nombreProducto").textContent =
        "Producto no encontrado";
}