"use client";

import { useEffect, useState } from "react";
import { PROGRAMS } from "@/lib/data";
import { useLeadForm } from "@/lib/useLeadForm";
import { track } from "@/lib/analytics";
import PhoneInput from "./PhoneInput";
import ConsentCheckbox from "./ConsentCheckbox";
import FormSuccess from "./FormSuccess";

export default function ConsultationForm({ defaultCategory = "", title = "Получить консультацию", source = "consultation_form" }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [website, setWebsite] = useState("");

  const { status, errorMessage, submit } = useLeadForm(source);

  useEffect(() => {
    track("form_open", { source });
  }, [source]);

  if (status === "success") return <FormSuccess />;

  const nameError = touched && name.trim().length < 2 ? "Укажите имя" : "";
  const consentError = touched && !consent ? "Нужно согласие на обработку данных" : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (name.trim().length < 2 || !consent || website) return;
    track("form_step_complete", { source, step: "submit" });
    submit({ name, phone, category, comment, website });
  };

  return (
    <form onSubmit={handleSubmit} onFocus={() => track("form_start", { source })} noValidate className="space-y-4">
      <h3 className="font-display uppercase text-xl text-fog">{title}</h3>

      <input
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] w-px h-px opacity-0"
        aria-hidden="true"
      />

      <div>
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={!!nameError}
          required
          className={`w-full bg-transparent border ${nameError ? "border-accent-red" : "border-asphalt-700"} focus:border-fog px-4 py-3.5 text-fog placeholder:text-fog-dim outline-none transition-colors`}
        />
        {nameError && <p className="mt-1.5 text-accent-red text-xs">{nameError}</p>}
      </div>

      <PhoneInput value={phone} onChange={setPhone} />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full bg-asphalt-950 border border-asphalt-700 focus:border-fog px-4 py-3.5 text-fog outline-none transition-colors appearance-none"
      >
        <option value="">Категория обучения (необязательно)</option>
        {PROGRAMS.map((p) => (
          <option key={p.id} value={p.id}>{p.title}</option>
        ))}
      </select>

      <textarea
        placeholder="Комментарий (необязательно)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
        className="w-full bg-transparent border border-asphalt-700 focus:border-fog px-4 py-3.5 text-fog placeholder:text-fog-dim outline-none transition-colors resize-none"
      />

      <ConsentCheckbox checked={consent} onChange={setConsent} error={consentError} />

      {status === "error" && <p className="text-accent-red text-sm">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full font-display uppercase text-sm tracking-wider bg-line text-fog px-6 py-4 hover:bg-blue transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Отправляем…" : "Получить консультацию"}
      </button>
    </form>
  );
}
