// Arreglo que guarda en memoria todas las personas cargadas.
let personas = [];

// Contador simple para asignarle un id unico a cada persona
let contadorId = 0;

// Referencias a elementos del DOM que se usan varias veces
const formulario = document.getElementById("form-personas");
const cuerpoTabla = document.getElementById("cuerpo-tabla-personas");

// Funcion que calcula el IMC a partir del peso (kg) y la altura (m)
function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
  // Se redondea a un decimal para que se vea mas prolijo en la tabla
  return imc.toFixed(1);
}

// Funcion que clasifica el IMC en una categoria
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

// Funcion que recorre el arreglo "personas" y vuelve a dibujar toda la tabla
function renderizarTabla() {
  // Se limpia el contenido actual del cuerpo de la tabla
  cuerpoTabla.innerHTML = "";

  // Bucle
  for (let i = 0; i < personas.length; i++) {
    const persona = personas[i];

    // Se calcula el IMC y su clasificacion para esta persona
    const imc = calcularIMC(persona.peso, persona.altura);
    const categoria = clasificarIMC(imc);

    // Se crea la fila de la tabla
    const fila = document.createElement("tr");

    // Se completa el contenido de la fila, incluyendo el boton de quitar
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

//envio del formulario para agregar una nueva persona
formulario.addEventListener("submit", function (evento) {
  // Se evita que el formulario recargue la pagina (comportamiento por defecto)
  evento.preventDefault();

  // Se leen los valores ingresados por el usuario
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const edad = parseInt(document.getElementById("edad").value, 10);
  const altura = parseFloat(document.getElementById("altura").value);
  const peso = parseFloat(document.getElementById("peso").value);

  // Validacion basica
  if (isNaN(edad) || isNaN(altura) || isNaN(peso)) {
    alert("Por favor completá todos los campos con valores válidos.");
    return;
  }

  // Se incrementa el contador y se arma el nuevo objeto persona
  contadorId++;
  const nuevaPersona = {
    id: contadorId,
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    altura: altura,
    peso: peso
  };

  // Se agrega la nueva persona al arreglo
  personas.push(nuevaPersona);

  // Se vuelve a dibujar la tabla con la persona ya incluida
  renderizarTabla();

  // Se limpia el formulario para cargar una nueva persona mas comodo
  formulario.reset();
});

//click en cualquier boton "Quitar" dentro de la tabla
cuerpoTabla.addEventListener("click", function (evento) {
  // Se verifica que lo clickeado sea efectivamente un boton de quitar
  if (evento.target.classList.contains("btn-quitar")) {
    // Se obtiene el id guardado en el atributo data-id del boton
    const idAQuitar = parseInt(evento.target.getAttribute("data-id"), 10);

    // Se filtra el arreglo, dejando afuera a la persona con ese id
    personas = personas.filter(function (persona) {
      return persona.id !== idAQuitar;
    });

    // Se vuelve a dibujar la tabla sin la persona eliminada
    renderizarTabla();
  }
});