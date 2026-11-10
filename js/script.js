// Estado del historial
console.log("JavaScript cargado correctamente");
let enfrentamientos = JSON.parse(
    localStorage.getItem("malvinas_historial")
) || [];


// Registrar enfrentamiento
document.getElementById("form-enfrentamiento")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const mision = document.getElementById("mision").value;

    const enemigos = Number(
        document.getElementById("enemigos-eliminados").value
    );

    const tiempo = Number(
        document.getElementById("tiempo").value
    );

    const nuevoEnfrentamiento = {
        id: Date.now(),
        mision: mision,
        enemigosEliminados: enemigos,
        tiempo: tiempo,
        puntaje: enemigos * 100
    };

    enfrentamientos.push(nuevoEnfrentamiento);

    guardarYActualizar();

    this.reset();
    console.log("Funciono");
    
});


// Guardar y actualizar
function guardarYActualizar() {

    localStorage.setItem(
        "malvinas_historial",
        JSON.stringify(enfrentamientos)
    );

    renderizarHistorial();
    actualizarEstadisticas();
    console.log("funciono");
    
}


// Mostrar historial
function renderizarHistorial() {

    const lista = document.getElementById(
        "lista-enfrentamientos"
    );

    if (enfrentamientos.length === 0) {

        lista.innerHTML = "<li>No hay enfrentamientos registrados.</li>";

        return;
    }

    lista.innerHTML = enfrentamientos.map(function(e, indice) {

        return `
            <li>
                <h3>${e.mision}</h3>

                <p>Enemigos eliminados: ${e.enemigosEliminados}</p>

                <p>Tiempo: ${formatearTiempo(e.tiempo)}</p>

                <p>Puntaje: ${e.puntaje}</p>

                <button onclick="eliminarEnfrentamiento(${indice})">
                    Eliminar
                </button>
            </li>
        `;

    }).join("");
    console.log("funciono");
}


// Actualizar estadísticas
function actualizarEstadisticas() {

    const totalEnfrentamientos = enfrentamientos.length;

    const totalEnemigos = enfrentamientos.reduce(
        (acc, e) => acc + e.enemigosEliminados, 0
    );

    const totalPuntaje = enfrentamientos.reduce(
        (acc, e) => acc + e.puntaje, 0
    );

    document.getElementById("contador").textContent =
        totalEnfrentamientos;

    document.getElementById("enemigos").textContent =
        totalEnemigos;

    document.getElementById("puntaje-total").textContent =
        totalPuntaje;

    // Calcular mejor tiempo por misión
    const tiemposValidos = enfrentamientos.filter(
        e => e.enemigosEliminados > 0
    );

    const mejor = tiemposValidos.length > 0
        ? Math.min(...tiemposValidos.map(e => e.tiempo))
        : null;

    document.getElementById("mejor-tiempo").textContent =
        mejor !== null ? formatearTiempo(mejor) : "--:--";
}


// Convertir segundos a minutos y segundos
function formatearTiempo(segundos) {

    const minutos = Math.floor(segundos / 60);
    const resto = segundos % 60;

    return `${String(minutos).padStart(2, "0")}:${String(resto).padStart(2, "0")}`;
}


// Eliminar enfrentamiento
function eliminarEnfrentamiento(indice) {

    enfrentamientos.splice(indice, 1);

    guardarYActualizar();
}


// Vaciar historial
function vaciarHistorial() {

    enfrentamientos = [];

    guardarYActualizar();
}


// Inicializar
renderizarHistorial();
actualizarEstadisticas();