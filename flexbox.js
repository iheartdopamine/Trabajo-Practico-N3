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