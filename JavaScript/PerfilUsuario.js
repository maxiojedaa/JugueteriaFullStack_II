document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuario) {
    window.location.href = "Usuario.html";
    return;
  }

  // Actualizar elementos visuales del perfil
  const elNombre = document.getElementById("perfilNombre") || document.querySelector("h3");
  const elRol = document.getElementById("perfilRol") || document.querySelector(".badge");
  const inputNombre = document.getElementById("inputNombre") || document.querySelectorAll("input")[0];
  const inputCorreo = document.getElementById("inputCorreo") || document.querySelectorAll("input")[1];

  if (elNombre) elNombre.textContent = usuario.nombre;
  if (elRol) {
    elRol.textContent = usuario.rol;
    elRol.className = usuario.rol === "Administrador" ? "badge bg-danger" : "badge bg-primary";
  }
  if (inputNombre) inputNombre.value = usuario.nombre;
  if (inputCorreo) inputCorreo.value = usuario.correo;

 
  // --- LÓGICA DEL MÉTODO DE PAGO ---
document.addEventListener("DOMContentLoaded", () => {
  const selectPago = document.getElementById("selectMetodoPago");
  if (selectPago) {
    const metodoGuardado = localStorage.getItem("metodoPago");
    if (metodoGuardado) {
      selectPago.value = metodoGuardado;
    }
  }
});

function guardarMetodoPago() {
  const combo = document.getElementById("selectMetodoPago");
  if (!combo) return;

  const valor = combo.value;
  if (!valor) {
    alert("Por favor selecciona un método de pago.");
    return;
  }

  localStorage.setItem("metodoPago", valor);

  const alerta = document.getElementById("alertaPago");
  if (alerta) {
    alerta.classList.remove("d-none");
    setTimeout(() => alerta.classList.add("d-none"), 3000);
  }
}
});

// Mostrar los campos dependiendo del select
function mostrarFormularioPago() {
    const seleccion = document.getElementById('selectMetodoPago').value;
    
    // Ocultar todos los bloques primero
    document.getElementById('camposTarjeta').classList.add('d-none');
    document.getElementById('camposBilletera').classList.add('d-none');
    document.getElementById('camposTransferencia').classList.add('d-none');

    // Mostrar el bloque correspondiente
    if (seleccion === 'tarjeta') {
        document.getElementById('camposTarjeta').classList.remove('d-none');
    } else if (seleccion === 'billetera') {
        document.getElementById('camposBilletera').classList.remove('d-none');
    } else if (seleccion === 'transferencia') {
        document.getElementById('camposTransferencia').classList.remove('d-none');
    }
}

// Guardar los datos ingresados
function guardarMetodoPago(e) {
    e.preventDefault();
    const tipoMetodo = document.getElementById('selectMetodoPago').value;
    
    if (!tipoMetodo) return;

    let datosPago = { tipo: tipoMetodo };

    if (tipoMetodo === 'tarjeta') {
        const num = document.getElementById('numTarjeta').value;
        if (num.length < 15) {
            alert('Ingresa un número de tarjeta válido.');
            return;
        }
        // Guardar solo los últimos 4 dígitos por seguridad
        datosPago.detalle = `**** **** **** ${num.slice(-4)}`;
    } else if (tipoMetodo === 'billetera') {
        datosPago.detalle = document.getElementById('telefonoBilletera').value;
    } else {
        datosPago.detalle = 'Transferencia Bancaria Registrada';
    }

    // Persistir en LocalStorage
    localStorage.setItem('metodoPagoUsuario', JSON.stringify(datosPago));

    // Mostrar feedback al usuario
    const alerta = document.getElementById('alertaPago');
    alerta.classList.remove('d-none');
    setTimeout(() => alerta.classList.add('d-none'), 3000);
}

