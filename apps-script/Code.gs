/**
 * Registro de los formularios de futurefounders.pe.
 *
 * La web (ruta /api/registro) envía un POST con JSON {secret, form, data}. Este script, ligado a la
 * hoja de registros, comprueba el secreto, valida los campos, escribe una fila en la pestaña del
 * formulario y avisa por correo a las direcciones de la propiedad AVISOS.
 *
 * Propiedades del script (Configuración del proyecto > Propiedades del script):
 *   SECRET  el mismo valor que APPS_SCRIPT_SECRET en Vercel. configurar() lo crea si falta.
 *   AVISOS  correos que reciben el aviso, separados por comas.
 */

var ZONA = 'America/Lima';
var AVISOS_INICIALES = 'lorenzo@redesignlab.org,eddie@redesignlab.org';
var CORREO_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Una pestaña por formulario. Cada campo: [clave en data, encabezado, largo máximo, requerido].
 * Mantener alineado con CAMPOS en src/lib/registro.ts.
 */
var FORMULARIOS = {
  kit: {
    hoja: 'Kit',
    campos: [
      ['origen', 'Origen', 80, false],
      ['nombre', 'Nombre', 100, false],
      ['correo', 'Correo', 254, true],
      ['situacion', 'Situación', 60, false],
      ['pais', 'País', 40, false]
    ]
  },
  workbook: {
    hoja: 'Workbook',
    campos: [
      ['origen', 'Origen', 80, false],
      ['nombre', 'Nombre', 100, true],
      ['correo', 'Correo', 254, true],
      ['situacion', 'Situación', 60, false],
      ['pais', 'País', 40, false]
    ]
  },
  diagnostico: {
    hoja: 'Diagnóstico',
    campos: [
      ['nombre', 'Nombre', 100, false],
      ['correo', 'Correo', 254, true],
      ['nivel', 'Nivel', 80, true],
      ['situacion', 'Situación', 120, false],
      ['cobertura', 'Cobertura del gasto', 120, false],
      ['colchon', 'Colchón (meses)', 120, false]
    ]
  },
  programa: {
    hoja: 'Programas',
    campos: [
      ['programa', 'Programa', 80, true],
      ['nivel', 'Nivel', 10, false],
      ['nombre', 'Nombre', 100, true],
      ['correo', 'Correo', 254, true],
      ['pais', 'País', 40, false],
      ['mensaje', 'Mensaje', 500, false]
    ]
  }
};

var COLUMNA_FECHA = 'Fecha y hora (Lima)';

/** Punto de entrada de la aplicación web. */
function doPost(e) {
  try {
    var cuerpo = leerCuerpo_(e);
    if (!cuerpo) return responder_({ ok: false, error: 'JSON no válido' });

    var secreto = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secreto) return responder_({ ok: false, error: 'Falta la propiedad SECRET' });
    if (!igualSeguro_(String(cuerpo.secret || ''), secreto)) return responder_({ ok: false, error: 'No autorizado' });

    var def = FORMULARIOS.hasOwnProperty(cuerpo.form) ? FORMULARIOS[cuerpo.form] : null;
    if (!def) return responder_({ ok: false, error: 'Formulario desconocido' });

    var datos = validar_(def, cuerpo.data);
    if (datos.error) return responder_({ ok: false, error: datos.error });

    var fecha = Utilities.formatDate(new Date(), ZONA, 'yyyy-MM-dd HH:mm:ss');
    var hoja = escribir_(def, fecha, datos.valores);
    avisar_(def, hoja, fecha, datos.valores);
    confirmar_(cuerpo.form, datos.valores);
    return responder_({ ok: true });
  } catch (err) {
    console.error('doPost: ' + (err && err.stack ? err.stack : err));
    return responder_({ ok: false, error: 'Error interno' });
  }
}

/** Prueba desde el editor: simula un registro del kit con el secreto guardado y muestra la respuesta. */
function probar() {
  var secreto = PropertiesService.getScriptProperties().getProperty('SECRET');
  if (!secreto) throw new Error('Falta la propiedad SECRET. Ejecuta configurar() primero.');
  var e = {
    postData: {
      type: 'application/json',
      contents: JSON.stringify({
        secret: secreto,
        form: 'kit',
        data: {
          origen: 'Prueba desde el editor',
          nombre: 'Registro de prueba',
          correo: ((PropertiesService.getScriptProperties().getProperty('AVISOS') || '').split(',')[0] || '').trim(),
          situacion: 'Tengo empleo',
          pais: 'Perú'
        }
      })
    }
  };
  var salida = doPost(e).getContent();
  Logger.log(salida);
  return salida;
}

/**
 * Prepara la hoja: crea las pestañas que falten con sus encabezados y deja las propiedades AVISOS y
 * SECRET si no existen. El secreto se genera al azar, se guarda en las propiedades y se muestra en el
 * registro de ejecución para copiarlo en Vercel (APPS_SCRIPT_SECRET). No se escribe en el código.
 */
function configurar() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(FORMULARIOS).forEach(function (clave) {
    obtenerHoja_(ss, FORMULARIOS[clave]);
  });

  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('AVISOS')) {
    props.setProperty('AVISOS', AVISOS_INICIALES);
    Logger.log('AVISOS quedó en: ' + AVISOS_INICIALES);
  } else {
    Logger.log('AVISOS ya estaba: ' + props.getProperty('AVISOS'));
  }

  if (!props.getProperty('SECRET')) {
    var nuevo = (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '');
    props.setProperty('SECRET', nuevo);
    Logger.log('SECRET creado. Cópialo en Vercel como APPS_SCRIPT_SECRET: ' + nuevo);
  } else {
    Logger.log('SECRET ya existe. Para verlo: Configuración del proyecto > Propiedades del script.');
  }
}

// ---------------------------------------------------------------------------------------------
// Internas

function leerCuerpo_(e) {
  if (!e || !e.postData || !e.postData.contents) return null;
  try {
    var c = JSON.parse(e.postData.contents);
    return c && typeof c === 'object' ? c : null;
  } catch (err) {
    return null;
  }
}

/** Compara sin cortar en el primer carácter distinto. */
function igualSeguro_(a, b) {
  if (a.length !== b.length) return false;
  var dif = 0;
  for (var i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}

/** Quita caracteres de control, unifica los saltos de línea y recorta. */
function limpiar_(v) {
  if (v === null || v === undefined) return '';
  if (typeof v !== 'string' && typeof v !== 'number') return '';
  return String(v)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\r\n?/g, '\n')
    .trim();
}

/**
 * Evita que un texto se lea como fórmula en la hoja (=, +, -, @ al inicio, también tras espacios
 * o tabulaciones): le antepone un apóstrofo, que Sheets no muestra.
 */
function escaparCelda_(v) {
  return /^[\s]*[=+\-@]/.test(v) ? "'" + v : v;
}

function validar_(def, data) {
  if (!data || typeof data !== 'object') return { error: 'Faltan los datos' };
  var valores = {};
  for (var i = 0; i < def.campos.length; i++) {
    var c = def.campos[i];
    var v = limpiar_(data[c[0]]);
    if (c[3] && !v) return { error: 'Falta el campo ' + c[0] };
    if (v.length > c[2]) return { error: 'El campo ' + c[0] + ' es demasiado largo' };
    valores[c[0]] = v;
  }
  if (!CORREO_RE.test(valores.correo || '')) return { error: 'Correo no válido' };
  return { valores: valores };
}

function encabezados_(def) {
  return [COLUMNA_FECHA].concat(def.campos.map(function (c) { return c[1]; }));
}

function obtenerHoja_(ss, def) {
  var hoja = ss.getSheetByName(def.hoja);
  if (!hoja) hoja = ss.insertSheet(def.hoja);
  if (hoja.getLastRow() === 0) {
    var enc = encabezados_(def);
    hoja.getRange(1, 1, 1, enc.length).setValues([enc]).setFontWeight('bold');
    hoja.setFrozenRows(1);
    // Texto plano en todas las columnas: así Sheets no convierte fechas, números ni fórmulas.
    hoja.getRange(1, 1, hoja.getMaxRows(), enc.length).setNumberFormat('@');
  }
  return hoja;
}

function escribir_(def, fecha, valores) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var hoja = obtenerHoja_(SpreadsheetApp.getActiveSpreadsheet(), def);
    var fila = [fecha].concat(def.campos.map(function (c) { return escaparCelda_(valores[c[0]]); }));
    var n = hoja.getLastRow() + 1;
    hoja.getRange(n, 1, 1, fila.length).setNumberFormat('@').setValues([fila]);
    SpreadsheetApp.flush();
    return hoja;
  } finally {
    lock.releaseLock();
  }
}

function avisar_(def, hoja, fecha, valores) {
  var destino = (PropertiesService.getScriptProperties().getProperty('AVISOS') || '')
    .split(',')
    .map(function (s) { return s.trim(); })
    .filter(function (s) { return CORREO_RE.test(s); });
  if (!destino.length) {
    console.warn('AVISOS vacío: no se envió el aviso.');
    return;
  }

  var quien = (valores.nombre || valores.correo).replace(/\s+/g, ' ');
  var asunto = 'Nuevo registro: ' + def.hoja + ' | ' + quien;

  var lineas = ['Llegó un registro desde el formulario ' + def.hoja + ' de la web.', ''];
  lineas.push(COLUMNA_FECHA + ': ' + fecha);
  def.campos.forEach(function (c) {
    lineas.push(c[1] + ': ' + (valores[c[0]] || '(vacío)'));
  });
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  lineas.push('', 'Hoja: ' + ss.getUrl() + '#gid=' + hoja.getSheetId());

  try {
    MailApp.sendEmail({
      to: destino.join(','),
      subject: asunto,
      body: lineas.join('\n'),
      name: 'Web Future Founders',
      replyTo: valores.correo
    });
  } catch (err) {
    // La fila ya quedó guardada: un fallo de correo (por ejemplo, cuota diaria) no anula el registro.
    console.error('No se pudo enviar el aviso: ' + err);
  }
}

/**
 * Correo a la persona que llenó el formulario, con el enlace a su PDF o la confirmación de su postulación.
 * Las respuestas llegan al primer correo de AVISOS.
 */
var SITIO = 'https://www.futurefounders.pe';
var PIE = [
  '',
  'Si tienes una duda, responde este correo y te contestamos Eddie o Lorenzo.',
  'Para dejar de recibir correos de Future Founders, responde con la palabra «baja».',
  '',
  'Future Founders',
  SITIO
];

function mensajeConfirmacion_(form, v) {
  var hola = 'Hola' + (v.nombre ? ' ' + v.nombre.split(/\s+/)[0] : '') + ':';
  if (form === 'kit') {
    return {
      asunto: 'Tu kit «Plan de salida»',
      lineas: [
        hola, '',
        'Aquí está el kit «Plan de salida» en PDF, con las cinco plantillas para llenar:',
        SITIO + '/descargas/doble-agente-kit.pdf', '',
        'Empieza por la K.1, que te da tu runway en unos 20 minutos. Las cinco plantillas toman unas 2 horas en total.',
        'Si prefieres hacer la K.1 en línea: ' + SITIO + '/workbook/k1'
      ]
    };
  }
  if (form === 'workbook') {
    return {
      asunto: 'Tu workbook de Doble Agente',
      lineas: [
        hola, '',
        'Aquí está el workbook de Doble Agente en PDF, con una plantilla por capítulo:',
        SITIO + '/descargas/doble-agente-workbook.pdf', '',
        'Se llena mejor en Acrobat Reader o en Vista Previa. Las plantillas con calculadora en línea están en ' + SITIO + '/workbook'
      ]
    };
  }
  if (form === 'diagnostico') {
    // La web envía el nivel como «0: Salario».
    var n = /^(\d)\s*:\s*(.+)$/.exec(v.nivel);
    var nivel = n ? 'nivel ' + n[1] + ', ' + n[2] : v.nivel;
    return {
      asunto: 'Tu diagnóstico: ' + nivel,
      lineas: [
        hola, '',
        'Según tus respuestas, hoy estás en el ' + nivel + '.', '',
        'Para dar el siguiente paso con tus números, descarga el kit «Plan de salida»:',
        SITIO + '/descargas/doble-agente-kit.pdf', '',
        'Puedes volver a hacer el diagnóstico cuando cambie tu situación: ' + SITIO + '/diagnostico'
      ]
    };
  }
  if (form === 'programa') {
    return {
      asunto: 'Recibimos tu postulación a ' + v.programa,
      lineas: [
        hola, '',
        'Recibimos tu postulación a ' + v.programa + '. Te escribimos en los próximos días con las fechas, los cupos y las condiciones de la próxima convocatoria.', '',
        'Mientras tanto, si todavía no lo hiciste, el kit «Plan de salida» te da tu punto de partida:',
        SITIO + '/descargas/doble-agente-kit.pdf'
      ]
    };
  }
  return null;
}

function confirmar_(form, valores) {
  var m = mensajeConfirmacion_(form, valores);
  if (!m || !CORREO_RE.test(valores.correo || '')) return;
  var avisos = (PropertiesService.getScriptProperties().getProperty('AVISOS') || '').split(',')[0].trim();
  try {
    var opciones = {
      to: valores.correo,
      subject: m.asunto,
      body: m.lineas.concat(PIE).join('\n'),
      name: 'Future Founders'
    };
    if (CORREO_RE.test(avisos)) opciones.replyTo = avisos;
    MailApp.sendEmail(opciones);
  } catch (err) {
    // El registro ya quedó guardado y el PDF se entregó en pantalla: un fallo de correo no anula nada.
    console.error('No se pudo enviar la confirmación: ' + err);
  }
}

function responder_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
