// Reseñas de clientes que muestra el carrusel de la home.
//
// IMPORTANTE: estas reseñas son DE EJEMPLO. Mientras `ejemplo` sea true, cada tarjeta
// muestra el rótulo «Testimonio de ejemplo». Cuando tengas reseñas reales (con permiso
// escrito de cada persona), reemplaza este arreglo y pon `ejemplo: false` en cada una.

export type Testimonio = {
  nombre: string;
  cargo: string;
  ciudad: string;
  /** Cita corta, en palabras de la persona. Sin cifras de ingresos ni promesas. */
  cita: string;
  /** Programa o recurso que usó (opcional). */
  programa?: string;
  ejemplo: boolean;
};

export const TESTIMONIOS: Testimonio[] = [
  {
    nombre: "Patricia Salazar",
    cargo: "Gerenta de Finanzas",
    ciudad: "Lima",
    cita: "Llené la K.1 un domingo por la tarde. Fue la primera vez que vi en una sola cifra cuántos meses aguanta mi casa sin mi sueldo.",
    programa: "Kit «Plan de salida»",
    ejemplo: true,
  },
  {
    nombre: "Andrés Mejía",
    cargo: "Director Comercial",
    ciudad: "Bogotá",
    cita: "Antes de firmar mi salida revisé la liquidación con la plantilla del kit y llevé dos preguntas concretas a mi abogado.",
    programa: "Kit «Plan de salida»",
    ejemplo: true,
  },
  {
    nombre: "Mariana Treviño",
    cargo: "Directora de Operaciones",
    ciudad: "Monterrey",
    cita: "El taller me obligó a escribir mi oferta en una página. Mi primera versión tenía cuatro; la que le mandé a un cliente, una.",
    programa: "Taller «Tu primer rol parcial»",
    ejemplo: true,
  },
  {
    nombre: "Felipe Rojas",
    cargo: "VP de Tecnología",
    ciudad: "Santiago",
    cita: "Lo que más me sirvió fue preparar la conversación con mi empleador. Pedí la autorización por escrito y me la dieron en dos semanas.",
    programa: "Programa «Primer Mandato»",
    ejemplo: true,
  },
  {
    nombre: "Lucía Fernández",
    cargo: "Gerenta de Recursos Humanos",
    ciudad: "Ciudad de México",
    cita: "En el grupo escuché a otros ejecutivos ponerle precio a su trabajo. Salí con un rango para el mío y con dos nombres a quienes llamar.",
    programa: "Mastermind «Portafolio»",
    ejemplo: true,
  },
  {
    nombre: "Gonzalo Paredes",
    cargo: "Gerente de Planeamiento",
    ciudad: "Arequipa",
    cita: "Nadie me pidió renunciar. Sigo en mi cargo y tengo anotada la cifra que tendría que ver tres meses seguidos antes de pensar en salir.",
    programa: "Doble Agente",
    ejemplo: true,
  },
  {
    nombre: "Carolina Vega",
    cargo: "Directora de Marketing",
    ciudad: "Quito",
    cita: "En las sesiones armamos mi calendario de las primeras cuatro semanas después de salir. Llegaba a cada reunión con la plantilla llena.",
    programa: "Sesiones 1:1 de transición",
    ejemplo: true,
  },
];
