const usuarios = [
    {
        nombre: "Juan Manuel",
        apellido: "Arango Arana",
        correo: "JuanArango@gmail.com",
        contraseña: "juan1"
    },
    {
        nombre: "Mariana",
        apellido: "Henao",
        correo: "mariana@gmail.com",
        contraseña: "mariana1"
    }
];

const loginForm = document.getElementById("login-form");
const correoInput = document.getElementById("correo");
const contraseñaInput = document.getElementById("contraseña");
const loginContainer = document.getElementById("login-container");
const appContainer = document.getElementById("app-container");
const usuarioNombre = document.getElementById("usuario-nombre");
const cerrarSesionBtn = document.getElementById("cerrar-sesion");
const formProducto = document.getElementById("form-producto");
const tablaProductos = document.getElementById("tabla-productos");

window.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = sessionStorage.getItem("usuario");
    if (usuarioActivo) {
        mostrarApp(JSON.parse(usuarioActivo));
    }
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const correo = correoInput.value;
    const contraseña = contraseñaInput.value;

    const usuario = usuarios.find(u => u.correo === correo && u.contraseña === contraseña);

    if (usuario) {
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
        mostrarApp(usuario);
    } else {
        alert("Correo o contraseña incorrectos");
    }
});

function mostrarApp(usuario) {
    loginContainer.classList.add("d-none");
    appContainer.classList.remove("d-none");
    usuarioNombre.textContent = `Bienvenid@, ${usuario.nombre} ${usuario.apellido}`;
    mostrarProductos();
}

cerrarSesionBtn.addEventListener("click", () => {
    sessionStorage.removeItem("usuario");
    location.reload();
});

function obtenerProductos () {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarProductos (productos) {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function mostrarProductos () {
    const productos = obtenerProductos();
    tablaProductos.innerHTML = "";

    productos.forEach((p, index) => {
        const fila = `
            <tr>
                <td>${index + 1}</td>
                <td>${p.nombre}</td>
                <td>${p.precio}</td>
                <td>${p.descripcion}</td>
                <td>
                    <button class="btn btn-danger btn-sm onclick="eliminarProducto(${index})">Eliminar</button>
                </td>
            </tr>`;
        tablaProductos.innerHTML += fila;
    });
}

formProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombreProducto").value;
    const precio = document.getElementById("precioProducto").value;
    const descripcion = document.getElementById("descripcionProducto").value;

    const nuevoProducto = {nombre, precio, descripcion};
    const productos = obtenerProductos();
    productos.push(nuevoProducto);
    guardarProductos(productos);
    mostrarProductos();
    formProducto.reset();
});

function eliminarProducto (index) {
    const productos = obtenerProductos();
    productos.splice(index, 1);
    guardarProductos(productos);
    mostrarProductos();
}