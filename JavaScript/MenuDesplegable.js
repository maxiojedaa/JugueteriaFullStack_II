document.addEventListener("DOMContentLoaded", () => {
    const iconoPerfil = document.getElementById("iconoPerfil");
    const menuUsuario = document.getElementById("menuUsuario");
    const nombreUsuarioMenu = document.getElementById("nombreUsuarioMenu");
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    const btnVerPerfil = document.getElementById("btnVerPerfil");

    // 1. Revisar si hay una sesión activa en localStorage
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (usuarioLogueado) {
        // Si hay sesión, mostramos el nombre en el menú flotante
        if (nombreUsuarioMenu) {
            nombreUsuarioMenu.textContent = usuarioLogueado.nombre || usuarioLogueado.email;
        }

        // 2. Comprobar si es Administrador (puedes definir el correo de admin aquí)
        const esAdmin = usuarioLogueado.email.toLowerCase() === "admin@gmail.com";

        if (esAdmin) {
            // Si es admin, inyectamos dinámicamente el botón de Panel de Administración / Blackboard
            const menuContenedor = menuUsuario; // o el contenedor interno donde están los botones
            
            // Verificamos que no se duplique si ya fue agregado
            if (!document.getElementById("btnPanelAdmin")) {
                const adminButton = document.createElement("button");
                adminButton.id = "btnPanelAdmin";
                adminButton.className = "btn btn-sm btn-warning text-start w-100 mb-1 fw-bold";
                adminButton.innerHTML = `<i class="bi bi-speedometer2 me-1"></i> Panel Admin`;
                
                adminButton.onclick = () => {
                    window.location.href = "PanelAdmin.html"; // Cambia por tu archivo de administración si lo tienes
                };

                // Insertamos el botón antes del botón de cerrar sesión
                menuUsuario.insertBefore(adminButton, btnCerrarSesion);
            }
        }
    }

    // 3. Mostrar u ocultar el menú al hacer clic en el ícono de perfil
    if (iconoPerfil && menuUsuario) {
        iconoPerfil.addEventListener("click", (e) => {
            e.stopPropagation();
            
            // Si NO ha iniciado sesión, lo redirigimos a la página de login (Usuario.html)
            if (!usuarioLogueado) {
                window.location.href = "Usuario.html";
                return;
            }

            // Si SÍ ha iniciado sesión, alternamos la clase 'd-none' para mostrar/ocultar el menú
            menuUsuario.classList.toggle("d-none");
        });

        // Ocultar el menú si se hace clic fuera de él
        document.addEventListener("click", (e) => {
            if (!menuUsuario.contains(e.target) && !iconoPerfil.contains(e.target)) {
                menuUsuario.classList.add("d-none");
            }
        });
    }

    // 4. Acción del botón Ver Perfil
    if (btnVerPerfil) {
        btnVerPerfil.addEventListener("click", () => {
            window.location.href = "PerfilUsuario.html"; // Ajusta a tu vista de perfil si la tienes
        });
    }

    // 5. Acción del botón Cerrar Sesión
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            alert("Sesión cerrada exitosamente.");
            window.location.href = "PaginaPrincipal.html";
        });
    }
});