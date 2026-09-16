document.addEventListener("DOMContentLoaded", () => {
    // 1. Obtener la sesión activa
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    // Si no hay sesión activa, redirige al Login
    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para acceder a tu perfil.");
        window.location.href = "Usuario.html";
        return;
    }

    // Elementos del HTML
    const perfilNombreHeader = document.getElementById("perfilNombreHeader");
    const perfilEmailHeader = document.getElementById("perfilEmailHeader");
    const inputNombrePerfil = document.getElementById("inputNombrePerfil");
    const inputEmailPerfil = document.getElementById("inputEmailPerfil");
    const formEditarPerfil = document.getElementById("formEditarPerfil");
    const btnDesactivarCuenta = document.getElementById("btnDesactivarCuenta");
    const contenedorHistorial = document.getElementById("contenedorHistorialPedidos");

    // 2. Precargar Datos (HU-98)
    perfilNombreHeader.textContent = usuarioLogueado.nombre || "Usuario";
    perfilEmailHeader.textContent = usuarioLogueado.email;
    inputNombrePerfil.value = usuarioLogueado.nombre || "";
    inputEmailPerfil.value = usuarioLogueado.email;

    // 3. Guardar / Editar Cambios del Perfil (HU-2, HU-4, HU-99)
    formEditarPerfil.addEventListener("submit", (e) => {
        e.preventDefault();
        const nuevoNombre = inputNombrePerfil.value.trim();
        const nuevaClave = document.getElementById("inputNuevaClave").value.trim();

        if (!nuevoNombre) {
            alert("El campo nombre no puede quedar vacío.");
            return;
        }

        // Actualizar datos en la sesión activa
        usuarioLogueado.nombre = nuevoNombre;
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));

        // Actualizar en la lista general de usuarios
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const index = usuarios.findIndex(u => u.email.toLowerCase() === usuarioLogueado.email.toLowerCase());
        
        if (index !== -1) {
            usuarios[index].nombre = nuevoNombre;
            if (nuevaClave !== "") {
                usuarios[index].pass = nuevaClave;
            }
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }

        alert("¡Datos del perfil actualizados correctamente!");
        location.reload();
    });

    // 4. Historial de Compras Simulado / Guardado (HU-55)
    cargarHistorialPedidos(usuarioLogueado.email);

    function cargarHistorialPedidos(emailUsuario) {

        // Filtramos solo los pedidos pertenecientes al usuario actual
        const misPedidos = pedidosGuardados.filter(p => p.usuarioEmail.toLowerCase() === emailUsuario.toLowerCase());

        if (misPedidos.length === 0) {
            contenedorHistorial.innerHTML = `<p class="text-muted">Aún no has realizado ninguna compra en la tienda.</p>`;
            return;
        }

        let htmlPedidos = "";
        misPedidos.reverse().forEach(ped => {
            htmlPedidos += `
                <div class="card mb-3 border shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="fw-bold mb-0">${ped.idPedido}</h6>
                            <span class="badge bg-success">${ped.estado}</span>
                        </div>
                        <p class="small text-muted mb-2"><i class="bi bi-calendar3 me-1"></i> Fecha: ${ped.fecha}</p>
                        <ul class="small ps-3 mb-2">
                            ${ped.productos.map(prod => `<li>${prod}</li>`).join("")}
                        </ul>
                        <p class="fw-bold text-primary mb-0">Total: $${ped.total.toLocaleString("es-CL")}</p>
                    </div>
                </div>
            `;
        });

        contenedorHistorial.innerHTML = htmlPedidos;
    }

    // 5. Desactivar / Eliminar Cuenta con Confirmación (HU-3, HU-102)
    btnDesactivarCuenta.addEventListener("click", () => {
        const confirmacion = confirm("¿Estás seguro de que deseas desactivar tu cuenta? Esta acción cerrará tu sesión actual.");
        if (confirmacion) {
            localStorage.removeItem("usuarioLogueado");
            alert("Tu cuenta ha sido desactivada. Serás redirigido a la página principal.");
            window.location.href = "PaginaPrincipal.html";
        }
    });
});