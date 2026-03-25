"use client";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { TK } from "./theme";

const ROLES = [
  "Director / C-Suite",
  "Gerente Senior",
  "Gerente",
  "Jefe / Líder de Área",
  "Consultor / Independiente",
  "Empresario / Dueño de PYME",
  "Otro",
];

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: TK.textSecondary,
          marginBottom: 5,
          fontFamily: TK.fontBadge,
        }}
      >
        {label}
        {required && <span style={{ color: TK.danger, marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          padding: "10px 13px",
          border: `1.5px solid ${TK.border}`,
          borderRadius: 10,
          fontSize: 13.5,
          background: TK.surface,
          color: TK.text,
          fontFamily: TK.font,
          outline: "none",
          transition: "border-color 0.15s",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = TK.blueLight)}
        onBlur={(e) => (e.currentTarget.style.borderColor = TK.border)}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: TK.textSecondary,
          marginBottom: 5,
          fontFamily: TK.fontBadge,
        }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 13px",
          border: `1.5px solid ${TK.border}`,
          borderRadius: 10,
          fontSize: 13.5,
          background: TK.surface,
          color: value ? TK.text : TK.textMuted,
          fontFamily: TK.font,
          outline: "none",
          cursor: "pointer",
        }}
      >
        <option value="">Selecciona tu rol</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function AuthModal() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("register");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    company: "",
  });

  function set(key: keyof typeof form) {
    return (v: string) => setForm((f) => ({ ...f, [key]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (mode === "register") {
      if (!form.name || !form.email || !form.password) {
        setError("Completa los campos obligatorios.");
        return;
      }
      const ok = register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        company: form.company,
      });
      if (!ok) setError("Este email ya está registrado. Inicia sesión.");
    } else {
      const ok = login(form.email, form.password);
      if (!ok) setError("Email o contraseña incorrectos.");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: TK.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: TK.font,
      }}
    >
      <div style={{ width: "100%", maxWidth: 460 }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "inline-block",
              background: TK.blue,
              borderRadius: 10,
              padding: "7px 16px",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 900,
                color: TK.yellow,
                fontFamily: TK.fontDisplay,
                letterSpacing: "-0.01em",
              }}
            >
              future founders
            </span>
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: TK.textMuted,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: TK.fontBadge,
            }}
          >
            Toolkit · Doble Agente
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            background: TK.surface,
            border: `1.5px solid ${TK.border}`,
            borderRadius: 24,
            padding: "36px 36px 32px",
            boxShadow: TK.shadowMd,
          }}
        >
          {/* Tab switch */}
          <div
            style={{
              display: "flex",
              background: TK.surface2,
              borderRadius: 12,
              padding: 4,
              marginBottom: 28,
              gap: 4,
            }}
          >
            {(["register", "login"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                style={{
                  flex: 1,
                  padding: "9px 0",
                  borderRadius: 9,
                  border: "none",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: TK.font,
                  transition: "all 0.15s",
                  background: mode === m ? TK.surface : "transparent",
                  color: mode === m ? TK.blue : TK.textMuted,
                  boxShadow: mode === m ? TK.shadowXs : "none",
                }}
              >
                {m === "register" ? "Crear cuenta" : "Iniciar sesión"}
              </button>
            ))}
          </div>

          <form onSubmit={submit}>
            {mode === "register" && (
              <Field label="Nombre completo" value={form.name} onChange={set("name")} placeholder="Tu nombre" required />
            )}
            <Field label="Email" type="email" value={form.email} onChange={set("email")} placeholder="tu@email.com" required />
            <Field label="Contraseña" type="password" value={form.password} onChange={set("password")} placeholder="Mínimo 6 caracteres" required />
            {mode === "register" && (
              <>
                <SelectField label="Cargo / Rol" value={form.role} onChange={set("role")} options={ROLES} />
                <Field label="Empresa" value={form.company} onChange={set("company")} placeholder="Nombre de tu empresa (opcional)" />
              </>
            )}

            {error && (
              <div
                style={{
                  background: TK.dangerDim,
                  border: `1px solid ${TK.danger}30`,
                  borderRadius: 9,
                  padding: "9px 13px",
                  fontSize: 12.5,
                  color: TK.danger,
                  marginBottom: 14,
                  fontFamily: TK.font,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px",
                background: TK.blue,
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: TK.font,
                letterSpacing: "0.02em",
                boxShadow: `0 4px 16px ${TK.blue}30`,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = TK.blueLight)}
              onMouseLeave={(e) => (e.currentTarget.style.background = TK.blue)}
            >
              {mode === "register" ? "ACCEDER AL TOOLKIT" : "INICIAR SESIÓN"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              fontSize: 11.5,
              color: TK.textMuted,
              marginTop: 18,
              lineHeight: 1.6,
              fontFamily: TK.font,
            }}
          >
            Acceso exclusivo para lectores del libro{" "}
            <strong style={{ color: TK.textSecondary }}>Doble Agente</strong>.
            <br />
            Tus datos se guardan localmente en tu dispositivo.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <a
            href="/"
            style={{
              fontSize: 12,
              color: TK.textMuted,
              textDecoration: "none",
              fontFamily: TK.font,
            }}
          >
            ← Volver a futurefounders.pe
          </a>
        </div>
      </div>
    </div>
  );
}
