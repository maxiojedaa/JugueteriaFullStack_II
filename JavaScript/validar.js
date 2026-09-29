//Creo una variable que va a funcionar como lista que va a contener los emails admitidos
const cuentasExistentes = [
    "admin@gmail.com", "usuario@gmail.com", "test@gmail"
]

document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("formRegistro");

  // Función para mostrar el Toast emergente de Bootstrap
  function lanzarToast(mensaje, esExito = true) {
    const toastEl = document.getElementById("appToast");
    const toastMsg = document.getElementById("toastMessage");

    if (!toastEl || !toastMsg) return;

    toastMsg.textContent = mensaje;
    toastEl.className = `toast align-items-center text-white border-0 bg-${esExito ? 'success' : 'danger'}`;

    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
  }

  // Evento al enviar el formulario de registro
  if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
      // 1. Previene el recargo de la página
      e.preventDefault();

      // 2. Obtiene los valores de los inputs usando los IDs de tu HTML
      const nombre = document.getElementById("nombre") ? document.getElementById("nombre").value : "";
      const email = document.getElementById("email") ? document.getElementById("email").value : "";
      const pass1 = document.getElementById("pwd1") ? document.getElementById("pwd1").value : "";
      const pass2 = document.getElementById("pwd2") ? document.getElementById("pwd2").value : "";

      // 3. Valida que las contraseñas coincidan
      if (pass1 !== pass2) {
        lanzarToast("Las contraseñas no coinciden. Por favor verifica.", false);
        return;
      }

      // 4. Obtiene la lista previa de usuarios desde localStorage
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      // 5. Verifica si el correo ya está registrado
      const existe = usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (existe) {
        lanzarToast("Este correo electrónico ya está registrado. Intente iniciar sesión.", false);
        return;
      }

      // 6. Guarda el nuevo usuario en localStorage
      usuarios.push({
        nombre: nombre,
        email: email,
        pass: pass1
      });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      // 7. Muestra mensaje de éxito y redirige al Login después de 2 segundos
      lanzarToast("¡Cuenta creada exitosamente! Redirigiendo...", true);

      setTimeout(() => {
        window.location.href = "Usuario.html";
      }, 2000);
    });
  }
});