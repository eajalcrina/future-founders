/**
 * Trampa para bots: campo «website» fuera de la pantalla, sin foco con el teclado y oculto para
 * lectores de pantalla. Si llega lleno, /api/registro no guarda nada.
 */
export default function Trampa() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        Sitio web
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
