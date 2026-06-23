const { useState } = React;

// Alias para no escribir React.createElement cada vez
const h = React.createElement;

// Funcion auxiliar que calcula el IMC a partir de peso (kg) y altura (m)
function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
  return imc.toFixed(1);
}

// Funcion auxiliar que clasifica el IMC en una categoria
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

// Funcion auxiliar que crea un campo de formulario completo
function campoFormulario(config) {
  return h("div", { className: "campo-form", key: config.id }, [
    h("label", { htmlFor: config.id, key: "label" }, config.etiqueta),
    h("input", {
      key: "input",
      type: config.tipo,
      id: config.id,
      min: config.min,
      max: config.max,
      step: config.step,
      value: config.valor,
      onChange: (e) => config.alCambiar(e.target.value),
      required: true
    })
  ]);
}

// Componente que muestra el formulario para agregar una persona
function FormularioPersona({ onAgregar }) {
  // Cada campo del formulario se maneja con su propio estado
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");

  // Funcion que se ejecuta al enviar el formulario
  function manejarEnvio(evento) {
    // Se evita el comportamiento por defecto (recargar la pagina)
    evento.preventDefault();

    // Se convierten los valores numericos
    const edadNum = parseInt(edad, 10);
    const alturaNum = parseFloat(altura);
    const pesoNum = parseFloat(peso);

    // Validacion basica antes de agregar
    if (!nombre.trim() || !apellido.trim() || isNaN(edadNum) || isNaN(alturaNum) || isNaN(pesoNum)) {
      alert("Por favor completá todos los campos con valores válidos.");
      return;
    }

    // Se le pasa la nueva persona al componente padre
    onAgregar({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      edad: edadNum,
      altura: alturaNum,
      peso: pesoNum
    });

    // Se limpia el formulario una vez agregada la persona
    setNombre("");
    setApellido("");
    setEdad("");
    setAltura("");
    setPeso("");
  }

  // Se arma el formulario completo a partir de los 5 campos
  return h("form", { className: "form-personas", onSubmit: manejarEnvio }, [
    campoFormulario({ id: "nombre", etiqueta: "Nombre", tipo: "text", valor: nombre, alCambiar: setNombre }),
    campoFormulario({ id: "apellido", etiqueta: "Apellido", tipo: "text", valor: apellido, alCambiar: setApellido }),
    campoFormulario({ id: "edad", etiqueta: "Edad", tipo: "number", min: 0, max: 120, valor: edad, alCambiar: setEdad }),
    campoFormulario({ id: "altura", etiqueta: "Altura (m)", tipo: "number", min: 0.3, max: 2.5, step: 0.01, valor: altura, alCambiar: setAltura }),
    campoFormulario({ id: "peso", etiqueta: "Peso (kg)", tipo: "number", min: 1, max: 400, step: 0.1, valor: peso, alCambiar: setPeso }),
    h("button", { type: "submit", key: "boton" }, "Agregar persona")
  ]);
}

// Componente que muestra la tabla de personas
function TablaPersonas({ personas, onQuitar }) {
  // Encabezado de la tabla
  const encabezado = h("thead", null,
    h("tr", null, [
      h("th", { key: "nombre" }, "Nombre"),
      h("th", { key: "apellido" }, "Apellido"),
      h("th", { key: "edad" }, "Edad"),
      h("th", { key: "altura" }, "Altura (m)"),
      h("th", { key: "peso" }, "Peso (kg)"),
      h("th", { key: "imc" }, "IMC"),
      h("th", { key: "accion" }, "Acción")
    ])
  );

  // Cuerpo de la tabla
  const filas = personas.map((persona) => {
    const imc = calcularIMC(persona.peso, persona.altura);
    const categoria = clasificarIMC(imc);

    return h("tr", { key: persona.id }, [
      h("td", { key: "nombre" }, persona.nombre),
      h("td", { key: "apellido" }, persona.apellido),
      h("td", { key: "edad" }, persona.edad),
      h("td", { key: "altura" }, persona.altura),
      h("td", { key: "peso" }, persona.peso),
      h("td", { key: "imc" }, `${imc} (${categoria})`),
      h("td", { key: "accion" },
        h("button", {
          className: "btn-quitar",
          onClick: () => onQuitar(persona.id)
        }, "Quitar")
      )
    ]);
  });

  return h("table", { className: "tabla-personas" }, [
    encabezado,
    h("tbody", { key: "cuerpo" }, filas)
  ]);
}

// Componente principal de la aplicacion
function App() {
  // Arreglo de personas
  const [personas, setPersonas] = useState([]);

  // Contador para asignar un id unico a cada persona (igual que con contadorId en personas.js)
  const [contadorId, setContadorId] = useState(0);

  // Funcion que agrega una nueva persona al estado
  function agregarPersona(nuevaPersona) {
    const siguienteId = contadorId + 1;
    setContadorId(siguienteId);

    // Se crea un nuevo arreglo con el spread operator, sin mutar el anterior
    setPersonas([...personas, { id: siguienteId, ...nuevaPersona }]);
  }

  // Funcion que quita una persona del estado, filtrando por id
  function quitarPersona(idAQuitar) {
    setPersonas(personas.filter((persona) => persona.id !== idAQuitar));
  }

  return h(React.Fragment, null, [
    h(FormularioPersona, { key: "form", onAgregar: agregarPersona }),
    h(TablaPersonas, { key: "tabla", personas: personas, onQuitar: quitarPersona })
  ]);
}

// Se monta el componente principal dentro del div#root definido en react.html
const raiz = ReactDOM.createRoot(document.getElementById("root"));
raiz.render(h(App));