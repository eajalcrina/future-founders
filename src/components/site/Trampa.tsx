/**
 * Trampa para bots: campo «website» fuera de la pantalla, sin foco con el teclado y oculto para
 * lectores de pantalla. Si llega lleno, /api/registro no guarda nada.
 */

/** El rótulo no se ve ni se lee (aria-hidden, fuera de la pantalla); llega del diccionario (comun.trampa) para que /en no tenga español. */
export default function Trampa({ label }: { label: string }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        {label}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
