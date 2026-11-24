/**
 * Trampa para bots: campo «website» fuera de la pantalla, sin foco con el teclado y oculto para
 * lectores de pantalla. Si llega lleno, /api/registro no guarda nada.
 */
import type { Locale } from "@/i18n/rutas";

/** El rótulo no se ve ni se lee (aria-hidden, fuera de la pantalla); va en el idioma de la página para que /en no tenga español. */
export default function Trampa({ locale = "es" }: { locale?: Locale }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        {locale === "en" ? "Website" : "Sitio web"}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
