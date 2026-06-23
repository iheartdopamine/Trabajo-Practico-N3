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

// Componente para el formulario de ingreso de personas
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

  // Renderizado del formulario
  return (
    <form className="form-personas" onSubmit={manejarEnvio}>

      <div className="campo-form">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div className="campo-form">
        <label htmlFor="apellido">Apellido</label>
        <input
          type="text"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>

      <div className="campo-form">
        <label htmlFor="edad">Edad</label>
        <input
          type="number"
          id="edad"
          min="0"
          max="120"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
        />
      </div>

      <div className="campo-form">
        <label htmlFor="altura">Altura (m)</label>
        <input
          type="number"
          id="altura"
          min="0.3"
          max="2.5"
          step="0.01"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          required
        />
      </div>

      <div className="campo-form">
        <label htmlFor="peso">Peso (kg)</label>
        <input
          type="number"
          id="peso"
          min="1"
          max="400"
          step="0.1"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          required
        />
      </div>

      <button type="submit">Agregar persona</button>
    </form>
  );
}

// Componente para mostrar la tabla de personas
function TablaPersonas({ personas, onQuitar }) {
  return (
    <table className="tabla-personas">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th>
          <th>Altura (m)</th>
          <th>Peso (kg)</th>
          <th>IMC</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {personas.map((persona) => {
          const imc = calcularIMC(persona.peso, persona.altura);
          const categoria = clasificarIMC(imc);
 
          return (
            <tr key={persona.id}>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>{persona.edad}</td>
              <td>{persona.altura}</td>
              <td>{persona.peso}</td>
              <td>{imc} ({categoria})</td>
              <td>
                <button className="btn-quitar" onClick={() => onQuitar(persona.id)}>
                  Quitar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
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
 
  return (
    <React.Fragment>
      <FormularioPersona onAgregar={agregarPersona} />
      <TablaPersonas personas={personas} onQuitar={quitarPersona} />
    </React.Fragment>
  );
}
 
// Se monta el componente principal dentro del div#root definido en react.html
const raiz = ReactDOM.createRoot(document.getElementById("root"));
raiz.render(<App />);