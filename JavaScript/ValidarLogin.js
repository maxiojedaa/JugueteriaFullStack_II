// Cuentas registradas de prueba (Email y Contraseña)
const usuariosRegistrados = [
  { email: "admin@gmail.com", pass: "123456" },
  { email: "usuario@gmail.com", pass: "clavelogin" }
];

document.getElementById("formLogin").addEventListener("submit", function(event) {
  event.preventDefault();

  // 1. Capturar los valores ingresados
  const emailIngresado = document.getElementById("emailLogin").value;
  const passIngresada = document.getElementById("pwdLogin").value;

  // 2. Obtener la lista de usuarios guardada
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // 3. Buscar el usuario registrado por su email
  const usuarioEncontrado = usuarios.find(
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

  // 5. Redireccionar al ingresar exitosamente
  alert("¡Inicio de sesión exitoso!");
  window.location.href = "PaginaPrincipal.html";
});