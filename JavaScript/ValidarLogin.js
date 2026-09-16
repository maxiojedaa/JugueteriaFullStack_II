// Cuentas registradas de prueba (Email y Contraseña)
const usuariosRegistrados = [
  { email: "admin@gmail.com", pass: "123456", nombre: "Administrador" },
  { email: "usuario@gmail.com", pass: "clavelogin", nombre: "Usuario" }
];

document.getElementById("formLogin").addEventListener("submit", function(event) {
  event.preventDefault();

  // 1. Capturar los valores ingresados
  const emailIngresado = document.getElementById("emailLogin").value;
  const passIngresada = document.getElementById("pwdLogin").value;

  // 2. Obtener la lista de usuarios guardada desde el registro más los de prueba
  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
  const todosLosUsuarios = [...usuariosRegistrados, ...usuariosGuardados];

  // 3. Buscar el usuario registrado por su email
  const usuarioEncontrado = todosLosUsuarios.find(
    u => u.email.toLowerCase() === emailIngresado.toLowerCase()
  );

  // 4. Validar credenciales
  if (!usuarioEncontrado) {
    alert("Error: El correo electrónico no está registrado.");
    return;
  }

  if (usuarioEncontrado.pass !== passIngresada) {
    alert("Error: Contraseña incorrecta.");
    return;
  }

  // 5. GUARDAR LA SESIÓN ACTIVA (Esta es la línea clave que faltaba)
  const datosSesion = {
    nombre: usuarioEncontrado.nombre || usuarioEncontrado.email.split("@")[0],
    email: usuarioEncontrado.email
  };
  localStorage.setItem("usuarioLogueado", JSON.stringify(datosSesion));

  // 6. Redireccionar al ingresar exitosamente
  alert("¡Inicio de sesión exitoso!");
  window.location.href = "PaginaPrincipal.html";
});