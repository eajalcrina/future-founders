// Generado desde maqueta-v3/chapters/*/meta.json y wb.json (ids de los QR del libro impreso).
// Para regenerar: scratchpad/web-impl-tools/wb.py

export type Plantilla = {
  id: string;
  code: string;
  title: string;
  time: string;
  kind: "kit" | "capitulo" | "anexo" | "cierre";
  purpose: string | null;
  intro: string | null;
  trae: string | null;
  where: string;
  chapter: { n: number; title: string } | null;
  part: { num: string; name: string } | null;
  level: string | null;
  who: string | null;
  summary: string[];
  toolkit: { label: string; href: string } | null;
};

export const PARTES: Record<string, string> = {"01": "Diagnóstico", "02": "Mercado", "03": "Oferta", "04": "Primeros clientes", "05": "Transición"};

export const PLANTILLAS: Plantilla[] = [
 {
  "id": "k1",
  "code": "K.1",
  "title": "Tu runway hoy",
  "time": "20 minutos",
  "kind": "kit",
  "purpose": "Saber cuántos meses aguantas sin sueldo.",
  "intro": "Usa números aproximados. El capítulo 1 los lleva a tres escenarios y el capítulo 2 afina tu costo de vida.",
  "trae": "Trae los estados de cuenta de tus últimos tres meses.",
  "where": "Kit «Plan de salida», antes de la Parte 01",
  "chapter": null,
  "part": null,
  "level": "Nivel 0",
  "who": null,
  "summary": [],
  "toolkit": {
   "label": "Runway de Libertad",
   "href": "/toolkit#fase-01"
  }
 },
 {
  "id": "k2",
  "code": "K.2",
  "title": "Lo que dice tu contrato",
  "time": "30 minutos",
  "kind": "kit",
  "purpose": "Saber qué puedes hacer fuera de tu cargo.",
  "intro": "Busca tu contrato, el reglamento interno de trabajo, el código de ética y la política de conflicto de interés de tu empresa. Anota lo que encuentres en cada fila.",
  "trae": "Trae tu contrato y el código de ética de tu empresa.",
  "where": "Kit «Plan de salida», antes de la Parte 01",
  "chapter": null,
  "part": null,
  "level": "Nivel 0",
  "who": null,
  "summary": [],
  "toolkit": null
 },
 {
  "id": "k3",
  "code": "K.3",
  "title": "Tu salida en números",
  "time": "20 minutos",
  "kind": "kit",
  "purpose": "Estimar tu indemnización antes de negociar o firmar.",
  "intro": "Esta plantilla estima lo que recibirías si tu empleador termina tu contrato sin causa. Si ya saliste, úsala para revisar tu liquidación antes de firmarla.",
  "trae": "Trae tu contrato y, si ya saliste, tu liquidación.",
  "where": "Kit «Plan de salida», antes de la Parte 01",
  "chapter": null,
  "part": null,
  "level": "Nivel 0",
  "who": null,
  "summary": [],
  "toolkit": {
   "label": "Runway de Salida",
   "href": "/toolkit#fase-05"
  }
 },
 {
  "id": "k4",
  "code": "K.4",
  "title": "Tus primeros 30 días",
  "time": "30 minutos",
  "kind": "kit",
  "purpose": "Tener decidido qué haces cada semana si sales.",
  "intro": "Llénala aunque tengas empleo. Si un día la necesitas, ya habrás tomado las decisiones con calma. Escribe tu versión de cada semana. Las frases en gris son la guía del libro.",
  "trae": "Trae la K.1 y la K.3.",
  "where": "Kit «Plan de salida», antes de la Parte 01",
  "chapter": null,
  "part": null,
  "level": "Nivel 0",
  "who": null,
  "summary": [],
  "toolkit": null
 },
 {
  "id": "k5",
  "code": "K.5",
  "title": "Tus primeras 20 llamadas",
  "time": "20 minutos",
  "kind": "kit",
  "purpose": "Saber a quién llamas y qué le dices.",
  "intro": "En las primeras conversaciones cuentas en qué estás y preguntas qué problemas ven en sus empresas. La oferta, si aparece, llega en una conversación posterior.",
  "trae": "Trae tu lista de contactos.",
  "where": "Kit «Plan de salida», antes de la Parte 01",
  "chapter": null,
  "part": null,
  "level": "Nivel 0",
  "who": null,
  "summary": [],
  "toolkit": null
 },
 {
  "id": "1-1",
  "code": "1.1",
  "title": "Tus tres runways",
  "time": "25 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tus tres runways, tu meta y el mes en que llegas a ella.",
  "intro": "Usa tus números de la K.1 y la K.3.",
  "trae": "Trae la K.1 y la K.3.",
  "where": "Capítulo 1, El riesgo que no se ve",
  "chapter": {
   "n": 1,
   "title": "El riesgo que no se ve"
  },
  "part": {
   "num": "01",
   "name": "Diagnóstico"
  },
  "level": "Nivel 0",
  "who": "Carmen",
  "summary": [
   "Tu runway base es tu ahorro líquido dividido entre tu costo de vida mensual. El de Carmen es de 7,0 meses.",
   "Lo calculas en tres escenarios: base, de salida y con recorte. Para decidir usas el base.",
   "Fijas una meta de al menos 6 meses y el mes en que llegas a ella. Carmen llega a 9 meses en julio."
  ],
  "toolkit": {
   "label": "Runway de Libertad",
   "href": "/toolkit#fase-01"
  }
 },
 {
  "id": "2-1",
  "code": "2.1",
  "title": "Tus tres cifras de gasto",
  "time": "40 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu CVM actual, tu CVM sin empleo y tu piso, con el runway recalculado.",
  "intro": "Necesitas tres meses de estados de cuenta de todas tus tarjetas y cuentas, y los pagos anuales del último año. Anota los montos por mes, en tu moneda o en dólares, pero en la misma en toda la plantilla. El libro usa USD 1 = S/ 3,60 = COP 4.000 = MXN 18,50 = CLP 950.",
  "trae": "Trae tres meses de estados de cuenta y los pagos anuales del último año.",
  "where": "Capítulo 2, Tu costo de vida real",
  "chapter": {
   "n": 2,
   "title": "Tu costo de vida real"
  },
  "part": {
   "num": "01",
   "name": "Diagnóstico"
  },
  "level": "Nivel 0",
  "who": "Carmen",
  "summary": [
   "Tu costo de vida tiene tres cifras: el CVM actual, el CVM sin empleo y el CVM piso. Las de Carmen son USD 8.800, 9.400 y 8.000.",
   "El CVM actual sale de tres meses de estados de cuenta en cuatro grupos: fijos, variables, anuales prorrateados y deudas.",
   "Desde aquí calculas tu runway con el CVM sin empleo. El de Carmen baja de 7,0 a 6,6 meses."
  ],
  "toolkit": {
   "label": "CME, costo mensual de existencia",
   "href": "/toolkit#fase-05"
  }
 },
 {
  "id": "3-1",
  "code": "3.1",
  "title": "Inventario de criterio y valor de mercado",
  "time": "30 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas cinco logros que puedes contar y tu valor de referencia por un día a la semana.",
  "intro": "Necesitas tu CV, tu perfil de LinkedIn y dos guías salariales de tu país. Escribe cada logro sin montos, clientes, proveedores ni documentos de tu empleador.",
  "trae": "Trae tu CV, tu perfil de LinkedIn y dos guías salariales de tu país.",
  "where": "Capítulo 3, Tu criterio ejecutivo es vendible",
  "chapter": {
   "n": 3,
   "title": "Tu criterio ejecutivo es vendible"
  },
  "part": {
   "num": "01",
   "name": "Diagnóstico"
  },
  "level": "Nivel 0",
  "who": "Andrea",
  "summary": [
   "Tu inventario son cinco logros con el problema, tu decisión, el resultado y cómo lo cuentas sin datos de tu empleador.",
   "Su precio de referencia es el sueldo de mercado del cargo equivalente en las empresas que tienen ese problema.",
   "Un día por semana vale ese sueldo × 1/5 × 1,3. Para Andrea son USD 2.600 al mes."
  ],
  "toolkit": {
   "label": "Valor de Mercado Real",
   "href": "/toolkit#fase-01"
  }
 },
 {
  "id": "4-1",
  "code": "4.1",
  "title": "Mapa de conflictos de interés",
  "time": "30 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu mapa de conflictos, el borrador de tu solicitud y tus preguntas para la consulta legal.",
  "intro": "Necesitas tu K.2 llena, tu contrato, el código de ética y la política de actividades externas de tu empresa. Cada fila lleva una respuesta o una acción. Si ya saliste de tu empresa, salta «La autorización» y llena la última sección.",
  "trae": "Trae tu K.2 llena, tu contrato y la política de actividades externas.",
  "where": "Capítulo 4, Juego limpio: contrato, conflicto de interés y transparencia",
  "chapter": {
   "n": 4,
   "title": "Juego limpio: contrato, conflicto de interés y transparencia"
  },
  "part": {
   "num": "01",
   "name": "Diagnóstico"
  },
  "level": "Nivel 0",
  "who": "Andrea",
  "summary": [
   "Lo tuyo se puede vender: tu criterio, tu red y tu tiempo libre. Los datos, los clientes, la información interna y el horario son de la empresa.",
   "Cuando algo queda en la zona gris o tu política lo exige, pides autorización por escrito antes de empezar.",
   "Andrea la pidió el 20 de mayo y Cumplimiento la aprobó el 8 de julio, con cinco condiciones."
  ],
  "toolkit": null
 },
 {
  "id": "5-1",
  "code": "5.1",
  "title": "Tu flujo sin sueldo y tu línea de decisión",
  "time": "30 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas seis meses proyectados en dos escenarios y tu línea de decisión por escrito.",
  "intro": "Necesitas tu saldo de la K.1, tu piso de la K.4 o del capítulo 2 y la fecha probable de tu primer rol. Anota los montos en tu moneda o en dólares, pero en la misma en toda la plantilla; el libro usa USD 1 = S/ 3,60 = COP 4.000 = MXN 18,50 = CLP 950. Si todavía tienes empleo, usa tu CVM sin empleo y no cuentes la indemnización.",
  "trae": "Trae tu saldo de la K.1 y tu piso de la K.4 o del capítulo 2.",
  "where": "Capítulo 5, Si te despiden mañana",
  "chapter": {
   "n": 5,
   "title": "Si te despiden mañana"
  },
  "part": {
   "num": "01",
   "name": "Diagnóstico"
  },
  "level": "Nivel 0",
  "who": "Javier",
  "summary": [
   "Sin sueldo, tu ahorro se vuelve un flujo de seis meses en dos escenarios: sin ingresos y con tu primer rol.",
   "Fijas una línea de decisión con una fecha, una condición de ingresos y un saldo mínimo, y la acuerdas en casa el primer mes.",
   "La de Javier se activa si al 31 de julio no tiene un segundo ingreso firmado o si su ahorro baja de USD 20.000."
  ],
  "toolkit": {
   "label": "Runway de Salida",
   "href": "/toolkit#fase-05"
  }
 },
 {
  "id": "6-1",
  "code": "6.1",
  "title": "Mapa de problemas de USD 100.000",
  "time": "30 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas un problema que pasa los cuatro filtros, con su costo anual y su costo de no actuar al mes.",
  "intro": "Necesitas tu plantilla 3.1 y un dato público de cada sector que tengas en mente. Escribe primero el problema que más le cuesta al cliente; los otros dos van abajo.",
  "trae": "Trae tu plantilla 3.1.",
  "where": "Capítulo 6, El problema de los USD 100.000",
  "chapter": {
   "n": 6,
   "title": "El problema de los USD 100.000"
  },
  "part": {
   "num": "02",
   "name": "Mercado"
  },
  "level": "Niveles 0 y 1",
  "who": "Carmen",
  "summary": [
   "Eliges un problema que le cueste a tu cliente al menos USD 100.000 al año y que ya resolviste antes.",
   "Lo pasas por cuatro filtros: tamaño, experiencia, reconocimiento y medición. Si falla uno, queda fuera o como beneficio adicional.",
   "El de Carmen cuesta USD 150.000 al año, USD 12.500 por cada mes sin resolver, y sostiene hasta USD 30.000 de honorarios."
  ],
  "toolkit": {
   "label": "Costo de inacción",
   "href": "/toolkit#fase-02"
  }
 },
 {
  "id": "7-1",
  "code": "7.1",
  "title": "Matriz de segmentación",
  "time": "30 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu puerto de entrada con su puntaje, sus vecinos y una lista de 10 empresas con nombre.",
  "intro": "Usa el problema de tu plantilla 6.1. Escribe de tres a cinco segmentos, pasa cada uno por el filtro de conflicto y puntúa los que lo pasan. Al final anota el ganador y las 10 empresas con nombre.",
  "trae": "Trae tu plantilla 6.1 y tu plantilla 4.1.",
  "where": "Capítulo 7, Tu puerto de entrada",
  "chapter": {
   "n": 7,
   "title": "Tu puerto de entrada"
  },
  "part": {
   "num": "02",
   "name": "Mercado"
  },
  "level": "Niveles 0 y 1",
  "who": "Rodrigo",
  "summary": [
   "Divides tu mercado en segmentos: grupos de empresas que compran por las mismas razones, de la misma forma y a personas parecidas.",
   "Sacas los que crean un conflicto de interés y puntúas el resto de 1 a 5 en seis criterios, con un máximo de 30.",
   "Rodrigo elige las tiendas en línea de muebles y decoración, con 24 puntos, y puede nombrar hoy 14 tiendas del segmento."
  ],
  "toolkit": null
 },
 {
  "id": "8-1",
  "code": "8.1",
  "title": "Mapa del comprador",
  "time": "25 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas el mapa de quién decide en tu cliente, el orden de tus conversaciones y tu plazo estimado.",
  "intro": "Usa la empresa con la que tienes un contacto en tu puerto de entrada (7.1). En cada fila anota quién es, el trabajo que quiere lograr, lo que teme, lo que necesita ver y cuándo entra en el proceso. Una misma persona puede tener dos papeles.",
  "trae": "Trae tu plantilla 7.1.",
  "where": "Capítulo 8, Quién decide y por qué compra",
  "chapter": {
   "n": 8,
   "title": "Quién decide y por qué compra"
  },
  "part": {
   "num": "02",
   "name": "Mercado"
  },
  "level": "Niveles 0 y 1",
  "who": "Carmen",
  "summary": [
   "En una compra intervienen seis papeles: impulsor, comprador económico, usuario, influenciadores, veto y compras.",
   "Para cada persona anotas el trabajo que quiere lograr, lo que teme y lo que necesita ver. Después ordenas los pasos y estimas el plazo.",
   "En la agroexportadora, la compra del rol de Carmen tiene cinco pasos y tarda entre seis y ocho semanas."
  ],
  "toolkit": null
 },
 {
  "id": "9-1",
  "code": "9.1",
  "title": "TAM rápido",
  "time": "25 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas cuántos clientes necesitas, qué parte del mercado son y tu decisión: seguir, ampliar o replantear.",
  "intro": "Usa tu puerto de entrada de la plantilla 7.1. Cuenta tus clientes con nombre en una fuente pública antes de llenar los números, y escribe los montos en dólares.",
  "trae": "Trae tu plantilla 7.1.",
  "where": "Capítulo 9, ¿Alcanza el mercado?",
  "chapter": {
   "n": 9,
   "title": "¿Alcanza el mercado?"
  },
  "part": {
   "num": "02",
   "name": "Mercado"
  },
  "level": "Niveles 0 y 1",
  "who": "Andrea",
  "summary": [
   "Cuentas tus clientes posibles con nombre en una fuente pública y quitas los que no podrías atender por conflicto de interés.",
   "Con el precio anual calculas el TAM, y con los clientes que necesitas, tu tasa de captura. Si pasa del 10 %, amplías o replanteas.",
   "Andrea necesita 15 de 240 fintechs en cuatro países, el 6,25 %. Solo en México serían el 25 %."
  ],
  "toolkit": {
   "label": "TAM, calculadora de suficiencia",
   "href": "/toolkit#fase-03"
  }
 },
 {
  "id": "10-1",
  "code": "10.1",
  "title": "Propuesta cuantificada",
  "time": "30 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu rango de precio, con su piso y su techo, y tu resultado en una frase con cifra.",
  "intro": "Usa el problema y el costo de la plantilla 6.1 y tu CVM piso de la 2.1. Calcula primero el techo, con cifras que el cliente pueda comprobar, y después el piso, con las tuyas. Las cifras van en dólares: A y B van al año y el resto, al mes.",
  "trae": null,
  "where": "Capítulo 10, Tu propuesta de valor, en números",
  "chapter": {
   "n": 10,
   "title": "Tu propuesta de valor, en números"
  },
  "part": {
   "num": "03",
   "name": "Oferta"
  },
  "level": "Nivel 1",
  "who": "Carmen",
  "summary": [
   "Tu techo es el valor anual que tu trabajo le deja al cliente, dividido entre 5 y entre 12 meses. El de Carmen es de USD 2.500 al mes.",
   "Tu piso es tu CVM piso dividido entre 5 y entre el factor neto de tu país, por cada día semanal. El de Carmen es de USD 2.133.",
   "Tu precio va entre los dos. Carmen tiene rango con un día a la semana; con dos, el piso pasa el techo."
  ],
  "toolkit": {
   "label": "Ecuación del valor percibido",
   "href": "/toolkit#fase-03"
  }
 },
 {
  "id": "11-1",
  "code": "11.1",
  "title": "Tu rol en una página y su precio",
  "time": "35 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu <em>one-pager</em> con su tarifa, su prima y las diez cláusulas de tu contrato.",
  "intro": "Usa tu rango de la plantilla 10.1 y una guía salarial pública de tu país. Calcula primero la tarifa y comprueba que cae en tu rango; después escribe tu <em>one-pager</em> y marca las cláusulas con tu contrato modelo al lado.",
  "trae": null,
  "where": "Capítulo 11, Tu primer rol parcial: formato, precio y contrato",
  "chapter": {
   "n": 11,
   "title": "Tu primer rol parcial: formato, precio y contrato"
  },
  "part": {
   "num": "03",
   "name": "Oferta"
  },
  "level": "Nivel 1",
  "who": "Carmen",
  "summary": [
   "Tu primer rol cabe en una página con cinco partes: el problema, el resultado con su cifra, el formato y la dedicación, el precio y las condiciones del contrato.",
   "La tarifa es el sueldo de mercado del cargo equivalente, por tus días ÷ 5 y por una prima de 1,2 a 1,5. La de Carmen es de USD 2.200 al mes.",
   "El contrato trae diez cláusulas mínimas. Si tienes empleo, tus horas quedan fuera del horario de tu empleador."
  ],
  "toolkit": null
 },
 {
  "id": "12-1",
  "code": "12.1",
  "title": "Ficha de producto",
  "time": "30 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu ficha de producto con su precio, sus horas del primer año y el estado de tu validación.",
  "intro": "Usa tus entregables de los últimos meses y el TAM de la plantilla 9.1. Empieza por lo que se repite: si no encuentras nada igual en tres entregables, anótalo en «Tu decisión» y sigue con roles parciales. Las cifras van en dólares.",
  "trae": null,
  "where": "Capítulo 12, De servicio a producto",
  "chapter": {
   "n": 12,
   "title": "De servicio a producto"
  },
  "part": {
   "num": "03",
   "name": "Oferta"
  },
  "level": "Niveles 1 a 3",
  "who": "Andrea",
  "summary": [
   "Un producto nace de lo que se repite igual con cada cliente. Andrea empaqueta su matriz de 80 controles en una licencia de USD 1.800 al año.",
   "Lo validas cobrando antes de construirlo entero. Andrea vendió tres preventas con el 50 % adelantado, USD 2.700, antes de terminarlo.",
   "Con 15 licencias, cada hora le deja unos USD 237 brutos; con 6, unos 103, menos que los 125 del consejo asesor."
  ],
  "toolkit": null
 },
 {
  "id": "13-1",
  "code": "13.1",
  "title": "Unidad económica",
  "time": "35 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu LTV, tu CAC y cuánto cambia tu ingreso neto con los clientes que planeas conseguir.",
  "intro": "Necesitas los ingresos y costos de tu negocio de los últimos tres meses, en dólares al mes. Llena la primera columna con tus clientes de hoy y la segunda con el segmento que quieres conseguir. Si tu ruta es un rol parcial, ve directo a la versión de tres líneas, al final de esta plantilla.",
  "trae": null,
  "where": "Capítulo 13, La unidad económica",
  "chapter": {
   "n": 13,
   "title": "La unidad económica"
  },
  "part": {
   "num": "03",
   "name": "Oferta"
  },
  "level": "Niveles 1 y 2",
  "who": "Rodrigo",
  "summary": [
   "Un cliente vale el margen que te deja cada mes por los meses que se queda. El cliente nuevo de Rodrigo vale USD 12.000.",
   "Conviene conseguirlo si ese valor es al menos 3 veces lo que cuesta. Rodrigo paga USD 1.600 por cliente: 7,5 veces.",
   "Cuatro clientes nuevos, con la furgoneta y el impuesto, le dejan a Rodrigo USD 900 netos más al mes."
  ],
  "toolkit": {
   "label": "CAC y LTV, salud del negocio",
   "href": "/toolkit#fase-04"
  }
 },
 {
  "id": "14-1",
  "code": "14.1",
  "title": "Tus 30 cuentas",
  "time": "30 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tus 30 cuentas, su reparto por grupo y tu embudo.",
  "intro": "Usa tu lista de la K.5 como punto de partida. Antes de escribir, tacha las cuentas que tu mapa de conflictos (4.1) o tu convenio de salida te impiden contactar. Escribe primero tu mensaje de tres frases, llena el reparto por grupo y después anota una cuenta por fila, con el mismo número en las tres tablas de la lista.",
  "trae": "Trae tu lista de la K.5.",
  "where": "Capítulo 14, Tu red como canal",
  "chapter": {
   "n": 14,
   "title": "Tu red como canal"
  },
  "part": {
   "num": "04",
   "name": "Primeros clientes"
  },
  "level": "Nivel 1",
  "who": "Javier",
  "summary": [
   "Armas una lista de 30 cuentas, empresas donde conoces al menos a una persona, repartidas en cinco grupos.",
   "Escribes un mensaje de tres frases sobre un problema y, a los diez días, mandas un seguimiento que le sirve al otro.",
   "Javier escribió a 30 cuentas y firmó 2 contratos antes del 31 de julio, la fecha de su línea de decisión."
  ],
  "toolkit": null
 },
 {
  "id": "15-1",
  "code": "15.1",
  "title": "Guion de la conversación de diagnóstico",
  "time": "25 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu guion de preguntas y la hoja para anotar lo que confirmaste en cada reunión.",
  "intro": "Escribe tus preguntas antes de la reunión y lleva esta hoja impresa o en tu tableta. Antes de la reunión, marca las tres casillas de control. Pregunta por hechos del pasado: qué pasó, cuánto les costó, quién lo resolvió. Después de la reunión, llena la hoja siguiente.",
  "trae": "Trae la 11.1 y tu lista de la 14.1.",
  "where": "Capítulo 15, La conversación de diagnóstico",
  "chapter": {
   "n": 15,
   "title": "La conversación de diagnóstico"
  },
  "part": {
   "num": "04",
   "name": "Primeros clientes"
  },
  "level": "Nivel 1",
  "who": "Carmen",
  "summary": [
   "En la primera reunión preguntas por hechos del pasado y dejas que el cliente calcule cuánto le cuesta su problema.",
   "Una hora se reparte en cinco momentos, y tú hablas sobre todo en los diez minutos del último.",
   "La gerenta calculó con sus propios números un ahorro de USD 150.000 al año y acordó una reunión con fecha."
  ],
  "toolkit": null
 },
 {
  "id": "16-1",
  "code": "16.1",
  "title": "Propuesta, contrato y primer comprobante",
  "time": "40 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu declaración, tu contrato y tu primer comprobante, con la reserva para el impuesto.",
  "intro": "Ten a mano tu contrato de trabajo o tu convenio de salida, la 4.1, la 11.1 y tu número de registro tributario. Llena las tres partes en orden: la declaración va antes de la aprobación del cliente, la firma antes del primer día de trabajo y el comprobante al cierre del primer mes. Cuando emitas el primero, anota la fecha también en «Tu nivel en la escalera», al comienzo del workbook.",
  "trae": "Trae la 4.1 y la 11.1.",
  "where": "Capítulo 16, El primer contrato y el primer comprobante",
  "chapter": {
   "n": 16,
   "title": "El primer contrato y el primer comprobante"
  },
  "part": {
   "num": "04",
   "name": "Primeros clientes"
  },
  "level": "Nivel 1",
  "who": "Carmen",
  "summary": [
   "Declaras al empleador si corresponde, firmas el contrato, trabajas y al cierre del primer mes emites el comprobante, en ese orden.",
   "Tu contrato dice qué haces, cuánto cobras, cómo se termina y qué no vas a hacer.",
   "De cada USD 2.200 que factura, Carmen lleva 1.650 a su colchón. Su primer recibo, el 31 de octubre, la deja en el nivel 1."
  ],
  "toolkit": null
 },
 {
  "id": "17-1",
  "code": "17.1",
  "title": "Agenda semanal y acuerdos de casa",
  "time": "25 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu semana de ocho horas, tus tres acuerdos de casa y tu registro de energía.",
  "intro": "Ten abierto tu calendario de las próximas cuatro semanas. Cada bloque lleva día, hora y para qué, fuera del horario de tu empleador. Si el total pasa de ocho horas, decide qué delegas o qué pospones antes de seguir. Si ya saliste, deja en blanco las horas del empleador, anota tus días por cliente y el día que no cedes.",
  "trae": "Trae tu calendario de las próximas cuatro semanas.",
  "where": "Capítulo 17, Tu agenda, tu energía y tu familia",
  "chapter": {
   "n": 17,
   "title": "Tu agenda, tu energía y tu familia"
  },
  "part": {
   "num": "04",
   "name": "Primeros clientes"
  },
  "level": "Niveles 1 y 2",
  "who": "Andrea",
  "summary": [
   "Fijas las horas de tu plan en el calendario, fuera del horario de tu empleador, con un tope de ocho por semana.",
   "Escribes en casa tres acuerdos y revisas cada semana tus horas, tu sueño y tus fines de semana libres.",
   "Andrea delegó diez horas al mes por USD 250 y su semana volvió a caber en ocho horas."
  ],
  "toolkit": null
 },
 {
  "id": "18-1",
  "code": "18.1",
  "title": "Tablero de portafolio",
  "time": "30 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu tablero con el neto, el peso y la renovación de cada rol, y tus dos brechas al punto de no retorno.",
  "intro": "Necesitas tus contratos y tus comprobantes de los últimos tres meses. Primero llenas una columna por rol y después el pie del tablero. Anota todo en dólares por mes.",
  "trae": "Trae tus contratos y comprobantes.",
  "where": "Capítulo 18, Del primer rol al portafolio",
  "chapter": {
   "n": 18,
   "title": "Del primer rol al portafolio"
  },
  "part": {
   "num": "05",
   "name": "Transición"
  },
  "level": "Nivel 2",
  "who": "Javier",
  "summary": [
   "Mides tus roles juntos cada mes con su neto, sus días, su peso y su renovación. Javier suma 10.150 netos con tres roles.",
   "Ningún cliente pasa del 50 % de tu ingreso, y cada renovación se prepara con 60 días de anticipación.",
   "El pie del tablero te dice tu nivel y tus dos brechas. A Javier le faltan 1.850 al mes y 36.540 de colchón."
  ],
  "toolkit": {
   "label": "Clientes para la libertad y MRR",
   "href": "/toolkit#fase-04"
  }
 },
 {
  "id": "19-1",
  "code": "19.1",
  "title": "Punto de no retorno",
  "time": "25 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tus dos condiciones medidas, lo que te falta de cada una y la fecha de tu próxima revisión.",
  "intro": "Usa tu CVM sin empleo de la plantilla 2.1 y tus comprobantes de los últimos tres meses. Los ingresos propios van netos de impuestos y aportes, sin contar tu sueldo.",
  "trae": "Trae tu plantilla 2.1 y tus comprobantes de los últimos tres meses.",
  "where": "Capítulo 19, El punto de no retorno",
  "chapter": {
   "n": 19,
   "title": "El punto de no retorno"
  },
  "part": {
   "num": "05",
   "name": "Transición"
  },
  "level": "Niveles 2 y 3",
  "who": "Rodrigo",
  "summary": [
   "Llegas al punto de no retorno con dos condiciones a la vez: ingresos propios netos de 1,2 × CVM tres meses seguidos y un colchón de 6 × CVM.",
   "Rodrigo necesita 8.400 al mes y recibe 8.500. Su colchón de 46.700 pasa los 42.000.",
   "Si te falta una condición, el marco te dice qué mover primero. Con las dos, volver a un empleo pasa a ser una elección."
  ],
  "toolkit": {
   "label": "Punto de no retorno",
   "href": "/toolkit#fase-05"
  }
 },
 {
  "id": "20-1",
  "code": "20.1",
  "title": "Guion y comparación de opciones",
  "time": "35 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu guion escrito, el efecto de cada opción en tus números y quién revisará lo que firmes.",
  "intro": "Usa tu K.3 actualizada y tu plantilla 19.1. Llénala con la conversación que tienes más cerca, aunque sea solo la declaración anual. Las cifras van en tu moneda o en dólares, la misma en toda la hoja.",
  "trae": "Trae tu K.3 actualizada y tu plantilla 19.1.",
  "where": "Capítulo 20, La conversación con tu empleador",
  "chapter": {
   "n": 20,
   "title": "La conversación con tu empleador"
  },
  "part": {
   "num": "05",
   "name": "Transición"
  },
  "level": "Niveles 2 y 3",
  "who": "Carmen",
  "summary": [
   "Hay tres conversaciones con tu empleador: declarar, pedir y acordar una salida. Cada una tiene un guion en cuatro partes.",
   "Antes de responder comparas cada opción en tu colchón, tus ingresos y tu nivel. La salida le deja a Carmen 213.750, 22,7 meses.",
   "Ofreces una transición ordenada y un contrato de servicios. Carmen sale con una asesoría de 3.000 al mes para la minera."
  ],
  "toolkit": null
 },
 {
  "id": "21-1",
  "code": "21.1",
  "title": "Plan de 90 días o criterios para quedarte",
  "time": "30 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu plan de 90 días o tus criterios para quedarte, con su fecha, y tu revisión mensual en el calendario.",
  "intro": "Llena la versión que corresponde a tu decisión. Usa tu plantilla 19.1, tu tablero 18.1 y su registro mensual de niveles, con las cifras en dólares.",
  "trae": "Trae tu plantilla 19.1 y tu tablero 18.1.",
  "where": "Capítulo 21, Independencia: saltar o quedarte",
  "chapter": {
   "n": 21,
   "title": "Independencia: saltar o quedarte"
  },
  "part": {
   "num": "05",
   "name": "Transición"
  },
  "level": "Nivel 3",
  "who": "Rodrigo y Andrea",
  "summary": [
   "Si saltas, armas un plan de 90 días con un riesgo principal, tres acciones con fecha y una señal de alarma. Rodrigo baja el peso de farmacias del 47 % al 44 %.",
   "Si te quedas, escribes tres criterios para revisar la decisión y una fecha. Andrea la revisará en junio del año siguiente.",
   "Las dos decisiones usan las cifras del capítulo 19 y una revisión de tus números el primer día de cada mes."
  ],
  "toolkit": null
 },
 {
  "id": "a-1",
  "code": "A.1",
  "title": "Tus reglas en Perú",
  "time": "25 minutos",
  "kind": "anexo",
  "purpose": "Te llevas tus reglas de Perú en una página.",
  "intro": "Ten a la mano tu contrato, el reglamento interno, tus últimas boletas y tu ficha RUC. Escribe los montos en soles, en el mismo orden que el ejemplo de Carmen del anexo A.",
  "trae": "Trae tu contrato, el reglamento interno, tus últimas boletas y tu ficha RUC.",
  "where": "Anexo A, Perú",
  "chapter": null,
  "part": null,
  "level": null,
  "who": "Carmen",
  "summary": [
   "Si te despiden sin causa, cobras 1,5 remuneraciones por año con un tope de 12. Para Carmen son S/ 588.000.",
   "Tus honorarios son renta de cuarta categoría. El cliente retiene el 8 % y el resto del impuesto lo pagas en la declaración anual.",
   "Carmen separa S/ 1.346 de cada recibo de S/ 7.920 en una cuenta aparte para esa declaración."
  ],
  "toolkit": null
 },
 {
  "id": "b-1",
  "code": "B.1",
  "title": "Tus reglas en México",
  "time": "25 minutos",
  "kind": "anexo",
  "purpose": "Te llevas tus reglas de México en una página.",
  "intro": "Ten a la mano tu contrato, tus últimos recibos de nómina, tu fecha de ingreso y la política de Cumplimiento. Escribe los montos en pesos, en el mismo orden que el ejemplo de Andrea del anexo B.",
  "trae": "Trae tu contrato, tus últimos recibos de nómina, tu fecha de ingreso y la política de Cumplimiento.",
  "where": "Anexo B, México",
  "chapter": null,
  "part": null,
  "level": null,
  "who": "Andrea",
  "summary": [
   "Si te despiden sin causa y no te reinstalan, cobras tres meses de salario más 20 días por año. Para Andrea son MXN 2.250.000, un piso.",
   "Con ingresos de más de MXN 3,5 millones al año quedas fuera de RESICO y presentas cada mes tus pagos de ISR y tu declaración de IVA.",
   "El pago de un consejo asesor puede ser asimilado a salarios. El neto no cambia, pero sí el depósito de cada mes."
  ],
  "toolkit": null
 },
 {
  "id": "c-1",
  "code": "C.1",
  "title": "Tus reglas en Colombia",
  "time": "25 minutos",
  "kind": "anexo",
  "purpose": "Te llevas tus reglas de Colombia en una página.",
  "intro": "Ten a la mano tu contrato, tu liquidación y el valor del primer contrato que vas a firmar. Escribe los montos en pesos, en el mismo orden que el ejemplo de Javier del anexo C.",
  "trae": "Trae tu contrato, tu liquidación y el valor de tu primer contrato.",
  "where": "Anexo C, Colombia",
  "chapter": null,
  "part": null,
  "level": null,
  "who": "Javier",
  "summary": [
   "Con salario integral, el despido sin justa causa vale 20 días por el primer año y 15 por cada año siguiente. A Javier le tocan 65 días.",
   "Si un contrato vale 3.500 UVT o más en un año, te inscribes como responsable de IVA antes de firmarlo.",
   "Como independiente aportas a salud, pensión y riesgos sobre el 40 % de lo que facturas. Javier paga el 12,0 % de lo facturado."
  ],
  "toolkit": null
 },
 {
  "id": "d-1",
  "code": "D.1",
  "title": "Tus reglas en Chile",
  "time": "25 minutos",
  "kind": "anexo",
  "purpose": "Te llevas tus reglas de Chile en una página.",
  "intro": "Ten a la mano tu contrato, tu finiquito y tu última liquidación de sueldo. Escribe los montos en pesos, en el mismo orden que el ejemplo de Rodrigo del anexo D.",
  "trae": "Trae tu contrato, tu finiquito y tu última liquidación de sueldo.",
  "where": "Anexo D, Chile",
  "chapter": null,
  "part": null,
  "level": null,
  "who": "Rodrigo",
  "summary": [
   "La indemnización por años de servicio se calcula con una base topada en 90 UF. A Rodrigo le dejó CLP 39.105.000.",
   "En 2026, la boleta de honorarios retiene el 15,25 %, y esa retención paga primero tus cotizaciones de independiente.",
   "Si tu contrato prohíbe negociaciones dentro del giro, compáralo con el giro de la empresa que te contrataría antes de firmar."
  ],
  "toolkit": null
 },
 {
  "id": "cierre",
  "code": "Cierre",
  "title": "Qué hacer el lunes",
  "time": "15 minutos",
  "kind": "cierre",
  "purpose": "Te llevas tu nivel anotado con la fecha y la plantilla que vas a llenar esta semana.",
  "intro": "Los seis pasos del cierre del libro, en el mismo orden. Marca cada uno cuando lo hagas y anota lo que te pide.",
  "trae": null,
  "where": "Cierre del libro, Lo que sigue",
  "chapter": null,
  "part": null,
  "level": null,
  "who": "Carmen, Javier, Andrea y Rodrigo",
  "summary": [
   "Carmen y Andrea terminan en el nivel 1, Javier en el 2 y Rodrigo en el 3.",
   "Cada nivel tiene una condición para subir al siguiente y sus plantillas en el workbook.",
   "El lunes anotas en el workbook tu nivel y la fecha, y eliges la plantilla de esta semana."
  ],
  "toolkit": null
 }
];
