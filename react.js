//Destructuring de React para obtener useState
const { useState } = React;

//Funcion auxiliar para calcular el IMC
function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
  return imc.toFixed(1);
}

//Funcion auxiliar para clasificar el IMC
function clasificarIMC(imc) {
  const valor = parseFloat(imc);
  if (valor < 18.5) return "Bajo peso";
  else if (valor < 25) return "Normal";
  else if (valor < 30) return "Sobrepeso";
  else return "Obesidad";
}