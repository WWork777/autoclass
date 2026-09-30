"use client";

import { useState } from "react";
import { useLeadForm } from "@/lib/useLeadForm";
import { track } from "@/lib/analytics";
import PhoneInput from "./PhoneInput";
import ConsentCheckbox from "./ConsentCheckbox";
import FormSuccess from "./FormSuccess";
import Reveal from "../Reveal";

export default function FinalCta() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [website, setWebsite] = useState("");

  const { status, errorMessage, submit } = useLeadForm("final_cta");

  const nameError = touched && name.trim().length < 2 ? "Укажите имя" : "";
  const consentError = touched && !consent ? "Нужно согласие на обработку данных" : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (name.trim().length < 2 || !consent || website) return;
    track("cta_click", { cta: "final_cta" });
    submit({ name, phone, website });
  };

  return (
    <section className="bg-asphalt-900 py-20 sm:py-28 border-t border-asphalt-700">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <Reveal>
          <h2 className="font-display uppercase text-4xl sm:text-6xl leading-[0.95] text-balance">
            Готовы получить права?
          </h2>
          <p className="mt-5 max-w-md text-fog-dim leading-relaxed">
            Оставьте номер — расскажем о программе обучения, стоимости и условиях записи.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="bg-asphalt-950 border border-asphalt-700 p-6 sm:p-8">
          {status === "success" ? (
            <FormSuccess />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
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

              <ConsentCheckbox checked={consent} onChange={setConsent} error={consentError} id="consent-final" />

              {status === "error" && <p className="text-accent-red text-sm">{errorMessage}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full font-display uppercase text-sm tracking-wider bg-line text-fog px-6 py-4 hover:bg-blue transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Отправляем…" : "Получить консультацию"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
