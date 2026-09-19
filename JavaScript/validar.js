//Creo una variable que va a funcionar como lista que va a contener los emails admitidos
const cuentasExistentes = [
    "admin@gmail.com", "usuario@gmail.com", "test@gmail"
]

document.getElementById("formRegistro").addEventListener("submit", function(event) {
  // 1. Previene que la página se recargue inmediatamente
  event.preventDefault();

  // 2. Obtiene los valores ingresados usando los IDs del HTML
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const pass1 = document.getElementById("pwd1").value;
  const pass2 = document.getElementById("pwd2").value;

  // 3. Valida que las contraseñas coincidan
  if (pass1 !== pass2) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  // 4. Obtiene la lista previa de usuarios desde el almacenamiento del navegador
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // 5. Verifica si el correo ya está registrado en la lista
  const existe = usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (existe) {
    alert("Este correo electrónico ya está registrado. Intente iniciar sesión.");
    return;
  }

  // 6. Guarda el nuevo usuario
  usuarios.push({
    nombre: nombre,
    email: email,
    pass: pass1
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // 7. Muestra mensaje de éxito y redirige al Login
  alert("¡Cuenta creada exitosamente!");
  window.location.href = "Usuario.html";
});
