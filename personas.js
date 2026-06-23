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