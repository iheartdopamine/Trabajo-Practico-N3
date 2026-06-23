// Arreglo de datos que se usara para generar las tarjetas
const lenguajes = [
  { nombre: "JavaScript", descripcion: "Lenguaje principal del navegador.", favorito: true },
  { nombre: "Python", descripcion: "Sintaxis simple, muy usado en datos.", favorito: false },
  { nombre: "HTML", descripcion: "Estructura el contenido de la web.", favorito: true },
  { nombre: "CSS", descripcion: "Define estilos y maquetacion.", favorito: false },
  { nombre: "Java", descripcion: "Lenguaje orientado a objetos clasico.", favorito: false },
  { nombre: "C#", descripcion: "Usado en .NET y videojuegos con Unity.", favorito: false },
  { nombre: "TypeScript", descripcion: "JavaScript con tipado estatico.", favorito: true },
  { nombre: "SQL", descripcion: "Lenguaje para consultar bases de datos.", favorito: false }
];

// Copia del orden original, para poder restablecerlo despues
const ordenOriginal = [...lenguajes];

const contenedor = document.getElementById("contenedor-tarjetas");
let resaltarActivo = false; // controla si el modo resaltado esta encendido

function renderizarTarjetas(arreglo) {
  contenedor.innerHTML = ""; // se limpia lo que había antes

  for (let i = 0; i < arreglo.length; i++) {
    const item = arreglo[i];

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-flex";

    // Condicional: si el resaltado esta activo y el item es favorito, suma una clase
    if (resaltarActivo && item.favorito) {
      tarjeta.classList.add("tarjeta-destacada");
    }

    tarjeta.innerHTML = `
      <h3>${item.nombre}</h3>
      <p>${item.descripcion}</p>
    `;

    contenedor.appendChild(tarjeta);
  }
}

// Ordenar alfabéticamente
document.getElementById("btn-ordenar").addEventListener("click", function () {
  const copiaOrdenada = [...lenguajes].sort((a, b) => a.nombre.localeCompare(b.nombre));
  renderizarTarjetas(copiaOrdenada);
});

// Alternar resaltado de favoritos
document.getElementById("btn-resaltar").addEventListener("click", function () {
  resaltarActivo = !resaltarActivo;
  renderizarTarjetas(lenguajes);
});

// Restablecer todo
document.getElementById("btn-reset").addEventListener("click", function () {
  resaltarActivo = false;
  renderizarTarjetas(ordenOriginal);
});

renderizarTarjetas(lenguajes);