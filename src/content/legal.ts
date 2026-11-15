// Textos de /privacidad y /terminos. Describen lo que la web hace hoy (formularios a la hoja de Google
// de los fundadores por /api/registro (Vercel) y apps-script/Code.gs, correo de confirmación, calculadoras en el navegador, sin analítica).
// Texto base, pendiente de revisión legal: ver PENDIENTES-WEB.md. Si cambia un formulario o se suma una
// herramienta de medición, este texto cambia con él.

import { EMAIL, RESPONSABLE } from "./sitio";

export type Bloque = { h: string; p: string[] };
export type Legal = { title: string; description: string; label: string[]; vigente: string; bloques: Bloque[] };

export const VIGENTE = "Vigente desde el 16 de noviembre de 2026";

export const PRIVACIDAD: Legal = {
  title: "Política de privacidad",
  description:
    "Qué datos guarda Future Founders cuando llenas un formulario, dónde se guardan, para qué se usan y cómo dejas de recibir correos o pides que los borremos.",
  label: ["Legal", "Privacidad"],
  vigente: VIGENTE,
  bloques: [
    { h: "Quién responde por tus datos", p: [`${RESPONSABLE}. Contacto: ${EMAIL}.`] },
    {
      h: "Qué datos guardamos",
      p: [
        "Solo los que escribes en un formulario. Al pedir el kit «Plan de salida» o el workbook: nombre, correo, situación laboral y país. Al pedir el resultado del diagnóstico de nivel: nombre, correo, tu nivel y tus respuestas sobre situación, ingresos propios y colchón. Al postular a un programa: programa, nombre, correo, país y el mensaje que escribas.",
        "Junto a cada registro queda la fecha y la hora. En los formularios de descarga queda también la página desde la que lo enviaste.",
      ],
    },
    {
      h: "Dónde se guardan",
      p: [
        "El sitio se aloja en Vercel, que procesa cada envío de formulario y lo pasa a una hoja de cálculo de Google a la que solo acceden los fundadores de Future Founders. Google presta el servicio de la hoja y del correo. Vercel y Google guardan los datos en servidores fuera del Perú, principalmente en Estados Unidos.",
      ],
    },
    {
      h: "Para qué los usamos",
      p: [
        "Para enviarte un correo de confirmación con el PDF que pediste o con la respuesta a tu postulación, para avisar al equipo de que llegó tu registro y para escribirte sobre el libro y los programas. No vendemos ni cedemos tus datos.",
      ],
    },
    {
      h: "Cuánto tiempo los guardamos",
      p: [
        "Mientras sigas recibiendo nuestros correos y hasta 24 meses después de tu último registro o de tu última respuesta. Si pides la baja o que borremos tus datos, dejamos de escribirte de inmediato y los borramos de la hoja en un plazo máximo de 30 días. Los datos de una compra se guardan el tiempo que exige la ley tributaria.",
      ],
    },
    {
      h: "Cómo dejas de recibir correos",
      p: [`Responde cualquier correo nuestro con la palabra «baja». Para corregir o borrar tus datos, escribe a ${EMAIL}.`],
    },
    {
      h: "Las calculadoras",
      p: [
        "Los números que escribes en las calculadoras del sitio se guardan solo en tu navegador, en su almacenamiento local, para que los encuentres al volver. No llegan a nuestros servidores y se borran al limpiar los datos del navegador.",
      ],
    },
    { h: "El diagnóstico de nivel", p: ["Tus respuestas se quedan en tu navegador. Solo se envían si pides el resultado por correo."] },
    {
      h: "Ley aplicable y tus derechos",
      p: [
        `Esta política se rige por la Ley N.º 29733, Ley de Protección de Datos Personales del Perú, y su reglamento. Puedes pedir acceso, rectificación, cancelación u oposición sobre tus datos escribiendo a ${EMAIL}, y te respondemos dentro de los plazos de esa ley. Si no quedas conforme con la respuesta, puedes acudir a la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.`,
      ],
    },
    { h: "Cookies", p: ["El sitio no usa cookies de publicidad ni de seguimiento."] },
    {
      h: "Enlaces a otros servicios",
      p: ["Los botones de WhatsApp, Amazon, Mercado Pago y la agenda de Google Calendar abren servicios de terceros, con sus propias políticas."],
    },
    { h: "Cambios", p: ["Si esta política cambia, publicamos aquí la versión nueva con su fecha."] },
  ],
};

export const TERMINOS: Legal = {
  title: "Términos de uso",
  description:
    "Condiciones de uso de futurefounders.pe: qué ofrece el sitio, cómo se compra el libro, el alcance de las calculadoras y el diagnóstico, y el uso del material.",
  label: ["Legal", "Términos"],
  vigente: VIGENTE,
  bloques: [
    { h: "Quién opera el sitio", p: [`${RESPONSABLE}. Contacto: ${EMAIL}.`] },
    {
      h: "Qué ofrece",
      p: ["Información sobre el libro Doble Agente y los programas, el kit «Plan de salida» y el workbook en PDF sin costo, el diagnóstico de nivel y calculadoras en línea."],
    },
    {
      h: "Sin asesoría ni promesas",
      p: [
        "Nada en este sitio es asesoría legal, tributaria ni financiera, ni una promesa de ingresos. Las reglas por país son la regla general; verifica la norma vigente y consulta a un profesional antes de decidir.",
      ],
    },
    {
      h: "Calculadoras y diagnóstico",
      p: ["Hacen cuentas con los números que tú escribes. El resultado depende de esos números y sirve como referencia."],
    },
    {
      h: "Compras",
      p: [
        "El ebook y el impreso se compran en Amazon, con las condiciones de Amazon. El libro en PDF se paga con Mercado Pago, con las condiciones de Mercado Pago.",
        `Después del pago con Mercado Pago te enviamos el PDF al correo que registraste en el pago, en un plazo máximo de 6 horas. Si no te llega en ese plazo o el archivo no abre, escríbenos a ${EMAIL} y te lo reenviamos. Si no podemos entregártelo, te devolvemos el pago completo. Como es un producto digital, una vez entregado el PDF solo hay devolución si el archivo tiene una falla que no podamos corregir.`,
      ],
    },
    { h: "Programas", p: ["Las fechas, los cupos, el precio y las condiciones de cada programa se informan en cada convocatoria."] },
    {
      h: "Uso del material",
      p: [
        "El libro, el workbook, el kit y los textos del sitio son de sus autores. Puedes usar las plantillas para tu propio plan; no puedes revenderlas ni publicarlas como propias.",
      ],
    },
    { h: "Personajes", p: ["Carmen, Javier, Andrea y Rodrigo son arquetipos del libro, armados a partir de conversaciones reales."] },
    {
      h: "Ley aplicable",
      p: [
        `Estos términos se rigen por las leyes del Perú, incluido el Código de Protección y Defensa del Consumidor (Ley N.º 29571). Para un reclamo, escríbenos a ${EMAIL}.`,
      ],
    },
    { h: "Cambios", p: ["Estos términos pueden cambiar. La versión vigente es la publicada aquí, con su fecha."] },
  ],
};
