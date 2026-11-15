# Registro de formularios

`Code.gs` recibe los formularios de la web y los guarda en la hoja a la que está ligado. La web no habla con el script desde el navegador: la ruta `/api/registro` valida los datos, descarta los envíos con la trampa para bots llena y reenvía `{secret, form, data}` al script.

Qué hace el script con cada envío:

1. Compara `secret` con la propiedad `SECRET`. Si no coincide, no escribe nada.
2. Valida el formulario y sus campos (correo con formato, largos máximos), quita caracteres de control y escapa lo que podría leerse como fórmula.
3. Escribe una fila en la pestaña del formulario, con la fecha y hora de Lima en la primera columna. Usa un candado para que dos envíos al mismo tiempo no se pisen.
4. Manda un aviso en texto plano a los correos de la propiedad `AVISOS`, con los campos y el enlace a la pestaña. Si el correo falla, la fila igual queda guardada.
5. Manda a la persona que llenó el formulario un correo con el enlace a su PDF (kit, workbook, diagnóstico) o la confirmación de su postulación (programas). Las respuestas llegan al primer correo de `AVISOS`.
5. Responde `{"ok": true}` o `{"ok": false, "error": "..."}`.

| Formulario (`form`) | Pestaña | Dónde está en la web |
| --- | --- | --- |
| `kit` | Kit | `/kit` y el cierre de `/`, `/libro` y `/kit` (columna «Origen») |
| `workbook` | Workbook | `/workbook` |
| `diagnostico` | Diagnóstico | resultado de `/diagnostico` |
| `programa` | Programas | `/programas` |

Los campos de cada formulario están en `FORMULARIOS` (aquí) y en `CAMPOS` (`src/lib/registro.ts`). Si se cambia uno, se cambia el otro.

## Cómo se publica

1. Crear la hoja de Google Sheets y abrir Extensiones > Apps Script.
2. Pegar `Code.gs`. En Configuración del proyecto, marcar «Mostrar el archivo de manifiesto» y pegar `appsscript.json`.
3. Ejecutar `configurar()` y aceptar los permisos. Crea las cuatro pestañas, deja `AVISOS` con lorenzo@redesignlab.org y eddie@redesignlab.org, y crea `SECRET`, que aparece en el registro de ejecución.
4. Ejecutar `probar()`: escribe una fila de prueba en «Kit» y manda el aviso. Borrar la fila después.
5. Implementar > Nueva implementación > Aplicación web. Ejecutar como: yo. Quién tiene acceso: cualquier usuario.
6. En Vercel, poner `APPS_SCRIPT_URL` (la URL que termina en `/exec`) y `APPS_SCRIPT_SECRET` (el valor de `SECRET`), y volver a desplegar.

Para cambiar quién recibe los avisos, editar la propiedad `AVISOS` (correos separados por comas). Si se cambia el código, hay que publicar una versión nueva de la misma implementación para que la URL siga igual.
