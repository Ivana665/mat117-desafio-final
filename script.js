// ==================== LÓGICA ALTERNATIVA A: MOVILIDAD ====================
function calcularMovilidad(d, vc, vt, pasaje) {
    const tcHoras = d / vc;
    const ttHoras = d / vt;
    const tcMin = tcHoras * 60;
    const ttMin = ttHoras * 60;
    const difMin = tcMin - ttMin;
    return { tcMin, ttMin, difMin, costo: pasaje };
}

document.getElementById("form-movilidad").addEventListener("submit", function(e) {
    e.preventDefault();
    const d = parseFloat(document.getElementById("dist").value);
    const vc = parseFloat(document.getElementById("vc").value);
    const vt = parseFloat(document.getElementById("vt").value);
    const pasaje = parseFloat(document.getElementById("pasaje").value);
    const errorEl = document.getElementById("error-mov");
    const resEl = document.getElementById("res-movilidad");

    // Validación de entradas
    if (isNaN(d) || isNaN(vc) || isNaN(vt) || isNaN(pasaje) || d <= 0 || vc <= 0 || vt <= 0 || pasaje < 0) {
        errorEl.textContent = "Error: Ingrese valores numéricos válidos (distancia y velocidades mayores a 0, pasaje >= 0).";
        resEl.style.display = "none";
        return;
    }

    errorEl.textContent = "";
    const res = calcularMovilidad(d, vc, vt, pasaje);
    const recomendacion = res.difMin > 10 
        ? "Conviene transporte público (ahorro significativo de tiempo)." 
        : "Conviene caminar (ahorras el pasaje y la diferencia de tiempo es mínima).";

    resEl.style.display = "block";
    resEl.innerHTML = `
        <strong>Resultados del cálculo:</strong><br>
        • Tiempo caminando ($t_c$): <strong>${res.tcMin.toFixed(2)} min</strong><br>
        • Tiempo en transporte ($t_t$): <strong>${res.ttMin.toFixed(2)} min</strong><br>
        • Diferencia de tiempo ($\\Delta t$): <strong>${res.difMin.toFixed(2)} min</strong><br>
        • Costo estimado: <strong>${res.costo.toFixed(2)} Bs</strong> (caminar: 0.00 Bs)<br>
        • <em>Decisión sugerida:</em> ${recomendacion}
    `;
});

// Cargar 5 pruebas experimentales de Movilidad
function cargarPruebasMovilidad() {
    const pruebas = [
        { nombre: "1. Prado - Plaza Murillo", d: 1.0, vc: 4.5, vt: 12.0, p: 2.0 },
        { nombre: "2. Miraflores - Sopocachi", d: 2.5, vc: 4.5, vt: 15.0, p: 2.0 },
        { nombre: "3. Obrajes - Cota Cota (UMSA)", d: 4.2, vc: 4.8, vt: 22.0, p: 2.5 },
        { nombre: "4. San Pedro - Villa Fátima", d: 5.5, vc: 4.5, vt: 18.0, p: 2.5 },
        { nombre: "5. Ceja El Alto - Pérez Velasco", d: 11.0, vc: 4.2, vt: 25.0, p: 3.0 }
    ];
    const tbody = document.getElementById("tabla-mov-body");
    pruebas.forEach(item => {
        const r = calcularMovilidad(item.d, item.vc, item.vt, item.p);
        const fila = `<tr>
            <td>${item.nombre}</td>
            <td>${item.d.toFixed(1)}</td>
            <td>${item.vc.toFixed(1)}</td>
            <td>${item.vt.toFixed(1)}</td>
            <td>${r.tcMin.toFixed(1)}</td>
            <td>${r.ttMin.toFixed(1)}</td>
            <td>${r.difMin.toFixed(1)}</td>
            <td>${r.costo.toFixed(2)}</td>
        </tr>`;
        tbody.innerHTML += fila;
    });
}

// ==================== LÓGICA ALTERNATIVA D: HUERTO URBANO ====================
function calcularHuerto(x) {
    const y = 20 - x;
    const perimetro = 2 * (x + y);
    const area = x * y;
    const derivada = 20 - 2 * x; // Tasa de cambio A'(x)
    return { x, y, perimetro, area, derivada };
}

document.getElementById("form-huerto").addEventListener("submit", function(e) {
    e.preventDefault();
    const x = parseFloat(document.getElementById("largo").value);
    const errorEl = document.getElementById("error-huerto");
    const resEl = document.getElementById("res-huerto");

    // Validación: x debe estar estrictamente entre 0 y 20
    if (isNaN(x) || x <= 0 || x >= 20) {
        errorEl.textContent = "Error: El largo x debe ser un número mayor a 0 y menor a 20 metros.";
        resEl.style.display = "none";
        return;
    }

    errorEl.textContent = "";
    const res = calcularHuerto(x);
    const estadoOptimo = x === 10 
        ? "¡Dimensiones óptimas alcanzadas (Área máxima)!" 
        : `Para maximizar el área, ajusta el largo a 10 m (ganarías ${(100 - res.area).toFixed(2)} m²).`;

    resEl.style.display = "block";
    resEl.innerHTML = `
        <strong>Resultados del diseño:</strong><br>
        • Largo ($x$): <strong>${res.x.toFixed(2)} m</strong> | Ancho ($y = 20 - x$): <strong>${res.y.toFixed(2)} m</strong><br>
        • Perímetro total utilizado: <strong>${res.perimetro.toFixed(2)} m</strong><br>
        • Área del huerto $A(x)$: <strong>${res.area.toFixed(2)} m²</strong><br>
        • Tasa de cambio instantánea $A'(x)$: <strong>${res.derivada.toFixed(2)} m²/m</strong><br>
        • <em>Evaluación:</em> ${estadoOptimo}
    `;
});

// Cargar 5 pruebas experimentales del Huerto
function cargarPruebasHuerto() {
    const valoresX = [4, 6, 10, 14, 16];
    const tbody = document.getElementById("tabla-huerto-body");
    valoresX.forEach((val, idx) => {
        const r = calcularHuerto(val);
        const fila = `<tr>
            <td>Prueba ${idx + 1}</td>
            <td>${r.x.toFixed(1)}</td>
            <td>${r.y.toFixed(1)}</td>
            <td>${r.perimetro.toFixed(1)}</td>
            <td><strong>${r.area.toFixed(1)}</strong></td>
            <td>${r.derivada.toFixed(1)}</td>
        </tr>`;
        tbody.innerHTML += fila;
    });
}

// Inicializar tablas y cálculos por defecto al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    cargarPruebasMovilidad();
    cargarPruebasHuerto();
    document.getElementById("form-movilidad").dispatchEvent(new Event("submit"));
    document.getElementById("form-huerto").dispatchEvent(new Event("submit"));
});