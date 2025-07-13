const ramosPorSemestre = [
  // S1 al S6 (orden: columnas)
  [
    { id: "civil1", nombre: "Core: Civilización Contemporánea I" },
    { id: "escritura", nombre: "Core: Escritura Argumentativa" },
    { id: "introCC", nombre: "Introducción a las ciencias cognitivas" },
    { id: "cognicion", nombre: "Cognición, emoción y toma de decisiones" },
    { id: "aprendizaje", nombre: "Psicología del Aprendizaje" },
    { id: "evidencia", nombre: "Psicología basada en evidencia y métodos de investigación" },
    { id: "microgestion", nombre: "Micro taller Gestión del Sí Mismo" },
    { id: "exp1", nombre: "Taller de Expresión Oral I" },
  ],
  [
    { id: "civil2", nombre: "Core: Civilización Contemporánea II" },
    { id: "artecore", nombre: "Core: Arte y Humanidades" },
    { id: "neurobases", nombre: "Bases neuronales del comportamiento" },
    { id: "cuanti1", nombre: "Métodos de Investigación Cuantitativa I" },
    { id: "evolucion_ninez", nombre: "Psicología Evolutiva de la Niñez" },
    { id: "lenguaje", nombre: "Lenguaje, Comunicación y Análisis de Información" },
    { id: "tutoria", nombre: "Tutoría Grupal" },
  ],
  [
    { id: "lit1", nombre: "Core: Literatura y Humanidades I", reqs: ["civil2"] },
    { id: "ciencias", nombre: "Core: Ciencias", reqs: ["civil2"] },
    { id: "neurociencia", nombre: "Neurociencia Social y Cognitiva" },
    { id: "motivacion", nombre: "Motivación y Pensamiento Creativo" },
    { id: "evolucion_adole", nombre: "Psicología Evolutiva de la Adolescencia" },
    { id: "cuali", nombre: "Métodos de Investigación Cualitativa" },
    { id: "etica", nombre: "Ética y Responsabilidad en Psicología" },
    { id: "exp2", nombre: "Taller de Expresión Oral II" },
  ],
  [
    { id: "lit2", nombre: "Core: Literatura y Humanidades II", reqs: ["civil2"] },
    { id: "filo", nombre: "Electivo Filosofía", reqs: ["civil2"] },
    { id: "artelit", nombre: "Electivo Arte y Literatura", reqs: ["civil2"] },
    { id: "neuropsi", nombre: "Neuropsicología" },
    { id: "sociales", nombre: "Determinantes Sociales del Comportamiento Humano" },
    { id: "personalidad", nombre: "Psicología de la Personalidad" },
    { id: "cuanti2", nombre: "Métodos de Investigación Cuantitativos II", reqs: ["cuanti1"] },
    { id: "entrevista", nombre: "Taller de Técnicas de Entrevista" },
  ],
  [
    { id: "eticacore", nombre: "Ética Core", reqs: ["civil2"] },
    { id: "soc", nombre: "Electivo Ciencias Sociales", reqs: ["civil2"] },
    { id: "lib1", nombre: "Electivo Artes Liberales I", reqs: ["civil2"] },
    { id: "psicometria", nombre: "Psicometría", reqs: ["cuanti2"] },
    { id: "pasantia", nombre: "Taller de Integración y Pasantía Científica / Laboral / Social" },
    { id: "opt1", nombre: "Optativo I" },
    { id: "opt2", nombre: "Optativo II" },
    { id: "opt3", nombre: "Optativo III" },
  ],
  [
    { id: "historia", nombre: "Electivo Historia", reqs: ["civil2"] },
    { id: "lib2", nombre: "Disciplinar Artes Liberales II", reqs: ["civil2"] },
    { id: "lib3", nombre: "Disciplinar Artes Liberales III", reqs: ["civil2"] },
    { id: "evaluacion", nombre: "Bases de la Evaluación Psicológica" },
    { id: "especialidad", nombre: "Taller de Especialidad y Campos Ocupacionales" },
    { id: "liderazgo", nombre: "Liderazgo" },
    { id: "opt4", nombre: "Optativo IV" },
    { id: "opt5", nombre: "Optativo V" },
    { id: "opt6", nombre: "Optativo VI" },
  ],
];

const tabla = document.querySelector(".tabla-malla");

function crearMalla() {
  const maxFilas = Math.max(...ramosPorSemestre.map(col => col.length));
  
  for (let fila = 0; fila < maxFilas; fila++) {
    for (let col = 0; col < 6; col++) {
      const ramo = ramosPorSemestre[col][fila];
      const celda = document.createElement("div");

      if (ramo) {
        celda.className = "ramo";
        celda.id = ramo.id;
        celda.textContent = ramo.nombre;
        if (ramo.reqs && ramo.reqs.length > 0) {
          celda.classList.add("bloqueado");
        }
        celda.onclick = () => toggleAprobado(ramo);
      } else {
        // espacio vacío si no hay ramo en esa fila
        celda.innerHTML = "&nbsp;";
      }

      tabla.appendChild(celda);
    }
  }
}

function toggleAprobado(ramo) {
  const div = document.getElementById(ramo.id);
  if (div.classList.contains("bloqueado")) return;
  div.classList.toggle("aprobado");
  actualizarBloqueos();
}

function actualizarBloqueos() {
  ramosPorSemestre.flat().forEach(r => {
    const div = document.getElementById(r.id);
    if (!div) return;
    if (r.reqs && r.reqs.length > 0) {
      const aprobados = r.reqs.every(req =>
        document.getElementById(req).classList.contains("aprobado")
      );
      if (aprobados) {
        div.classList.remove("bloqueado");
      } else {
        div.classList.add("bloqueado");
      }
    }
  });
}

crearMalla();
