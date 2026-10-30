"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { FORM_TEXT, LIMITS, OPTIONS, parseProfile, type FieldError, type OptionKey } from "@/lib/fractional";
import { CALENDAR_URL, ROUTES, type Lang } from "@/lib/site";

type Errors = Partial<Record<string, string>>;

// Atribución básica: de dónde llegó la persona (UTM o referente), solo para este envío.
function attribution() {
  try {
    const u = new URL(window.location.href);
    const utm = Object.fromEntries([...u.searchParams].filter(([k]) => k.startsWith("utm_")));
    return { ...utm, referrer: document.referrer || null, path: u.pathname };
  } catch {
    return null;
  }
}

export function FractionalForm({ lang }: { lang: Lang }) {
  const T = FORM_TEXT[lang];
  const started = useRef(Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error" | "rate">("idle");
  const [role, setRole] = useState("");

  const opts = (k: OptionKey) => OPTIONS[k].map((x) => ({ id: x.id, label: x[lang] }));

  function message(e: FieldError) {
    if (e.code === "max") return T.maxIndustries;
    if (e.code === "invalid") return e.field === "linkedin" ? T.invalidLinkedin : T.invalidEmail;
    return T.required;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const payload = {
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      linkedin: fd.get("linkedin"),
      country: fd.get("country"),
      city: fd.get("city"),
      role: fd.get("role"),
      roleOther: fd.get("roleOther") ?? "",
      experience: fd.get("experience"),
      industries: fd.getAll("industries"),
      situation: fd.get("situation"),
      availability: fd.get("availability"),
      start: fd.get("start"),
      modality: fd.getAll("modality"),
      languages: fd.getAll("languages"),
      fee: fd.get("fee"),
      summary: fd.get("summary"),
      consent: fd.get("consent") === "on",
      newsletter: fd.get("newsletter") === "on",
      website: fd.get("website"),
      elapsed_ms: Date.now() - started.current,
      lang,
      attribution: attribution(),
    };
    // Misma validación que el servidor, antes de enviar.
    const local = parseProfile(payload as Record<string, unknown>).errors;
    if (local.length) {
      const errs: Errors = {};
      for (const e of local) errs[e.field] ??= message(e);
      setErrors(errs);
      document.getElementById(`f-${local[0].field}`)?.focus();
      return;
    }
    setState("sending");
    setErrors({});
    try {
      const res = await fetch("/api/fractional", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState("done");
        track("fractional_signup", { lang });
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (res.status === 422 && Array.isArray(data.fields)) {
        const errs: Errors = {};
        for (const e of data.fields as FieldError[]) errs[e.field] ??= message(e);
        setErrors(errs);
        setState("idle");
        document.getElementById(`f-${(data.fields as FieldError[])[0].field}`)?.focus();
        return;
      }
      setState(res.status === 429 ? "rate" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="card" role="status" style={{ padding: 40, gap: 20 }}>
        <h2 className="display-l">{T.successTitle}</h2>
        <p className="lead">{T.successText}</p>
        <div className="btns">
          <a href={CALENDAR_URL} target="_blank" rel="noopener" className="btn btn-primary" onClick={() => track("cta_calendar", { where: "fractional_success" })}>{T.successCta} →</a>
        </div>
      </div>
    );
  }

  const err = (f: string) => errors[f];
  const aria = (f: string) => ({ "aria-invalid": err(f) ? true : undefined, "aria-describedby": err(f) ? `e-${f}` : undefined });
  const errEl = (f: string) => (err(f) ? <span className="err" id={`e-${f}`}>{err(f)}</span> : null);

  const text = ({ f, label, type = "text", full, auto, hint, required = true }: { f: string; label: string; type?: string; full?: boolean; auto?: string; hint?: string; required?: boolean }) => (
    <div className={`field${full ? " full" : ""}`}>
      <label htmlFor={`f-${f}`}>{label}</label>
      <input id={`f-${f}`} name={f} type={type} autoComplete={auto} required={required} placeholder={hint} maxLength={f === "linkedin" ? LIMITS.url : LIMITS.name * 2} {...aria(f)} />
      {errEl(f)}
    </div>
  );

  const select = ({ f, k, label, required = true, onChange }: { f: string; k: OptionKey; label: string; required?: boolean; onChange?: (v: string) => void }) => (
    <div className="field">
      <label htmlFor={`f-${f}`}>{label}</label>
      <select id={`f-${f}`} name={f} required={required} defaultValue="" onChange={onChange ? (e) => onChange(e.target.value) : undefined} {...aria(f)}>
        <option value="" disabled={required}>{T.select}</option>
        {opts(k).map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
      </select>
      {errEl(f)}
    </div>
  );

  const checks = ({ f, k, label }: { f: string; k: OptionKey; label: string }) => (
    <div className="field full" role="group" aria-labelledby={`l-${f}`}>
      <span className="flabel" id={`l-${f}`}>{label}</span>
      <div className="checks">
        {opts(k).map((x, i) => (
          <label key={x.id} className="check">
            <input type="checkbox" name={f} value={x.id} id={i === 0 ? `f-${f}` : undefined} {...(i === 0 ? aria(f) : {})} />
            {x.label}
          </label>
        ))}
      </div>
      {errEl(f)}
    </div>
  );

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="hp" aria-hidden="true">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <fieldset className="fieldset">
        <legend className="label kicker">01 · {T.sections[0]}</legend>
        {text({ f: "firstName", label: T.firstName, auto: "given-name" })}
        {text({ f: "lastName", label: T.lastName, auto: "family-name" })}
        {text({ f: "email", label: T.email, type: "email", auto: "email" })}
        {text({ f: "phone", label: T.phone, type: "tel", auto: "tel", required: false })}
        {text({ f: "linkedin", label: T.linkedin, type: "url", hint: T.linkedinHint, full: true })}
        {select({ f: "country", k: "country", label: T.country })}
        {text({ f: "city", label: T.city, auto: "address-level2", required: false })}
      </fieldset>

      <fieldset className="fieldset">
        <legend className="label kicker">02 · {T.sections[1]}</legend>
        {select({ f: "role", k: "role", label: T.role, onChange: setRole })}
        {select({ f: "experience", k: "experience", label: T.experience })}
        {role === "other" && text({ f: "roleOther", label: T.roleOther })}
        {select({ f: "situation", k: "situation", label: T.situation })}
        {checks({ f: "industries", k: "industries", label: T.industries })}
      </fieldset>

      <fieldset className="fieldset">
        <legend className="label kicker">03 · {T.sections[2]}</legend>
        {select({ f: "availability", k: "availability", label: T.availability })}
        {select({ f: "start", k: "start", label: T.start })}
        {checks({ f: "modality", k: "modality", label: T.modality })}
        {checks({ f: "languages", k: "languages", label: T.languages })}
        {select({ f: "fee", k: "fee", label: T.fee, required: false })}
      </fieldset>

      <fieldset className="fieldset">
        <legend className="label kicker">04 · {T.sections[3]}</legend>
        <div className="field full">
          <label htmlFor="f-summary">{T.summary}</label>
          <span className="hint" id="h-summary">{T.summaryHint}</span>
          <textarea id="f-summary" name="summary" required maxLength={LIMITS.summary} {...aria("summary")} />
          {errEl("summary")}
        </div>
        <div className="field full">
          <label className="consent">
            <input type="checkbox" name="consent" id="f-consent" required {...aria("consent")} />
            <span>
              {T.consent} <Link href={ROUTES.privacy[lang]} target="_blank" style={{ color: "var(--magenta-text)" }}>{T.privacyLink}</Link>.
            </span>
          </label>
          {errEl("consent")}
          <label className="consent">
            <input type="checkbox" name="newsletter" />
            <span>{T.newsletter}</span>
          </label>
        </div>
      </fieldset>

      {(state === "error" || state === "rate") && (
        <p role="alert" className="body" style={{ margin: 0, color: "var(--magenta-text)", fontWeight: 600 }}>
          {state === "rate" ? T.errorRate : T.errorGeneric}
        </p>
      )}
      <div className="btns">
        <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
          {state === "sending" ? T.sending : `${T.submit} →`}
        </button>
      </div>
    </form>
  );
}
