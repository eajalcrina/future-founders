// Reseñas de participantes para la portada.
//
// La sección de reseñas está APAGADA: solo aparece cuando `TESTIMONIOS` tiene al menos una
// reseña real, con `ejemplo: false` y la fecha del permiso escrito en `permiso`.
// Pasos para activarla: PENDIENTES-WEB.md, bloque «Cómo activar las reseñas».
//
// `EJEMPLOS_DE_FORMATO` no se muestra en ninguna página. Son textos inventados que sirven solo
// como guía de largo y tono para pedir y editar las reseñas reales. No copiarlos a `TESTIMONIOS`.

export type Testimonio = {
  nombre: string;
  cargo: string;
  ciudad: string;
  /** Cita corta, en palabras de la persona. Sin cifras de ingresos ni promesas. */
  cita: string;
  /** Programa o recurso que usó (opcional). */
  programa?: string;
  /** true en los textos de muestra; una reseña con true nunca se muestra. */
  ejemplo: boolean;
  /** Fecha del permiso escrito de la persona para publicar su reseña (por ejemplo «2026-12-03»). Sin permiso no se muestra. */
  permiso: string;
};

/** Reseñas reales con permiso. Vacío: la sección no aparece. */
export const TESTIMONIOS: Testimonio[] = [];

/** Solo guía de formato. Inventadas: no se publican. */
export const EJEMPLOS_DE_FORMATO: Testimonio[] = [
  {
    nombre: "Patricia Salazar",
    cargo: "Gerenta de Finanzas",
    ciudad: "Lima",
    cita: "Llené la K.1 un domingo por la tarde. Fue la primera vez que vi en una sola cifra cuántos meses aguanta mi casa sin mi sueldo.",
    programa: "Kit «Plan de salida»",
    ejemplo: true,
    permiso: "",
  },
  {
    nombre: "Andrés Mejía",
    cargo: "Director Comercial",
    ciudad: "Bogotá",
    cita: "Antes de firmar mi salida revisé la liquidación con la plantilla del kit y llevé dos preguntas concretas a mi abogado.",
    programa: "Kit «Plan de salida»",
    ejemplo: true,
    permiso: "",
  },
  {
    nombre: "Mariana Treviño",
    cargo: "Directora de Operaciones",
    ciudad: "Monterrey",
    cita: "El taller me obligó a escribir mi oferta en una página. Mi primera versión tenía cuatro; la que le mandé a un cliente, una.",
    programa: "Taller «Tu primer rol parcial»",
    ejemplo: true,
    permiso: "",
  },
  {
    nombre: "Felipe Rojas",
    cargo: "VP de Tecnología",
    ciudad: "Santiago",
    cita: "Lo que más me sirvió fue preparar la conversación con mi empleador. Pedí la autorización por escrito y me la dieron en dos semanas.",
    programa: "Programa «Primer Mandato»",
    ejemplo: true,
    permiso: "",
  },
  {
    nombre: "Lucía Fernández",
    cargo: "Gerenta de Recursos Humanos",
    ciudad: "Ciudad de México",
    cita: "En el grupo escuché a otros ejecutivos ponerle precio a su trabajo. Salí con un rango para el mío y con dos nombres a quienes llamar.",
    programa: "Mastermind «Portafolio»",
    ejemplo: true,
    permiso: "",
  },
  {
    nombre: "Gonzalo Paredes",
    cargo: "Gerente de Planeamiento",
    ciudad: "Arequipa",
    cita: "Nadie me pidió renunciar. Sigo en mi cargo y tengo anotada la cifra que tendría que ver tres meses seguidos antes de pensar en salir.",
    programa: "Doble Agente",
    ejemplo: true,
    permiso: "",
  },
  {
    nombre: "Carolina Vega",
    cargo: "Directora de Marketing",
    ciudad: "Quito",
    cita: "En las sesiones armamos mi calendario de las primeras cuatro semanas después de salir. Llegaba a cada reunión con la plantilla llena.",
    programa: "Sesiones individuales de transición",
    ejemplo: true,
    permiso: "",
  },
];

/** Las reseñas que se pueden publicar: reales y con permiso. */
export const RESENAS_PUBLICABLES = (items: Testimonio[]) => items.filter((t) => !t.ejemplo && t.permiso.trim() !== "");
