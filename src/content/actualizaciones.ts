// Valores que cambian cada año, tal como los imprime el libro (valor 2026), y estado de los trámites en curso.
// La revisión anual cambia solo este archivo: llena `vigente` y `fuenteVigente` cuando la autoridad fije el valor del año.

export type Valor = {
  nombre: string;
  /** Valor 2026 tal como lo imprime el anexo. */
  v2026: string;
  donde: string;
  fuente: { label: string; href: string };
  vigente?: string;
};

export type Pais = { id: string; pais: string; anexo: string; valores: Valor[]; tramites: string[] };

export const REVISION = "30 de octubre de 2026";

export const ACTUALIZACIONES: Pais[] = [
  {
    id: "peru",
    pais: "Perú",
    anexo: "Anexo A y plantilla A.1",
    valores: [
      { nombre: "UIT", v2026: "S/ 5.500", donde: "Anexo A, secciones 3 y 4", fuente: { label: "SUNAT", href: "https://www.sunat.gob.pe" } },
      {
        nombre: "Monto del recibo por honorarios desde el que el cliente retiene el 8 %",
        v2026: "S/ 1.500",
        donde: "Capítulo 16, plantillas 16.1 y A.1",
        fuente: { label: "SUNAT, pagos a cuenta de cuarta categoría", href: "https://orientacion.sunat.gob.pe/node/283" },
      },
      {
        nombre: "Tope de ingresos de cuarta y quinta categoría para pedir la suspensión de retenciones",
        v2026: "S/ 48.125 (S/ 38.500 si eres director de empresa, síndico o mandatario)",
        donde: "Anexo A, sección 3",
        fuente: { label: "SUNAT, R. S. 000390-2025/SUNAT", href: "https://www.sunat.gob.pe/legislacion/superin/2025/000390-2025.pdf" },
      },
      { nombre: "Tope de la deducción del 20 % de cuarta categoría (24 UIT)", v2026: "S/ 132.000", donde: "Anexo A, sección 3", fuente: { label: "SUNAT", href: "https://www.sunat.gob.pe" } },
      { nombre: "Deducción de 7 UIT de las rentas de trabajo", v2026: "S/ 38.500", donde: "Anexo A, sección 3", fuente: { label: "SUNAT", href: "https://www.sunat.gob.pe" } },
      { nombre: "Renta neta desde la que se aplica el 30 % (45 UIT)", v2026: "S/ 247.500", donde: "Anexo A, sección 3", fuente: { label: "SUNAT", href: "https://www.sunat.gob.pe" } },
    ],
    tramites: [
      "Aportes a pensiones de los independientes: la Ley 32445 los volvió voluntarios. Así estaban al 30 de octubre de 2026; confirma su estado con tu contador o contadora.",
      "CTS: para el ahorro líquido de la K.1 cuenta solo la parte que hoy puedes retirar. Esa parte cambia cuando una ley autoriza retiros extraordinarios; confírmala con tu banco el mes en que calculas.",
    ],
  },
  {
    id: "mexico",
    pais: "México",
    anexo: "Anexo B y plantilla B.1",
    valores: [
      {
        nombre: "Salario mínimo general, al día",
        v2026: "MXN 315,04",
        donde: "Anexo B, prima de antigüedad",
        fuente: { label: "Diario Oficial de la Federación", href: "https://www.dof.gob.mx" },
      },
      {
        nombre: "Tope diario de la prima de antigüedad (doble del salario mínimo)",
        v2026: "MXN 630,08",
        donde: "Anexo B, prima de antigüedad",
        fuente: { label: "Diario Oficial de la Federación", href: "https://www.dof.gob.mx" },
      },
      {
        nombre: "UMA, al día",
        v2026: "MXN 117,31",
        donde: "Anexo B, exención del ISR por separación",
        fuente: { label: "INEGI, UMA 2026", href: "https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/uma/uma2026.pdf" },
      },
    ],
    tramites: [],
  },
  {
    id: "colombia",
    pais: "Colombia",
    anexo: "Anexo C y plantilla C.1",
    valores: [
      { nombre: "Salario mínimo mensual", v2026: "COP 1.750.905", donde: "Anexo C, secciones 1 y 4", fuente: { label: "Consejo de Estado", href: "https://www.consejodeestado.gov.co" } },
      { nombre: "Diez salarios mínimos (base del salario integral)", v2026: "COP 17.509.050", donde: "Anexo C, sección 1", fuente: { label: "Ministerio del Trabajo", href: "https://www.mintrabajo.gov.co" } },
      { nombre: "UVT", v2026: "COP 52.374", donde: "Anexo C, secciones 2 y 3", fuente: { label: "DIAN", href: "https://www.dian.gov.co" } },
      { nombre: "204 UVT (retención del 20 % de la indemnización)", v2026: "COP 10.684.296", donde: "Anexo C, sección 2", fuente: { label: "DIAN", href: "https://www.dian.gov.co" } },
      { nombre: "790 UVT (tope anual de la renta exenta del 25 %)", v2026: "COP 41.375.460", donde: "Anexo C, sección 2", fuente: { label: "DIAN", href: "https://www.dian.gov.co" } },
      { nombre: "3.500 UVT (responsable de IVA)", v2026: "COP 183.309.000", donde: "Anexo C, sección 3, y plantilla C.1", fuente: { label: "DIAN", href: "https://www.dian.gov.co" } },
      { nombre: "Tope de la base de cotización (25 salarios mínimos)", v2026: "COP 43.772.625", donde: "Anexo C, sección 4", fuente: { label: "UGPP", href: "https://www.ugpp.gov.co" } },
      { nombre: "Base desde la que se aporta al Fondo de Solidaridad Pensional (4 salarios mínimos)", v2026: "COP 7.003.620", donde: "Anexo C, sección 4", fuente: { label: "UGPP", href: "https://www.ugpp.gov.co" } },
    ],
    tramites: [
      "Salario mínimo: al 30 de octubre de 2026, el decreto del salario mínimo de ese año estaba en revisión en el Consejo de Estado. Usa el salario mínimo vigente del año en que calculas.",
      "Reforma pensional: la Ley 2381 de 2024 cambiaría las tarifas de los aportes. Al 30 de octubre de 2026 no estaba claro desde cuándo rige; confírmalo con tu contador o contadora antes de pagar tu PILA.",
    ],
  },
  {
    id: "chile",
    pais: "Chile",
    anexo: "Anexo D y plantilla D.1",
    valores: [
      {
        nombre: "Retención de la boleta de honorarios",
        v2026: "15,25 %",
        donde: "Capítulo 16, plantillas 16.1 y D.1",
        fuente: { label: "SII, boletas de honorarios", href: "https://www.sii.cl/destacados/boletas_honorarios/index.html" },
      },
      {
        nombre: "UF que usa el libro para sus cuentas",
        v2026: "CLP 39.500",
        donde: "Anexo D y plantilla D.1",
        fuente: { label: "SII, valores de la UF", href: "https://www.sii.cl" },
      },
      { nombre: "Tope de 90 UF para calcular la indemnización", v2026: "CLP 3.555.000", donde: "Anexo D, sección 2, y plantilla D.1", fuente: { label: "Dirección del Trabajo", href: "https://www.dt.gob.cl" } },
    ],
    tramites: [
      "Datos personales: la Ley 21.719 modifica de forma amplia la Ley 19.628 y crea la Agencia de Protección de Datos Personales. Al 30 de octubre de 2026 su entrada en vigencia estaba fijada para el 1 de diciembre de 2026 y había un proyecto para postergarla. Confirma en LeyChile la fecha vigente antes de preparar tu política de datos.",
    ],
  },
];
