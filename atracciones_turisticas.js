/*------------------------------------------*/
/*--|funcionalidad_atracciones_turisticas|--*/
/*------------------------------------------*/
const datosIniciales = {
    1: {
        nombre: "Ciudad Amurallada",
        ubicacion: "Cartagena de Indias",
        descripcion: "Centro histórico rodeado por antiguas murallas.",
        imagen: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc"
    },
    2: {
        nombre: "Torre Eiffel",
        ubicacion: "París, Francia",
        descripcion: "Famosa estructura de hierro y símbolo de París.",
        imagen: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f"
    },
    3: {
        nombre: "Cristo Redentor",
        ubicacion: "Río de Janeiro, Brasil",
        descripcion: "Monumento ubicado sobre el cerro del Corcovado.",
        imagen: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325"
    }
};
const lugares = document.querySelectorAll(".lugar");
const botonRestablecer = document.getElementById("boton_restablecer");
const mensajeGeneral = document.getElementById("mensaje_general");
/*-------------------------------------------*/
/*--|obtener_los_datos_usando_localstorage|--*/
/*-------------------------------------------*/
function obtenerDatos(id) {
    const datosGuardados = localStorage.getItem(`atraccion_${id}`);
    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    }
    return datosIniciales[id];
}
/*-----------------------*/
/*--|mostrar_los_datos|--*/
/*-----------------------*/
function mostrarDatos(lugar) {
    const id = lugar.dataset.id;
    const datos = obtenerDatos(id);
    lugar.querySelector(".campo_nombre").value = datos.nombre;
    lugar.querySelector(".campo_ubicacion").value = datos.ubicacion;
    lugar.querySelector(".campo_descripcion").value = datos.descripcion;
    lugar.querySelector(".campo_imagen").value = datos.imagen;
    lugar.querySelector(".imagen").src = datos.imagen;
}
/*----------------------------------------------------*/
/*--|guardar_y_restaurar_los_datos_con_localstorage|--*/
/*----------------------------------------------------*/
function guardarDatos(lugar) {
    const id = lugar.dataset.id;
    const nombre = lugar.querySelector(".campo_nombre").value;
    const ubicacion = lugar.querySelector(".campo_ubicacion").value;
    const descripcion = lugar.querySelector(".campo_descripcion").value;
    const imagen = lugar.querySelector(".campo_imagen").value;
    const datos = {
        nombre: nombre,
        ubicacion: ubicacion,
        descripcion: descripcion,
        imagen: imagen
    };
    localStorage.setItem(`atraccion_${id}`, JSON.stringify(datos));
    lugar.querySelector(".imagen").src = imagen;
    mostrarMensajeLugar(lugar, "Información guardada correctamente.");
}
function restaurarDatos(lugar) {
    const id = lugar.dataset.id;
    localStorage.removeItem(`atraccion_${id}`);
    mostrarDatos(lugar);
    mostrarMensajeLugar(lugar, "Información restaurada.");
}
/*----------------------------------*/
/*--|mostrar_el_mensaje_del_lugar|--*/
/*----------------------------------*/
function mostrarMensajeLugar(lugar, texto) {
    const mensaje = lugar.querySelector(".mensaje_lugar");
    mensaje.textContent = texto;
    setTimeout(() => {
        mensaje.textContent = "";
    }, 2000);
}
/*------------------------------------------*/
/*--|restablecer_todo_usando_localstorage|--*/
/*------------------------------------------*/
function restablecerTodos() {
    const confirmacion = confirm("¿Deseas restablecer todos los lugares?");
    if (!confirmacion) {
        return;
    }
    lugares.forEach((lugar) => {
        const id = lugar.dataset.id;
        localStorage.removeItem(`atraccion_${id}`);
        mostrarDatos(lugar);
    });
    mensajeGeneral.textContent = "Todos los lugares fueron restablecidos.";
    setTimeout(() => {
        mensajeGeneral.textContent = "";
    }, 2000);
}
/*----------------------------*/
/*--|eventos_de_los_lugares|--*/
/*----------------------------*/
lugares.forEach((lugar) => {
    const botonGuardar = lugar.querySelector(".boton_guardar");
    const botonRestaurar = lugar.querySelector(".boton_restaurar");
    botonGuardar.addEventListener("click", () => {
        guardarDatos(lugar);
    });
    botonRestaurar.addEventListener("click", () => {
        restaurarDatos(lugar);
    });
});
/*------------------------------*/
/*--|evento_restablecer_todos|--*/
/*------------------------------*/
botonRestablecer.addEventListener("click", restablecerTodos
);
/*----------------------*/
/*--|cargar_los_datos|--*/
/*----------------------*/
function cargarDatos() {
    lugares.forEach((lugar) => {
        mostrarDatos(lugar);
    });
}
cargarDatos();