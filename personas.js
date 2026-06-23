let personas = [];
let contadorId = 0;

const formulario = document.getElementById("form-personas");
const cuerpoTabla = document.getElementById("cuerpo-tabla-personas");

function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
  return imc.toFixed(1); // redondeo a 1 decimal
}

function clasificarIMC(imc) {
  const valor = parseFloat(imc);

  if (valor < 18.5) {
    return "Bajo peso";
  } else if (valor < 25) {
    return "Normal";
  } else if (valor < 30) {
    return "Sobrepeso";
  } else {
    return "Obesidad";
  }
}

function renderizarTabla() {
  cuerpoTabla.innerHTML = "";

  for (let i = 0; i < personas.length; i++) {
    const persona = personas[i];
    const imc = calcularIMC(persona.peso, persona.altura);
    const categoria = clasificarIMC(imc);

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${persona.nombre}</td>
      <td>${persona.apellido}</td>
      <td>${persona.edad}</td>
      <td>${persona.altura}</td>
      <td>${persona.peso}</td>
      <td>${imc} (${categoria})</td>
      <td><button class="btn-quitar" data-id="${persona.id}">Quitar</button></td>
    `;

    cuerpoTabla.appendChild(fila);
  }
}