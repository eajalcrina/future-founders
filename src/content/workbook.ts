// Generado por scripts/gen-workbook.py desde maqueta-v3/chapters/*/meta.json, wb.json, src-md y out/*-report.json.
// No lo edites a mano: corrige la maqueta (o scripts/r2-overlay.json) y vuelve a correr el script.

export type CalcRow = {
  field: string;
  label: string;
  tag?: string;
  /** Fórmula con los nombres de campo; sin ella, la fila es una entrada. */
  expr?: string;
  /** Fórmula para mostrar en texto («A ÷ B»). */
  show?: string;
  dec?: number;
  /** Valor del arquetipo tal como lo imprime el libro. */
  ej?: string;
  unit?: string;
  note?: string;
  kind?: "num" | "text" | "select";
  options?: { label: string; value: string }[];
  fmt?: "num" | "pct" | "sino" | "text" | "mes";
  /** «k1:A»: trae el valor guardado de otra plantilla. */
  from?: string;
  /** Entrada que puede quedar vacía (cuenta como 0). */
  opt?: boolean;
  /** Fila que solo se muestra dentro de una tabla. */
  hide?: boolean;
};
export type CalcBand = { band: string };
export type CalcTable = { table: string; head: string[]; cells: string[][]; mark?: string };
export type CalcItem = CalcRow | CalcBand | CalcTable;
export type Aviso = { when: string; text: string };

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
  /** «Sabrás que terminaste cuando…» del capítulo. */
  check: string[];
  /** Plantillas que esta usa, citadas en su intro o en su «trae». */
  uses: { code: string; id: string }[];
  /** Primera página del ejemplo resuelto en el libro y de la plantilla en el workbook (folio = página del PDF). */
  pages: { libro: number | null; workbook: number | null };
  calc: CalcItem[] | null;
  avisos: Aviso[];
};

export const PARTES: Record<string, string> = {"01": "Diagnóstico", "02": "Mercado", "03": "Oferta", "04": "Primeros clientes", "05": "Transición"};

/** Niveles de la escalera en que se usa cada parte (regla R2: el nivel en que estás cuando la usas). */
export const PART_LEVELS: Record<string, number[]> = {"01": [0], "02": [0], "03": [0, 1, 2], "04": [0, 1], "05": [1, 2, 3]};

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
  "who": "Carmen y Javier",
  "summary": [],
  "check": [
   "Tengas tu runway con un decimal."
  ],
  "uses": [],
  "pages": {
   "libro": 22,
   "workbook": 5
  },
  "calc": [
   {
    "field": "A",
    "tag": "A",
    "label": "Ahorro líquido",
    "ej": "61.600"
   },
   {
    "field": "B",
    "tag": "B",
    "label": "Costo de vida mensual",
    "ej": "8.800"
   },
   {
    "field": "runway",
    "label": "Runway",
    "expr": "A / B",
    "show": "A ÷ B",
    "dec": 1,
    "unit": "meses",
    "ej": "7,0"
   }
  ],
  "avisos": [
   {
    "when": "runway < 6",
    "text": "Tu runway está bajo el mínimo de 6 meses del método."
   }
  ]
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
  "who": "Carmen",
  "summary": [],
  "check": [
   "Cada fila tenga una respuesta o una pregunta para el abogado."
  ],
  "uses": [],
  "pages": {
   "libro": 23,
   "workbook": 6
  },
  "calc": null,
  "avisos": []
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
  "who": "Javier",
  "summary": [],
  "check": [
   "Sepas cuánto te correspondería y qué diferencia tienes con lo que te ofrecen."
  ],
  "uses": [],
  "pages": {
   "libro": 26,
   "workbook": 8
  },
  "calc": null,
  "avisos": []
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
  "who": "Javier",
  "summary": [],
  "check": [
   "Cada semana tenga al menos una decisión tuya escrita."
  ],
  "uses": [
   {
    "code": "K.1",
    "id": "k1"
   },
   {
    "code": "K.3",
    "id": "k3"
   }
  ],
  "pages": {
   "libro": 28,
   "workbook": 10
  },
  "calc": null,
  "avisos": []
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
  "who": "Javier",
  "summary": [],
  "check": [
   "Tengas 20 nombres y la fecha de la primera llamada."
  ],
  "uses": [],
  "pages": {
   "libro": 29,
   "workbook": 12
  },
  "calc": null,
  "avisos": []
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
  "check": [
   "Tienes tus tres runways con un decimal.",
   "Sabes cuál es tu meta y en qué mes llegas a ella.",
   "Le contaste la cifra a tu pareja o a alguien de confianza."
  ],
  "uses": [
   {
    "code": "K.1",
    "id": "k1"
   },
   {
    "code": "K.3",
    "id": "k3"
   }
  ],
  "pages": {
   "libro": 40,
   "workbook": 15
  },
  "calc": [
   {
    "band": "Lo que tienes"
   },
   {
    "field": "A",
    "tag": "A",
    "label": "Ahorro líquido",
    "from": "k1:A",
    "ej": "61.600"
   },
   {
    "field": "B",
    "tag": "B",
    "label": "Costo de vida mensual",
    "from": "k1:B",
    "ej": "8.800"
   },
   {
    "field": "base",
    "label": "Runway base",
    "expr": "A / B",
    "show": "A ÷ B",
    "dec": 1,
    "unit": "meses",
    "ej": "7,0"
   },
   {
    "field": "C",
    "tag": "C",
    "label": "Indemnización neta estimada (K.3)",
    "ej": "163.000",
    "note": "La fila de la K.3 de tu país con lo que recibirías neto si te despiden sin causa."
   },
   {
    "field": "salida",
    "label": "Runway de salida",
    "expr": "(A + C) / B",
    "show": "(A + C) ÷ B",
    "dec": 1,
    "unit": "meses",
    "ej": "25,5"
   },
   {
    "field": "D",
    "tag": "D",
    "label": "Costo de vida recortado",
    "ej": "7.400"
   },
   {
    "field": "recorte",
    "label": "Runway con recorte",
    "expr": "A / D",
    "show": "A ÷ D",
    "dec": 1,
    "unit": "meses",
    "ej": "8,3"
   },
   {
    "band": "Tu meta"
   },
   {
    "field": "meta",
    "label": "Meta de runway base, en meses",
    "ej": "9"
   },
   {
    "field": "colchon",
    "label": "Colchón meta",
    "expr": "meta * B",
    "show": "meta × B",
    "ej": "79.200"
   },
   {
    "field": "brecha",
    "label": "Brecha",
    "expr": "max(colchon - A, 0)",
    "show": "colchón meta − A",
    "ej": "17.600"
   },
   {
    "band": "Tu plan"
   },
   {
    "field": "aporte1",
    "label": "Primer ahorro o pago extraordinario",
    "ej": "12.000",
    "note": "Utilidades, gratificaciones o bonos."
   },
   {
    "field": "mes1",
    "label": "Mes del primer aporte",
    "kind": "text",
    "ej": "abril"
   },
   {
    "field": "aporte2",
    "label": "Segundo ahorro o pago extraordinario",
    "ej": "5.600",
    "opt": true
   },
   {
    "field": "mes2",
    "label": "Mes del segundo aporte",
    "kind": "text",
    "ej": "julio",
    "opt": true
   },
   {
    "field": "mes",
    "label": "Mes en que cierras la brecha",
    "expr": "if(brecha <= 0, \"ya la cerraste\", if(aporte1 >= brecha, mes1, if(aporte1 + aporte2 >= brecha, mes2, \"todavía no\")))",
    "fmt": "text",
    "ej": "julio"
   }
  ],
  "avisos": [
   {
    "when": "base < 6",
    "text": "Tu runway base está bajo el mínimo de 6 meses del método."
   },
   {
    "when": "1",
    "text": "Para decidir, usa el runway base."
   },
   {
    "when": "brecha > aporte1 + aporte2",
    "text": "Con estos dos aportes todavía no cierras la brecha. Suma otro aporte o revisa la meta."
   }
  ]
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
  "check": [
   "Tienes tus tres cifras de gasto y sabes de dónde sale cada una.",
   "Pediste al menos una cotización para reemplazar un beneficio de tu empleador.",
   "Cuando lo hablen en casa: tu familia conoce y aceptó el piso."
  ],
  "uses": [],
  "pages": {
   "libro": 50,
   "workbook": 17
  },
  "calc": [
   {
    "band": "Lo que gastas hoy"
   },
   {
    "field": "fijos",
    "label": "Fijos",
    "ej": "5.900"
   },
   {
    "field": "variables",
    "label": "Variables",
    "ej": "2.200"
   },
   {
    "field": "anuales",
    "label": "Anuales prorrateados",
    "note": "Total del año ÷ 12.",
    "ej": "700"
   },
   {
    "field": "deudas",
    "label": "Deudas aparte de la vivienda",
    "ej": "0",
    "opt": true
   },
   {
    "field": "A",
    "tag": "A",
    "label": "CVM actual",
    "expr": "fijos + variables + anuales + deudas",
    "show": "suma de las cuatro",
    "ej": "8.800"
   },
   {
    "band": "Sin tu empleador"
   },
   {
    "field": "B",
    "tag": "B",
    "label": "Beneficios que hoy paga tu empleador, a precio de reemplazo",
    "note": "Si ya saliste, deja B en 0: lo que pagaba tu empleador ya está en A.",
    "ej": "600",
    "opt": true
   },
   {
    "field": "C",
    "tag": "C",
    "label": "CVM sin empleo",
    "expr": "A + B",
    "show": "A + B",
    "ej": "9.400"
   },
   {
    "band": "Tu piso"
   },
   {
    "field": "D",
    "tag": "D",
    "label": "Recortes acordados en casa, sin salud ni educación",
    "ej": "1.400",
    "opt": true
   },
   {
    "field": "E",
    "tag": "E",
    "label": "CVM piso",
    "expr": "C - D",
    "show": "C − D",
    "ej": "8.000"
   },
   {
    "band": "Lo que cambia"
   },
   {
    "field": "ahorro",
    "label": "Ahorro líquido (A de la 1.1)",
    "from": "1-1:A",
    "ej": "61.600"
   },
   {
    "field": "runway_c",
    "label": "Runway con CVM sin empleo",
    "expr": "ahorro / C",
    "show": "ahorro ÷ C",
    "dec": 1,
    "unit": "meses",
    "ej": "6,6"
   },
   {
    "field": "runway_e",
    "label": "Runway con CVM piso",
    "expr": "ahorro / E",
    "show": "ahorro ÷ E",
    "dec": 1,
    "unit": "meses",
    "ej": "7,7"
   },
   {
    "field": "nivel2",
    "label": "Ingreso propio neto que pedirá el nivel 2",
    "expr": "C",
    "show": "C",
    "ej": "9.400"
   },
   {
    "field": "retorno",
    "label": "Ingreso propio neto que pedirá el punto de no retorno",
    "expr": "1.2 * C",
    "show": "1,2 × C",
    "ej": "11.280"
   }
  ],
  "avisos": [
   {
    "when": "runway_c < 6",
    "text": "Con tu CVM sin empleo, tu runway queda bajo el mínimo de 6 meses del método."
   }
  ]
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
  "check": [
   "Tienes cinco logros que puedes contar en voz alta sin datos internos de tu empleador.",
   "Los cinco responden al mismo tipo de problema.",
   "Tienes un sueldo de mercado con su fuente y un valor de referencia por día."
  ],
  "uses": [],
  "pages": {
   "libro": 62,
   "workbook": 21
  },
  "calc": null,
  "avisos": []
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
  "check": [
   "Cada fila de la 4.1 tiene una respuesta o una acción.",
   "Sabes si necesitas autorización y a quién se la vas a pedir.",
   "Tienes tus preguntas para la consulta legal, aunque todavía no la hagas."
  ],
  "uses": [
   {
    "code": "K.2",
    "id": "k2"
   }
  ],
  "pages": {
   "libro": 73,
   "workbook": 26
  },
  "calc": null,
  "avisos": []
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
  "check": [
   "Tienes seis meses proyectados en los dos escenarios.",
   "Tu línea de decisión tiene una fecha, una condición de ingresos y un saldo mínimo.",
   "Cuando lo hablen en casa: la acordaste con tu familia y está por escrito."
  ],
  "uses": [
   {
    "code": "K.1",
    "id": "k1"
   },
   {
    "code": "K.4",
    "id": "k4"
   }
  ],
  "pages": {
   "libro": 85,
   "workbook": 30
  },
  "calc": [
   {
    "band": "Tu punto de partida"
   },
   {
    "field": "saldo",
    "label": "Saldo inicial del primer mes",
    "from": "k1:A",
    "ej": "61.150"
   },
   {
    "field": "gasto",
    "label": "Gasto mensual: CVM piso, o CVM sin empleo si sigues empleado",
    "from": "2-1:E",
    "ej": "10.000"
   },
   {
    "field": "ingreso",
    "label": "Ingreso neto esperado al mes",
    "ej": "3.850",
    "opt": true
   },
   {
    "field": "inicio",
    "label": "Mes en que llega ese ingreso (del 1 al 6)",
    "note": "Si tu cliente paga a 30 o 60 días, corre el primer ingreso a ese mes.",
    "ej": "3"
   },
   {
    "band": "Tu saldo mínimo"
   },
   {
    "field": "pares",
    "label": "Meses de saldo mínimo",
    "note": "Lo que tardaron tres pares de tu nivel y tu sector en volver a un empleo. Nunca menos de 2.",
    "ej": "2"
   },
   {
    "field": "minimo",
    "label": "Saldo mínimo",
    "expr": "max(pares, 2) * gasto",
    "show": "meses × gasto, nunca menos de 2 meses",
    "ej": "20.000"
   },
   {
    "field": "f1",
    "hide": true,
    "label": "Con rol, mes 1",
    "expr": "saldo - gasto + if(inicio <= 1, ingreso, 0)",
    "ej": "51.150"
   },
   {
    "field": "f2",
    "hide": true,
    "label": "Con rol, mes 2",
    "expr": "f1 - gasto + if(inicio <= 2, ingreso, 0)",
    "ej": "41.150"
   },
   {
    "field": "f3",
    "hide": true,
    "label": "Con rol, mes 3",
    "expr": "f2 - gasto + if(inicio <= 3, ingreso, 0)",
    "ej": "35.000"
   },
   {
    "field": "f4",
    "hide": true,
    "label": "Con rol, mes 4",
    "expr": "f3 - gasto + if(inicio <= 4, ingreso, 0)",
    "ej": "28.850"
   },
   {
    "field": "f5",
    "hide": true,
    "label": "Con rol, mes 5",
    "expr": "f4 - gasto + if(inicio <= 5, ingreso, 0)",
    "ej": "22.700"
   },
   {
    "field": "f6",
    "hide": true,
    "label": "Con rol, mes 6",
    "expr": "f5 - gasto + if(inicio <= 6, ingreso, 0)",
    "ej": "16.550"
   },
   {
    "field": "r1",
    "hide": true,
    "label": "Runway con rol, mes 1",
    "expr": "f1 / gasto",
    "dec": 1,
    "ej": "5,1"
   },
   {
    "field": "r2",
    "hide": true,
    "label": "Runway con rol, mes 2",
    "expr": "f2 / gasto",
    "dec": 1,
    "ej": "4,1"
   },
   {
    "field": "r3",
    "hide": true,
    "label": "Runway con rol, mes 3",
    "expr": "f3 / gasto",
    "dec": 1,
    "ej": "3,5"
   },
   {
    "field": "r4",
    "hide": true,
    "label": "Runway con rol, mes 4",
    "expr": "f4 / gasto",
    "dec": 1,
    "ej": "2,9"
   },
   {
    "field": "r5",
    "hide": true,
    "label": "Runway con rol, mes 5",
    "expr": "f5 / gasto",
    "dec": 1,
    "ej": "2,3"
   },
   {
    "field": "r6",
    "hide": true,
    "label": "Runway con rol, mes 6",
    "expr": "f6 / gasto",
    "dec": 1,
    "ej": "1,7"
   },
   {
    "field": "s1",
    "hide": true,
    "label": "Sin ingresos, mes 1",
    "expr": "saldo - gasto",
    "ej": "51.150"
   },
   {
    "field": "s2",
    "hide": true,
    "label": "Sin ingresos, mes 2",
    "expr": "s1 - gasto",
    "ej": "41.150"
   },
   {
    "field": "s3",
    "hide": true,
    "label": "Sin ingresos, mes 3",
    "expr": "s2 - gasto",
    "ej": "31.150"
   },
   {
    "field": "s4",
    "hide": true,
    "label": "Sin ingresos, mes 4",
    "expr": "s3 - gasto",
    "ej": "21.150"
   },
   {
    "field": "s5",
    "hide": true,
    "label": "Sin ingresos, mes 5",
    "expr": "s4 - gasto",
    "ej": "11.150"
   },
   {
    "field": "s6",
    "hide": true,
    "label": "Sin ingresos, mes 6",
    "expr": "s5 - gasto",
    "ej": "1.150"
   },
   {
    "field": "q1",
    "hide": true,
    "label": "Runway sin ingresos, mes 1",
    "expr": "s1 / gasto",
    "dec": 1,
    "ej": "5,1"
   },
   {
    "field": "q2",
    "hide": true,
    "label": "Runway sin ingresos, mes 2",
    "expr": "s2 / gasto",
    "dec": 1,
    "ej": "4,1"
   },
   {
    "field": "q3",
    "hide": true,
    "label": "Runway sin ingresos, mes 3",
    "expr": "s3 / gasto",
    "dec": 1,
    "ej": "3,1"
   },
   {
    "field": "q4",
    "hide": true,
    "label": "Runway sin ingresos, mes 4",
    "expr": "s4 / gasto",
    "dec": 1,
    "ej": "2,1"
   },
   {
    "field": "q5",
    "hide": true,
    "label": "Runway sin ingresos, mes 5",
    "expr": "s5 / gasto",
    "dec": 1,
    "ej": "1,1"
   },
   {
    "field": "q6",
    "hide": true,
    "label": "Runway sin ingresos, mes 6",
    "expr": "s6 / gasto",
    "dec": 1,
    "ej": "0,1"
   },
   {
    "table": "Tu proyección con un rol",
    "head": [
     "Mes",
     "Saldo final",
     "Runway"
    ],
    "cells": [
     [
      "Mes 1",
      "f1",
      "r1"
     ],
     [
      "Mes 2",
      "f2",
      "r2"
     ],
     [
      "Mes 3",
      "f3",
      "r3"
     ],
     [
      "Mes 4",
      "f4",
      "r4"
     ],
     [
      "Mes 5",
      "f5",
      "r5"
     ],
     [
      "Mes 6",
      "f6",
      "r6"
     ]
    ],
    "mark": "minimo"
   },
   {
    "table": "Tu proyección sin ingresos",
    "head": [
     "Mes",
     "Saldo final",
     "Runway"
    ],
    "cells": [
     [
      "Mes 1",
      "s1",
      "q1"
     ],
     [
      "Mes 2",
      "s2",
      "q2"
     ],
     [
      "Mes 3",
      "s3",
      "q3"
     ],
     [
      "Mes 4",
      "s4",
      "q4"
     ],
     [
      "Mes 5",
      "s5",
      "q5"
     ],
     [
      "Mes 6",
      "s6",
      "q6"
     ]
    ],
    "mark": "minimo"
   },
   {
    "field": "cae_rol",
    "label": "Con un rol, primer mes bajo el saldo mínimo",
    "expr": "if(f1 < minimo, 1, if(f2 < minimo, 2, if(f3 < minimo, 3, if(f4 < minimo, 4, if(f5 < minimo, 5, if(f6 < minimo, 6, 0))))))",
    "fmt": "mes",
    "ej": "mes 6"
   },
   {
    "field": "cae_sin",
    "label": "Sin ingresos, primer mes bajo el saldo mínimo",
    "expr": "if(s1 < minimo, 1, if(s2 < minimo, 2, if(s3 < minimo, 3, if(s4 < minimo, 4, if(s5 < minimo, 5, if(s6 < minimo, 6, 0))))))",
    "fmt": "mes",
    "ej": "mes 5"
   }
  ],
  "avisos": [
   {
    "when": "cae_sin > 0",
    "text": "Sin ingresos, tu saldo cae bajo el mínimo dentro de los seis meses. Ese mes es el que fija tu línea de decisión."
   },
   {
    "when": "f6 < 0 || s6 < 0",
    "text": "En algún escenario el saldo pasa a negativo antes del mes 6."
   }
  ]
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
  "level": "Nivel 0",
  "who": "Carmen",
  "summary": [
   "Eliges un problema que le cueste a tu cliente al menos USD 100.000 al año y que ya resolviste antes.",
   "Lo pasas por cuatro filtros: tamaño, experiencia, reconocimiento y medición. Si falla uno, queda fuera o como beneficio adicional.",
   "El de Carmen cuesta USD 150.000 al año, USD 12.500 por cada mes sin resolver, y sostiene hasta USD 30.000 de honorarios."
  ],
  "check": [
   "Tienes un problema que pasa los cuatro filtros.",
   "Conoces su costo anual, cómo lo calculaste y su costo de no actuar al mes.",
   "Puedes explicarlo en una frase a alguien que no trabaja en tu industria."
  ],
  "uses": [
   {
    "code": "3.1",
    "id": "3-1"
   }
  ],
  "pages": {
   "libro": 97,
   "workbook": 33
  },
  "calc": [
   {
    "field": "costo",
    "label": "Costo anual del problema 1",
    "note": "La cuenta con datos que el cliente reconocería: tasas, horas, ventas que no se hacen, multas.",
    "ej": "150.000"
   },
   {
    "field": "noactuar",
    "label": "Costo de no actuar al mes",
    "expr": "costo / 12",
    "show": "costo anual ÷ 12",
    "ej": "12.500"
   },
   {
    "field": "honorarios",
    "label": "Honorarios anuales que sostiene",
    "expr": "costo / 5",
    "show": "costo anual ÷ 5",
    "ej": "30.000"
   }
  ],
  "avisos": [
   {
    "when": "costo < 100000",
    "text": "El problema cuesta menos de USD 100.000 al año. Revisa la cuenta o busca uno más grande antes de seguir."
   }
  ]
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
  "level": "Nivel 0",
  "who": "Rodrigo",
  "summary": [
   "Divides tu mercado en segmentos: grupos de empresas que compran por las mismas razones, de la misma forma y a personas parecidas.",
   "Sacas los que crean un conflicto de interés y puntúas el resto de 1 a 5 en seis criterios, con un máximo de 30.",
   "Rodrigo elige las tiendas en línea de muebles y decoración, con 24 puntos, y puede nombrar hoy 14 tiendas del segmento."
  ],
  "check": [
   "Tienes un puerto de entrada con su puntaje y sabes por qué ganó.",
   "Revisaste cada segmento contra el filtro de conflicto antes de puntuarlo.",
   "Tienes una lista de 10 empresas con nombre dentro del segmento."
  ],
  "uses": [
   {
    "code": "6.1",
    "id": "6-1"
   },
   {
    "code": "4.1",
    "id": "4-1"
   }
  ],
  "pages": {
   "libro": 108,
   "workbook": 36
  },
  "calc": null,
  "avisos": []
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
  "level": "Nivel 0",
  "who": "Carmen",
  "summary": [
   "En una compra intervienen seis papeles: impulsor, comprador económico, usuario, influenciadores, veto y compras.",
   "Para cada persona anotas el trabajo que quiere lograr, lo que teme y lo que necesita ver. Después ordenas los pasos y estimas el plazo.",
   "En la agroexportadora, la compra del rol de Carmen tiene cinco pasos y tarda entre seis y ocho semanas."
  ],
  "check": [
   "Sabes quién decide, quién puede vetar y qué quiere lograr cada persona del mapa.",
   "Tienes el orden de las conversaciones y lo que vas a mostrar en cada una.",
   "Conoces la fecha en que se reúne quien aprueba y tu plazo estimado."
  ],
  "uses": [
   {
    "code": "7.1",
    "id": "7-1"
   }
  ],
  "pages": {
   "libro": 119,
   "workbook": 40
  },
  "calc": null,
  "avisos": []
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
  "level": "Nivel 0",
  "who": "Andrea",
  "summary": [
   "Cuentas tus clientes posibles con nombre en una fuente pública y quitas los que no podrías atender por conflicto de interés.",
   "Con el precio anual calculas el TAM, y con los clientes que necesitas, tu tasa de captura. Si pasa del 10 %, amplías o replanteas.",
   "Andrea necesita 15 de 240 fintechs en cuatro países, el 6,25 %. Solo en México serían el 25 %."
  ],
  "check": [
   "Sabes cuántos clientes necesitas en el primer año y qué porcentaje es del mercado que puedes atender.",
   "Contaste tus clientes posibles con nombre en una fuente pública.",
   "Tomaste una decisión: seguir, ampliar o replantear."
  ],
  "uses": [
   {
    "code": "7.1",
    "id": "7-1"
   }
  ],
  "pages": {
   "libro": 131,
   "workbook": 43
  },
  "calc": [
   {
    "band": "Tu cuenta"
   },
   {
    "field": "perimetro",
    "label": "Clientes dentro de tu perímetro",
    "note": "Sin los que no podrías atender por conflicto de interés.",
    "ej": "240"
   },
   {
    "field": "precio",
    "label": "Precio anual por cliente",
    "note": "El que vas a poner en tu propuesta, antes de retenciones.",
    "ej": "1.800"
   },
   {
    "field": "tam",
    "label": "TAM",
    "expr": "perimetro * precio",
    "show": "perímetro × precio",
    "ej": "432.000"
   },
   {
    "field": "necesitas",
    "label": "Clientes que necesitas en el primer año",
    "ej": "15"
   },
   {
    "field": "tasa",
    "label": "Tasa de captura",
    "expr": "necesitas / perimetro * 100",
    "show": "clientes que necesitas ÷ perímetro",
    "dec": 2,
    "fmt": "pct",
    "ej": "6,25 %"
   },
   {
    "field": "perimetro_chico",
    "label": "Perímetro más chico",
    "note": "Por ejemplo, solo tu país.",
    "ej": "60",
    "opt": true
   },
   {
    "field": "tasa_chica",
    "label": "La misma tasa con el perímetro más chico",
    "expr": "if(perimetro_chico > 0, necesitas / perimetro_chico * 100, 0)",
    "show": "clientes que necesitas ÷ perímetro más chico",
    "dec": 0,
    "fmt": "pct",
    "ej": "25 %"
   },
   {
    "band": "Tu tiempo de venta"
   },
   {
    "field": "conversaciones",
    "label": "Conversaciones que necesitas en el año",
    "note": "Suma las segundas conversaciones si cada venta las pide.",
    "ej": "60"
   },
   {
    "field": "horas",
    "label": "Horas por conversación, con la preparación",
    "ej": "2"
   },
   {
    "field": "horas_total",
    "label": "Horas de venta en el año",
    "expr": "conversaciones * horas",
    "show": "conversaciones × horas",
    "ej": "120"
   }
  ],
  "avisos": [
   {
    "when": "tasa <= 10",
    "text": "Tu tasa de captura es de hasta 10 %: sigues."
   },
   {
    "when": "tasa > 10",
    "text": "Tu tasa de captura pasa del 10 %: amplías el perímetro. Si después de ampliar sigue sobre 10 %, replanteas."
   },
   {
    "when": "perimetro_chico > 0 && tasa_chica > 10 && tasa <= 10",
    "text": "Con el perímetro más chico la tasa pasa del 10 %. El perímetro amplio es el que sostiene la decisión."
   }
  ]
 },
 {
  "id": "10-1",
  "code": "10.1",
  "title": "Propuesta cuantificada",
  "time": "30 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu rango de precio, con su piso y su techo, y tu resultado en una frase con cifra.",
  "intro": "Usa el problema y el costo de la plantilla 6.1 y tu CVM piso de la 2.1. Calcula primero el techo, con cifras que el cliente pueda comprobar, y después el piso, con las tuyas. Las cifras van en dólares: A y B van al año y el resto, al mes.",
  "trae": "Trae tu plantilla 6.1 y tu CVM piso de la 2.1.",
  "where": "Capítulo 10, Tu propuesta de valor, en números",
  "chapter": {
   "n": 10,
   "title": "Tu propuesta de valor, en números"
  },
  "part": {
   "num": "03",
   "name": "Oferta"
  },
  "level": "Nivel 0",
  "who": "Carmen",
  "summary": [
   "Tu techo es el valor anual que tu trabajo le deja al cliente, dividido entre 5 y entre 12 meses. El de Carmen es de USD 2.500 al mes.",
   "Tu piso es tu CVM piso dividido entre 5 y entre el factor neto de tu país, por cada día semanal. El de Carmen es de USD 2.133.",
   "Tu precio va entre los dos. Carmen tiene rango con un día a la semana; con dos, el piso pasa el techo."
  ],
  "check": [
   "Tienes un rango con su piso y su techo, y sabes de dónde sale cada número.",
   "El valor anual se calcula con cifras que tu cliente puede comprobar.",
   "Escribiste el resultado en una frase con su cifra."
  ],
  "uses": [
   {
    "code": "6.1",
    "id": "6-1"
   },
   {
    "code": "2.1",
    "id": "2-1"
   }
  ],
  "pages": {
   "libro": 143,
   "workbook": 47
  },
  "calc": [
   {
    "band": "El problema y su valor"
   },
   {
    "field": "A",
    "tag": "A",
    "label": "Valor anual",
    "note": "Con cifras que el cliente puede comprobar.",
    "from": "6-1:costo",
    "ej": "150.000"
   },
   {
    "band": "El techo"
   },
   {
    "field": "B",
    "tag": "B",
    "label": "Techo anual",
    "expr": "A / 5",
    "show": "A ÷ 5",
    "ej": "30.000"
   },
   {
    "field": "C",
    "tag": "C",
    "label": "Techo mensual",
    "expr": "B / 12",
    "show": "B ÷ 12",
    "ej": "2.500"
   },
   {
    "band": "El piso"
   },
   {
    "field": "D",
    "tag": "D",
    "label": "CVM piso (2.1)",
    "note": "O el gasto acordado en la K.4 si ya saliste, como Javier.",
    "from": "2-1:E",
    "ej": "8.000"
   },
   {
    "field": "E",
    "tag": "E",
    "label": "Piso neto por día semanal",
    "expr": "D / 5",
    "show": "D ÷ 5",
    "ej": "1.600"
   },
   {
    "field": "F",
    "tag": "F",
    "label": "Factor neto de tu país",
    "kind": "select",
    "options": [
     {
      "label": "Perú, 0,75",
      "value": "0,75"
     },
     {
      "label": "México, 0,65",
      "value": "0,65"
     },
     {
      "label": "Colombia, 0,70",
      "value": "0,70"
     },
     {
      "label": "Chile, 0,8475",
      "value": "0,8475"
     }
    ],
    "note": "Es una estimación del libro. Confirma el tuyo con quien lleva tus impuestos.",
    "ej": "0,75"
   },
   {
    "field": "G",
    "tag": "G",
    "label": "Piso bruto mensual por día semanal",
    "expr": "E / F",
    "show": "E ÷ F",
    "ej": "2.133"
   },
   {
    "band": "Tu rango"
   },
   {
    "field": "dias",
    "label": "Días por semana que vas a ofrecer",
    "ej": "1"
   },
   {
    "field": "piso",
    "label": "Rango mensual, desde",
    "expr": "G * dias",
    "show": "G × días",
    "ej": "2.133"
   },
   {
    "field": "techo",
    "label": "Rango mensual, hasta",
    "expr": "C",
    "show": "C",
    "ej": "2.500"
   }
  ],
  "avisos": [
   {
    "when": "piso > techo",
    "text": "G × días pasa a C: revisa el problema o los días antes de ofrecer nada."
   }
  ]
 },
 {
  "id": "11-1",
  "code": "11.1",
  "title": "Tu rol en una página y su precio",
  "time": "35 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu <em>one-pager</em> con su tarifa, su prima y las diez cláusulas de tu contrato.",
  "intro": "Usa tu rango de la plantilla 10.1 y una guía salarial pública de tu país. Calcula primero la tarifa y comprueba que cae en tu rango; después escribe tu <em>one-pager</em> y marca las cláusulas con tu contrato modelo al lado.",
  "trae": "Trae tu rango de la 10.1 y una guía salarial de tu país.",
  "where": "Capítulo 11, Tu primer rol parcial: formato, precio y contrato",
  "chapter": {
   "n": 11,
   "title": "Tu primer rol parcial: formato, precio y contrato"
  },
  "part": {
   "num": "03",
   "name": "Oferta"
  },
  "level": "Nivel 0",
  "who": "Carmen",
  "summary": [
   "Tu primer rol cabe en una página con cinco partes: el problema, el resultado con su cifra, el formato y la dedicación, el precio y las condiciones del contrato.",
   "La tarifa es el sueldo de mercado del cargo equivalente, por tus días ÷ 5 y por una prima de 1,2 a 1,5. La de Carmen es de USD 2.200 al mes.",
   "El contrato trae diez cláusulas mínimas. Si tienes empleo, tus horas quedan fuera del horario de tu empleador."
  ],
  "check": [
   "Tienes tu <em>one-pager</em> y cabe en una página.",
   "Tu tarifa está dentro del rango de la plantilla 10.1 y sabes qué prima usaste.",
   "Sabes en qué horas de tu semana vas a trabajar, fuera del horario de tu empleador.",
   "Sabes cuándo y cómo informarás a tu empleador, si tu contrato o su política lo piden."
  ],
  "uses": [
   {
    "code": "10.1",
    "id": "10-1"
   }
  ],
  "pages": {
   "libro": 153,
   "workbook": 50
  },
  "calc": [
   {
    "band": "La tarifa"
   },
   {
    "field": "A",
    "tag": "A",
    "label": "Sueldo mensual de mercado",
    "note": "De una guía salarial pública de tu país.",
    "ej": "8.333"
   },
   {
    "field": "dias",
    "label": "Días por semana",
    "from": "10-1:dias",
    "ej": "1"
   },
   {
    "field": "B",
    "tag": "B",
    "label": "Días por semana ÷ 5",
    "expr": "dias / 5",
    "show": "días ÷ 5",
    "dec": 1,
    "ej": "0,2"
   },
   {
    "field": "C",
    "tag": "C",
    "label": "Prima",
    "note": "De 1,2 a 1,5.",
    "ej": "1,32"
   },
   {
    "field": "tarifa",
    "label": "Tarifa mensual",
    "expr": "A * B * C",
    "show": "A × B × C",
    "ej": "2.200"
   },
   {
    "band": "Tu rango de la 10.1"
   },
   {
    "field": "piso10",
    "label": "Piso del rango (G × días de la 10.1)",
    "from": "10-1:piso",
    "ej": "2.133"
   },
   {
    "field": "techo10",
    "label": "Techo del rango (C de la 10.1)",
    "from": "10-1:C",
    "ej": "2.500"
   },
   {
    "field": "rango",
    "label": "¿Dentro del rango de la 10.1?",
    "expr": "tarifa >= piso10 && tarifa <= techo10",
    "fmt": "sino",
    "ej": "Sí"
   },
   {
    "field": "prima_piso",
    "label": "Prima de tu piso",
    "expr": "piso10 * 5 / (A * dias)",
    "show": "piso × 5 ÷ (A × días)",
    "dec": 2,
    "ej": "1,28"
   },
   {
    "field": "prima_techo",
    "label": "Prima de tu techo",
    "expr": "techo10 * 5 / (A * dias)",
    "show": "techo × 5 ÷ (A × días)",
    "dec": 2,
    "ej": "1,50"
   },
   {
    "band": "La regla de valor"
   },
   {
    "field": "valor",
    "label": "Valor anual (A de la 10.1)",
    "from": "10-1:A",
    "ej": "150.000"
   },
   {
    "field": "veces",
    "label": "Valor anual ÷ tarifa anual",
    "expr": "valor / (tarifa * 12)",
    "show": "valor ÷ (tarifa × 12), al menos 5",
    "dec": 1,
    "ej": "5,7"
   }
  ],
  "avisos": [
   {
    "when": "C < 1.2 || C > 1.5",
    "text": "La prima va de 1,2 a 1,5."
   },
   {
    "when": "tarifa > techo10",
    "text": "Tu tarifa pasa el techo de la 10.1: baja el alcance o la prima."
   },
   {
    "when": "tarifa < piso10",
    "text": "Tu tarifa queda bajo el piso de la 10.1: revisa los días."
   },
   {
    "when": "veces < 5",
    "text": "El valor anual no llega a 5 veces tu tarifa anual."
   }
  ]
 },
 {
  "id": "12-1",
  "code": "12.1",
  "title": "Ficha de producto",
  "time": "30 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu ficha de producto con su precio, sus horas del primer año y el estado de tu validación.",
  "intro": "Usa tus entregables de los últimos meses y el TAM de la plantilla 9.1. Empieza por lo que se repite: si no encuentras nada igual en tres entregables, anótalo en «Tu decisión» y sigue con roles parciales. Las cifras van en dólares.",
  "trae": "Trae tus últimos tres entregables y tu TAM de la 9.1.",
  "where": "Capítulo 12, De servicio a producto",
  "chapter": {
   "n": 12,
   "title": "De servicio a producto"
  },
  "part": {
   "num": "03",
   "name": "Oferta"
  },
  "level": "Niveles 0 a 2",
  "who": "Andrea",
  "summary": [
   "Un producto nace de lo que se repite igual con cada cliente. Andrea empaqueta su matriz de 80 controles en una licencia de USD 1.800 al año.",
   "Lo validas cobrando antes de construirlo entero. Andrea vendió tres preventas con el 50 % adelantado, USD 2.700, antes de terminarlo.",
   "Con 15 licencias, cada hora le deja unos USD 237 brutos; con 6, unos 103, menos que los 125 del consejo asesor."
  ],
  "check": [
   "Tienes una ficha de producto con alcance y precio, y sabes cuántas horas te pide el primer año.",
   "Si tienes empleo, sabes si tu producto necesita una autorización nueva y la pediste.",
   "Cuando llegue: al menos tres clientes pagaron una preventa, o decidiste por escrito seguir solo con roles parciales."
  ],
  "uses": [
   {
    "code": "9.1",
    "id": "9-1"
   }
  ],
  "pages": {
   "libro": 163,
   "workbook": 55
  },
  "calc": null,
  "avisos": []
 },
 {
  "id": "13-1",
  "code": "13.1",
  "title": "Unidad económica",
  "time": "35 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu LTV, tu CAC y cuánto cambia tu ingreso neto con los clientes que planeas conseguir.",
  "intro": "Necesitas los ingresos y costos de tu negocio de los últimos tres meses, en dólares al mes. Llena la primera columna con tus clientes de hoy y la segunda con el segmento que quieres conseguir. Si tu ruta es un rol parcial, ve directo a la versión de tres líneas, al final de esta plantilla.",
  "trae": "Trae los ingresos y costos de tu negocio de los últimos tres meses, o tu tarifa de la 11.1 si tu ruta es un rol parcial.",
  "where": "Capítulo 13, La unidad económica",
  "chapter": {
   "n": 13,
   "title": "La unidad económica"
  },
  "part": {
   "num": "03",
   "name": "Oferta"
  },
  "level": "Niveles 0 a 2",
  "who": "Rodrigo",
  "summary": [
   "Un cliente vale el margen que te deja cada mes por los meses que se queda. El cliente nuevo de Rodrigo vale USD 12.000.",
   "Conviene conseguirlo si ese valor es al menos 3 veces lo que cuesta. Rodrigo paga USD 1.600 por cliente: 7,5 veces.",
   "Cuatro clientes nuevos, con la furgoneta y el impuesto, le dejan a Rodrigo USD 900 netos más al mes."
  ],
  "check": [
   "Sabes cuánto te deja un cliente durante toda la relación y cuánto cuesta conseguirlo.",
   "Tu LTV ÷ CAC es de al menos 3, o sabes qué cambiar para llegar.",
   "Sabes cuánto cambia tu ingreso neto con los clientes que planeas conseguir y quién paga su CAC."
  ],
  "uses": [
   {
    "code": "11.1",
    "id": "11-1"
   }
  ],
  "pages": {
   "libro": 174,
   "workbook": 59
  },
  "calc": [
   {
    "band": "Segmento actual"
   },
   {
    "field": "a1",
    "tag": "A",
    "label": "Ingreso por cliente al mes",
    "ej": "2.500"
   },
   {
    "field": "b1",
    "tag": "B",
    "label": "Costos variables por cliente",
    "ej": "1.750"
   },
   {
    "field": "c1",
    "tag": "C",
    "label": "Margen de contribución",
    "expr": "a1 - b1",
    "show": "A − B",
    "ej": "750"
   },
   {
    "field": "cp1",
    "label": "Margen sobre el ingreso",
    "expr": "c1 / a1 * 100",
    "show": "C ÷ A",
    "fmt": "pct",
    "ej": "30 %"
   },
   {
    "field": "d1",
    "tag": "D",
    "label": "Vida promedio en meses",
    "ej": "24"
   },
   {
    "field": "e1",
    "tag": "E",
    "label": "LTV",
    "expr": "c1 * d1",
    "show": "C × D",
    "ej": "18.000"
   },
   {
    "field": "f1",
    "tag": "F",
    "label": "CAC",
    "ej": "2.500"
   },
   {
    "field": "lc1",
    "label": "LTV ÷ CAC",
    "expr": "e1 / f1",
    "show": "E ÷ F",
    "dec": 1,
    "ej": "7,2"
   },
   {
    "field": "rc1",
    "label": "Meses para recuperar el CAC",
    "expr": "f1 / c1",
    "show": "F ÷ C",
    "dec": 1,
    "ej": "3,3"
   },
   {
    "band": "Segmento nuevo"
   },
   {
    "field": "a2",
    "tag": "A",
    "label": "Ingreso por cliente al mes",
    "ej": "2.000"
   },
   {
    "field": "b2",
    "tag": "B",
    "label": "Costos variables por cliente",
    "ej": "1.200"
   },
   {
    "field": "c2",
    "tag": "C",
    "label": "Margen de contribución",
    "expr": "a2 - b2",
    "show": "A − B",
    "ej": "800"
   },
   {
    "field": "cp2",
    "label": "Margen sobre el ingreso",
    "expr": "c2 / a2 * 100",
    "show": "C ÷ A",
    "fmt": "pct",
    "ej": "40 %"
   },
   {
    "field": "d2",
    "tag": "D",
    "label": "Vida promedio en meses",
    "ej": "15"
   },
   {
    "field": "e2",
    "tag": "E",
    "label": "LTV",
    "expr": "c2 * d2",
    "show": "C × D",
    "ej": "12.000"
   },
   {
    "field": "f2",
    "tag": "F",
    "label": "CAC",
    "ej": "1.600"
   },
   {
    "field": "lc2",
    "label": "LTV ÷ CAC",
    "expr": "e2 / f2",
    "show": "E ÷ F",
    "dec": 1,
    "ej": "7,5"
   },
   {
    "field": "rc2",
    "label": "Meses para recuperar el CAC",
    "expr": "f2 / c2",
    "show": "F ÷ C",
    "dec": 1,
    "ej": "2,0"
   },
   {
    "band": "Clientes nuevos del segmento nuevo"
   },
   {
    "field": "G",
    "tag": "G",
    "label": "Clientes nuevos",
    "ej": "4"
   },
   {
    "field": "H",
    "tag": "H",
    "label": "Costo fijo adicional",
    "note": "El que sube con el volumen: una furgoneta, una persona más.",
    "ej": "800",
    "opt": true
   },
   {
    "field": "I",
    "tag": "I",
    "label": "Utilidad incremental antes de impuestos",
    "expr": "G * c2 - H",
    "show": "G × C − H",
    "ej": "2.400"
   },
   {
    "field": "tasa",
    "label": "Tasa de impuesto, en %",
    "note": "La que confirmaste con quien lleva tus impuestos.",
    "ej": "25"
   },
   {
    "field": "J",
    "tag": "J",
    "label": "Impuesto",
    "expr": "max(I, 0) * tasa / 100",
    "show": "I × tasa",
    "ej": "600"
   },
   {
    "field": "K",
    "tag": "K",
    "label": "Utilidad neta incremental",
    "expr": "I - J",
    "show": "I − J",
    "ej": "1.800"
   },
   {
    "field": "pct",
    "label": "Tu porcentaje de la empresa",
    "note": "100 si la empresa es solo tuya.",
    "ej": "50"
   },
   {
    "field": "parte",
    "label": "Tu parte",
    "expr": "K * pct / 100",
    "show": "K × tu porcentaje",
    "ej": "900"
   },
   {
    "band": "Tu brecha"
   },
   {
    "field": "hoy",
    "label": "Tu ingreso neto total hoy",
    "ej": "7.600"
   },
   {
    "field": "total",
    "label": "Tu ingreso neto con los clientes nuevos",
    "expr": "hoy + parte",
    "show": "hoy + tu parte",
    "ej": "8.500"
   },
   {
    "field": "brecha",
    "label": "Tu brecha mensual",
    "note": "Lo que te falta al mes para tu meta de ingreso neto.",
    "ej": "800"
   },
   {
    "field": "cierran",
    "label": "Clientes que la cierran",
    "expr": "if(c2 > 0 && tasa < 100 && pct > 0, max(ceil((brecha / ((1 - tasa / 100) * pct / 100) + H) / c2), 0), 0)",
    "show": "el menor número de clientes cuya parte cubre la brecha",
    "ej": "4"
   }
  ],
  "avisos": [
   {
    "when": "lc1 < 3 || lc2 < 3",
    "text": "En un segmento, LTV ÷ CAC queda bajo 3. Revisa qué cambiar para llegar antes de pagar por clientes nuevos."
   },
   {
    "when": "parte < brecha",
    "text": "Con estos clientes nuevos tu parte no cubre la brecha."
   }
  ]
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
  "level": "Nivel 0",
  "who": "Javier",
  "summary": [
   "Armas una lista de 30 cuentas, empresas donde conoces al menos a una persona, repartidas en cinco grupos.",
   "Escribes un mensaje de tres frases sobre un problema y, a los diez días, mandas un seguimiento que le sirve al otro.",
   "Javier escribió a 30 cuentas y firmó 2 contratos antes del 31 de julio, la fecha de su línea de decisión."
  ],
  "check": [
   "Tienes 30 cuentas con empresa, persona y un problema probable.",
   "Enviaste los primeros diez mensajes.",
   "Cada mensaje enviado tiene una fecha de seguimiento."
  ],
  "uses": [
   {
    "code": "K.5",
    "id": "k5"
   },
   {
    "code": "4.1",
    "id": "4-1"
   }
  ],
  "pages": {
   "libro": 188,
   "workbook": 62
  },
  "calc": [
   {
    "band": "Cuentas por grupo"
   },
   {
    "field": "g_jefes",
    "label": "Quienes fueron tus jefes o directores",
    "ej": "5",
    "opt": true
   },
   {
    "field": "g_clientes",
    "label": "Clientes y proveedores de empleos anteriores",
    "ej": "10",
    "opt": true
   },
   {
    "field": "g_colegas",
    "label": "Colegas que ya trabajan por su cuenta",
    "ej": "5",
    "opt": true
   },
   {
    "field": "g_firmas",
    "label": "Firmas de búsqueda y consultoras",
    "ej": "4",
    "opt": true
   },
   {
    "field": "g_gremio",
    "label": "Gremio, asociación y universidad",
    "ej": "6",
    "opt": true
   },
   {
    "field": "g_total",
    "label": "Total",
    "expr": "g_jefes + g_clientes + g_colegas + g_firmas + g_gremio",
    "show": "suma de los grupos",
    "ej": "30"
   },
   {
    "band": "Tu embudo"
   },
   {
    "field": "e_escribiste",
    "label": "Cuentas a las que escribiste",
    "ej": "30"
   },
   {
    "field": "e_respuestas",
    "label": "Respuestas",
    "ej": "19"
   },
   {
    "field": "p_respuestas",
    "label": "Respuestas sobre cuentas",
    "expr": "e_respuestas / e_escribiste * 100",
    "show": "respuestas ÷ cuentas",
    "fmt": "pct",
    "ej": "63 %"
   },
   {
    "field": "e_conversaciones",
    "label": "Conversaciones",
    "ej": "8"
   },
   {
    "field": "p_conversaciones",
    "label": "Conversaciones sobre respuestas",
    "expr": "e_conversaciones / e_respuestas * 100",
    "show": "conversaciones ÷ respuestas",
    "fmt": "pct",
    "ej": "42 %"
   },
   {
    "field": "e_propuestas",
    "label": "Propuestas",
    "ej": "3"
   },
   {
    "field": "p_propuestas",
    "label": "Propuestas sobre conversaciones",
    "expr": "e_propuestas / e_conversaciones * 100",
    "show": "propuestas ÷ conversaciones",
    "fmt": "pct",
    "ej": "38 %"
   },
   {
    "field": "e_firmadas",
    "label": "Firmadas",
    "ej": "2"
   },
   {
    "field": "p_firmadas",
    "label": "Firmadas sobre propuestas",
    "expr": "e_firmadas / e_propuestas * 100",
    "show": "firmadas ÷ propuestas",
    "fmt": "pct",
    "ej": "67 %"
   }
  ],
  "avisos": [
   {
    "when": "g_total < 30",
    "text": "Tu lista tiene menos de 30 cuentas."
   }
  ]
 },
 {
  "id": "15-1",
  "code": "15.1",
  "title": "Guion de la conversación de diagnóstico",
  "time": "25 minutos",
  "kind": "capitulo",
  "purpose": "Te llevas tu guion de preguntas y la hoja para anotar lo que confirmaste en cada reunión.",
  "intro": "Escribe tus preguntas antes de la reunión y lleva esta hoja impresa o en tu tableta. Antes de la reunión, marca las tres casillas de control. Pregunta por hechos del pasado: qué pasó, cuánto les costó, quién lo resolvió. Después de la reunión, llena la hoja siguiente.",
  "trae": "Trae la 11.1, tu lista de la 14.1 y tu mapa del comprador de la 8.1.",
  "where": "Capítulo 15, La conversación de diagnóstico",
  "chapter": {
   "n": 15,
   "title": "La conversación de diagnóstico"
  },
  "part": {
   "num": "04",
   "name": "Primeros clientes"
  },
  "level": "Nivel 0",
  "who": "Carmen",
  "summary": [
   "En la primera reunión preguntas por hechos del pasado y dejas que el cliente calcule cuánto le cuesta su problema.",
   "Una hora se reparte en cinco momentos, y tú hablas sobre todo en los diez minutos del último.",
   "La gerenta calculó con sus propios números un ahorro de USD 150.000 al año y acordó una reunión con fecha."
  ],
  "check": [
   "Tienes un guion escrito con tus preguntas.",
   "Hiciste al menos una conversación con ese guion.",
   "Saliste de ella con un siguiente paso con fecha o con una fecha para volver a hablar."
  ],
  "uses": [
   {
    "code": "11.1",
    "id": "11-1"
   },
   {
    "code": "14.1",
    "id": "14-1"
   },
   {
    "code": "8.1",
    "id": "8-1"
   }
  ],
  "pages": {
   "libro": 199,
   "workbook": 70
  },
  "calc": null,
  "avisos": []
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
  "level": "Nivel 0",
  "who": "Carmen",
  "summary": [
   "Declaras al empleador si corresponde, firmas el contrato, trabajas y al cierre del primer mes emites el comprobante, en ese orden.",
   "Tu contrato dice qué haces, cuánto cobras, cómo se termina y qué no vas a hacer.",
   "De cada USD 2.200 que factura, Carmen lleva 1.650 a su colchón. Su primer recibo, el 31 de octubre, la deja en el nivel 1."
  ],
  "check": [
   "Tienes la declaración al empleador y su respuesta por escrito, si te correspondía.",
   "Cuando llegue: el contrato está firmado por las dos partes y emitiste tu primer comprobante; anota la fecha en el registro mensual, al comienzo del workbook."
  ],
  "uses": [
   {
    "code": "4.1",
    "id": "4-1"
   },
   {
    "code": "11.1",
    "id": "11-1"
   }
  ],
  "pages": {
   "libro": 213,
   "workbook": 74
  },
  "calc": null,
  "avisos": []
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
  "level": "Niveles 0 y 1",
  "who": "Andrea",
  "summary": [
   "Fijas las horas de tu plan en el calendario, fuera del horario de tu empleador, con un tope de ocho por semana.",
   "Escribes en casa tres acuerdos y revisas cada semana tus horas, tu sueño y tus fines de semana libres.",
   "Andrea delegó diez horas al mes por USD 250 y su semana volvió a caber en ocho horas."
  ],
  "check": [
   "Tus bloques están en el calendario con día y hora.",
   "Sabes qué tarea delegas, a quién y cuánto cuesta.",
   "Cuando lo hablen en casa: tu familia leyó y aceptó los tres acuerdos."
  ],
  "uses": [],
  "pages": {
   "libro": 226,
   "workbook": 77
  },
  "calc": [
   {
    "band": "Horas por semana de cada bloque"
   },
   {
    "field": "bloque1",
    "label": "Bloque 1",
    "ej": "3"
   },
   {
    "field": "bloque2",
    "label": "Bloque 2",
    "ej": "2,5",
    "opt": true
   },
   {
    "field": "bloque3",
    "label": "Bloque 3",
    "ej": "1,2",
    "opt": true
   },
   {
    "field": "revision",
    "label": "Revisión semanal",
    "ej": "0,5",
    "opt": true
   },
   {
    "field": "margen",
    "label": "Margen",
    "ej": "0,8",
    "opt": true
   },
   {
    "field": "total",
    "label": "Total semanal",
    "expr": "bloque1 + bloque2 + bloque3 + revision + margen",
    "show": "suma de los bloques, tope 8",
    "dec": 1,
    "unit": "horas",
    "ej": "8,0"
   }
  ],
  "avisos": [
   {
    "when": "total > 8",
    "text": "Tu semana pasa de ocho horas. Decide qué delegas o qué pospones antes de seguir."
   }
  ]
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
  "level": "Nivel 1",
  "who": "Javier",
  "summary": [
   "Mides tus roles juntos cada mes con su neto, sus días, su peso y su renovación. Javier suma 10.150 netos con tres roles.",
   "Ningún cliente pasa del 50 % de tu ingreso, y cada renovación se prepara con 60 días de anticipación.",
   "El pie del tablero te dice tu nivel y tus dos brechas. A Javier le faltan 1.850 al mes y 36.540 de colchón."
  ],
  "check": [
   "Tu tablero tiene todos tus roles, con su neto, su peso y su fecha de renovación.",
   "Sabes si cubriste tu CVM sin empleo este mes y cuántos meses seguidos llevas.",
   "Conoces tu brecha de ingreso y tu brecha de colchón al punto de no retorno."
  ],
  "uses": [],
  "pages": {
   "libro": 240,
   "workbook": 81
  },
  "calc": [
   {
    "band": "Tus roles, bruto al mes"
   },
   {
    "field": "bruto1",
    "label": "Rol 1",
    "ej": "6.700"
   },
   {
    "field": "bruto2",
    "label": "Rol 2",
    "ej": "6.300",
    "opt": true
   },
   {
    "field": "bruto3",
    "label": "Rol 3",
    "ej": "1.500",
    "opt": true
   },
   {
    "field": "bruto4",
    "label": "Rol 4",
    "ej": "0",
    "opt": true
   },
   {
    "field": "factor",
    "label": "Factor neto",
    "note": "El 0,70 es una estimación del libro para ingresos medios. Pide a tu contador o contadora el factor de tu caso.",
    "ej": "0,70"
   },
   {
    "field": "neto1",
    "hide": true,
    "label": "Neto del rol 1",
    "expr": "bruto1 * factor",
    "ej": "4.690"
   },
   {
    "field": "neto2",
    "hide": true,
    "label": "Neto del rol 2",
    "expr": "bruto2 * factor",
    "ej": "4.410"
   },
   {
    "field": "neto3",
    "hide": true,
    "label": "Neto del rol 3",
    "expr": "bruto3 * factor",
    "ej": "1.050"
   },
   {
    "field": "neto4",
    "hide": true,
    "label": "Neto del rol 4",
    "expr": "bruto4 * factor",
    "ej": "0"
   },
   {
    "field": "total",
    "label": "Total neto con success fee promedio",
    "expr": "neto1 + neto2 + neto3 + neto4",
    "show": "suma de los netos",
    "ej": "10.150"
   },
   {
    "field": "peso1",
    "hide": true,
    "label": "Peso del rol 1",
    "expr": "neto1 / total * 100",
    "fmt": "pct",
    "ej": "46 %"
   },
   {
    "field": "peso2",
    "hide": true,
    "label": "Peso del rol 2",
    "expr": "neto2 / total * 100",
    "fmt": "pct",
    "ej": "43 %"
   },
   {
    "field": "peso3",
    "hide": true,
    "label": "Peso del rol 3",
    "expr": "neto3 / total * 100",
    "fmt": "pct",
    "ej": "10 %"
   },
   {
    "field": "peso4",
    "hide": true,
    "label": "Peso del rol 4",
    "expr": "neto4 / total * 100",
    "fmt": "pct",
    "ej": "0 %"
   },
   {
    "table": "Neto y peso de cada rol",
    "head": [
     "Rol",
     "Neto",
     "Peso"
    ],
    "cells": [
     [
      "Rol 1",
      "neto1",
      "peso1"
     ],
     [
      "Rol 2",
      "neto2",
      "peso2"
     ],
     [
      "Rol 3",
      "neto3",
      "peso3"
     ],
     [
      "Rol 4",
      "neto4",
      "peso4"
     ]
    ]
   },
   {
    "band": "Este mes"
   },
   {
    "field": "cvm",
    "label": "CVM sin empleo (2.1)",
    "from": "2-1:C",
    "ej": "10.000"
   },
   {
    "field": "cubriste",
    "label": "¿Lo cubriste este mes?",
    "expr": "total >= cvm",
    "fmt": "sino",
    "ej": "Sí"
   },
   {
    "band": "Punto de no retorno"
   },
   {
    "field": "brechaing",
    "label": "Brecha de ingreso",
    "expr": "max(1.2 * cvm - total, 0)",
    "show": "1,2 × CVM − neto promedio",
    "ej": "1.850"
   },
   {
    "field": "colchon",
    "label": "Colchón actual",
    "ej": "23.460"
   },
   {
    "field": "brechacol",
    "label": "Brecha de colchón",
    "expr": "max(6 * cvm - colchon, 0)",
    "show": "6 × CVM − colchón",
    "ej": "36.540"
   }
  ],
  "avisos": [
   {
    "when": "peso1 > 50 || peso2 > 50 || peso3 > 50 || peso4 > 50",
    "text": "Un cliente pasa del 50 % de tu ingreso. Abre cuentas nuevas antes de su renovación."
   },
   {
    "when": "1",
    "text": "Cada mes, pasa el total neto y tu colchón al registro mensual, al comienzo del workbook."
   }
  ]
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
  "level": "Nivel 2",
  "who": "Rodrigo",
  "summary": [
   "Llegas al punto de no retorno con dos condiciones a la vez: ingresos propios netos de 1,2 × CVM tres meses seguidos y un colchón de 6 × CVM.",
   "Rodrigo necesita 8.400 al mes y recibe 8.500. Su colchón de 46.700 pasa los 42.000.",
   "Si te falta una condición, el marco te dice qué mover primero. Con las dos, volver a un empleo pasa a ser una elección."
  ],
  "check": [
   "Sabes cuál de las dos condiciones cumples y cuánto te falta de la otra.",
   "Tienes en el calendario la fecha de tu próxima revisión.",
   "Tienes por escrito qué harías si mañana te ofrecen un empleo de tiempo completo."
  ],
  "uses": [
   {
    "code": "2.1",
    "id": "2-1"
   }
  ],
  "pages": {
   "libro": 253,
   "workbook": 86
  },
  "calc": [
   {
    "band": "Tu CVM"
   },
   {
    "field": "A",
    "tag": "A",
    "label": "CVM sin empleo (2.1)",
    "from": "2-1:C",
    "ej": "7.000"
   },
   {
    "band": "Condición 1, ingreso"
   },
   {
    "field": "c1",
    "label": "Condición 1",
    "expr": "1.2 * A",
    "show": "1,2 × A",
    "ej": "8.400"
   },
   {
    "field": "mes1",
    "label": "Ingreso propio neto, mes 1",
    "ej": "8.500"
   },
   {
    "field": "mes2",
    "label": "Ingreso propio neto, mes 2",
    "ej": "8.500"
   },
   {
    "field": "mes3",
    "label": "Ingreso propio neto, mes 3",
    "ej": "8.500"
   },
   {
    "field": "cumple1",
    "label": "¿Cumple la condición 1 los tres meses?",
    "expr": "min(mes1, mes2, mes3) >= c1",
    "fmt": "sino",
    "ej": "Sí"
   },
   {
    "band": "Condición 2, colchón"
   },
   {
    "field": "c2",
    "label": "Condición 2",
    "expr": "6 * A",
    "show": "6 × A",
    "ej": "42.000"
   },
   {
    "field": "colchon",
    "label": "Colchón actual",
    "note": "Tu ahorro líquido.",
    "ej": "46.700"
   },
   {
    "field": "cumple2",
    "label": "¿Cumple la condición 2?",
    "expr": "colchon >= c2",
    "fmt": "sino",
    "ej": "Sí"
   },
   {
    "band": "Lo que te falta"
   },
   {
    "field": "brechaing",
    "label": "Brecha de ingreso",
    "expr": "max(c1 - min(mes1, mes2, mes3), 0)",
    "show": "condición 1 − el mes más bajo de los tres",
    "ej": "0"
   },
   {
    "field": "brechacol",
    "label": "Brecha de colchón",
    "expr": "max(c2 - colchon, 0)",
    "show": "condición 2 − colchón",
    "ej": "0"
   }
  ],
  "avisos": [
   {
    "when": "!cumple1 && !cumple2",
    "text": "Cumples: ninguna. Te falta: las dos. Qué haces: sigues en el nivel 1 o 2. Trabajas el portafolio del capítulo 18 y separas un monto fijo para el colchón cada mes."
   },
   {
    "when": "!cumple1 && cumple2",
    "text": "Cumples: colchón. Te falta: ingreso. Qué haces: sigues en el nivel en que estás. Subes el ingreso con el portafolio: precio en las renovaciones, un rol más o un producto. El colchón queda para emergencias y no se usa para tapar la brecha de ingreso."
   },
   {
    "when": "cumple1 && !cumple2",
    "text": "Cumples: ingreso. Te falta: colchón. Qué haces: ahorras todo el excedente sobre tu CVM hasta cerrar la brecha, antes de cualquier salto."
   },
   {
    "when": "cumple1 && cumple2",
    "text": "Cumples: las dos. Te falta: nada. Qué haces: estás en el nivel 3. Revisas las dos condiciones cada mes, como explica el capítulo 21."
   }
  ]
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
  "level": "Niveles 1 y 2",
  "who": "Carmen",
  "summary": [
   "Hay tres conversaciones con tu empleador: declarar, pedir y acordar una salida. Cada una tiene un guion en cuatro partes.",
   "Antes de responder comparas cada opción en tu colchón, tus ingresos y tu nivel. La salida le deja a Carmen 213.750, 22,7 meses.",
   "Ofreces una transición ordenada y un contrato de servicios. Carmen sale con una asesoría de 3.000 al mes para la minera."
  ],
  "check": [
   "Tienes un guion escrito para tu próxima conversación con tu empleador.",
   "Conoces el efecto de cada opción en tu colchón, tus ingresos y tu nivel.",
   "Sabes quién revisará cualquier documento antes de que lo firmes."
  ],
  "uses": [
   {
    "code": "K.3",
    "id": "k3"
   },
   {
    "code": "19.1",
    "id": "19-1"
   }
  ],
  "pages": {
   "libro": 264,
   "workbook": 90
  },
  "calc": null,
  "avisos": []
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
  "level": "Niveles 2 y 3",
  "who": "Rodrigo y Andrea",
  "summary": [
   "Si saltas, armas un plan de 90 días con un riesgo principal, tres acciones con fecha y una señal de alarma. Rodrigo baja el peso de farmacias del 47 % al 44 %.",
   "Si te quedas, escribes tres criterios para revisar la decisión y una fecha. Andrea la revisará en junio del año siguiente.",
   "Las dos decisiones usan las cifras del capítulo 19 y una revisión de tus números el primer día de cada mes."
  ],
  "check": [
   "Tienes un plan de 90 días con tres acciones fechadas, o tres criterios escritos con una fecha de revisión.",
   "Sabes cuál es tu señal de alarma o qué te haría revisar tu decisión antes de tiempo.",
   "Tu revisión mensual está en el calendario.",
   "Cuando lo hablen en casa: tu familia conoce tu plan y tu señal de alarma."
  ],
  "uses": [
   {
    "code": "19.1",
    "id": "19-1"
   },
   {
    "code": "18.1",
    "id": "18-1"
   }
  ],
  "pages": {
   "libro": 275,
   "workbook": 94
  },
  "calc": null,
  "avisos": []
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
   "Si te despiden sin causa, cobras 1,5 remuneraciones por año con un tope de 12. Para Carmen son S/ 588.000.",
   "Tus honorarios son renta de cuarta categoría. El cliente retiene el 8 % y el resto del impuesto lo pagas en la declaración anual.",
   "Carmen separa S/ 1.346 de cada recibo de S/ 7.920 en una cuenta aparte para esa declaración."
  ],
  "check": [],
  "uses": [],
  "pages": {
   "libro": 295,
   "workbook": 98
  },
  "calc": null,
  "avisos": []
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
   "Si te despiden sin causa y no te reinstalan, cobras tres meses de salario más 20 días por año. Para Andrea son MXN 2.250.000, un piso.",
   "Con ingresos de más de MXN 3,5 millones al año quedas fuera de RESICO y presentas cada mes tus pagos de ISR y tu declaración de IVA.",
   "El pago de un consejo asesor puede ser asimilado a salarios. El neto no cambia, pero sí el depósito de cada mes."
  ],
  "check": [],
  "uses": [],
  "pages": {
   "libro": 309,
   "workbook": 102
  },
  "calc": null,
  "avisos": []
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
   "Si un contrato vale 3.500 UVT o más por toda su duración, o tus ingresos del año pasado o de este año pasan de 3.500 UVT, te inscribes como responsable de IVA antes de firmarlo.",
   "Como independiente aportas a salud, pensión y riesgos sobre el 40 % de lo que facturas. Javier paga el 12,0 % de lo facturado."
  ],
  "check": [],
  "uses": [],
  "pages": {
   "libro": 323,
   "workbook": 106
  },
  "calc": null,
  "avisos": []
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
   "La indemnización por años de servicio se calcula con una base topada en 90 UF. A Rodrigo le dejó CLP 39.105.000.",
   "En 2026, la boleta de honorarios retiene el 15,25 %, y esa retención paga primero tus cotizaciones de independiente.",
   "Si tu contrato prohíbe negociaciones dentro del giro, compáralo con el giro de la empresa que te contrataría antes de firmar."
  ],
  "check": [],
  "uses": [],
  "pages": {
   "libro": 336,
   "workbook": 110
  },
  "calc": null,
  "avisos": []
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
  "check": [],
  "uses": [],
  "pages": {
   "libro": 282,
   "workbook": 97
  },
  "calc": null,
  "avisos": []
 }
];
