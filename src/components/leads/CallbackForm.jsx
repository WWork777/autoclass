"use client";

import { useEffect, useState } from "react";
import { useLeadForm } from "@/lib/useLeadForm";
import { track } from "@/lib/analytics";
import PhoneInput from "./PhoneInput";
import ConsentCheckbox from "./ConsentCheckbox";
import FormSuccess from "./FormSuccess";

export default function CallbackForm({ source = "callback_form" }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [website, setWebsite] = useState("");

  const { status, errorMessage, submit } = useLeadForm(source);

  useEffect(() => {
    track("callback_open", { source });
  }, [source]);

  if (status === "success") {
    return <FormSuccess title="Перезвоним вам" text="Наш менеджер наберёт вас в ближайшее время." />;
  }

  const nameError = touched && name.trim().length < 2 ? "Укажите имя" : "";
  const consentError = touched && !consent ? "Нужно согласие на обработку данных" : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (name.trim().length < 2 || !consent || website) return;
    track("callback_submit", { source });
    submit({ name, phone, website });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <h3 className="font-display uppercase text-lg text-fog">Перезвоним вам</h3>

      <input
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] w-px h-px opacity-0"
        aria-hidden="true"
      />

      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={!!nameError}
        required
        className={`w-full bg-transparent border ${nameError ? "border-accent-red" : "border-asphalt-700"} focus:border-fog px-4 py-3 text-fog placeholder:text-fog-dim outline-none transition-colors`}
      />
      {nameError && <p className="-mt-2 text-accent-red text-xs">{nameError}</p>}

      <PhoneInput value={phone} onChange={setPhone} className="py-3" />

      <ConsentCheckbox checked={consent} onChange={setConsent} error={consentError} id="consent-callback" />

      {status === "error" && <p className="text-accent-red text-sm">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full font-display uppercase text-sm tracking-wider bg-line text-fog px-6 py-3.5 hover:bg-blue transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Отправляем…" : "Перезвоните мне"}
      </button>
    </form>
  );
}
