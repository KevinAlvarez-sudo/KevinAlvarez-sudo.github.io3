
 // Clase para los lotes de tela
class LoteTela {
    constructor(id, tipoFibra, kilogramos) {
        this.id = id;
        this.tipoFibra = tipoFibra;
        this.kilogramos = kilogramos;
        this.agua = 0;
    }

    // Metodo para calcular el agua
    calcularAgua() {
        if (this.tipoFibra === "algodon") {
            this.agua = this.kilogramos * 10000;
        } else {
            this.agua = this.kilogramos * 300;
        }
    }
}

// Obtener los elementos del HTML
const tipo = document.getElementById("tipoFibra");
const kilos = document.getElementById("kilosTela");
const btn = document.getElementById("btnCalcular");
const total = document.getElementById("aguaTotal");
const lista = document.getElementById("historialLotes");

// Cargar lotes al abrir la pagina
document.addEventListener("DOMContentLoaded", mostrarLotes);

// Evento del boton
btn.addEventListener("click", agregarLote);

// Funcion para agregar lotes
function agregarLote() {

    let cantidad = parseFloat(kilos.value);

    if (kilos.value === "" || cantidad <= 0) {
        return alert("Ingresa una cantidad valida");
    }

    const lotes = obtenerLotes();

    let lote = new LoteTela(lotes.length + 1, tipo.value, cantidad);

    lote.calcularAgua();

    lotes.push(lote);

    localStorage.setItem("lotes", JSON.stringify(lotes));

    mostrarLotes();

    kilos.value = "";
}

// Funcion para obtener los lotes guardados
function obtenerLotes() {
    return JSON.parse(localStorage.getItem("lotes")) || [];
}

// Funcion para mostrar los lotes
function mostrarLotes() {

    const lotes = obtenerLotes();

    lista.innerHTML = "";

    let suma = 0;

    lotes.forEach(function(lote) {

        // Recuperar el calculo de lotes anteriores
        if (lote.agua === undefined) {
            let anterior = new LoteTela(lote.id, lote.tipoFibra, lote.kilogramos);
            anterior.calcularAgua();
            lote.agua = anterior.agua;
        }

        const li = document.createElement("li");

        li.textContent = "Lote " + lote.id + " - " +
            lote.tipoFibra + " - " +
            lote.kilogramos + " kg - " +
            lote.agua + " litros";

        // Alerta de consumo de agua
        if (lote.agua > 10000) {
            li.className = "list-group-item list-group-item-danger";
        } else {
            li.className = "list-group-item list-group-item-success";
        }

        lista.appendChild(li);

        suma = suma + lote.agua;
    });

    // Guardar los datos actualizados
    localStorage.setItem("lotes", JSON.stringify(lotes));

    // Mostrar el total acumulado
    total.textContent = suma;
}
