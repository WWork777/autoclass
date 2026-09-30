"use client";

import { useEffect, useState } from "react";
import { PROGRAMS } from "@/lib/data";
import { useLeadForm } from "@/lib/useLeadForm";
import { track } from "@/lib/analytics";
import PhoneInput from "./PhoneInput";
import ConsentCheckbox from "./ConsentCheckbox";
import FormSuccess from "./FormSuccess";

const source = "price_lead_form";

export default function PriceLeadForm() {
  const [category, setCategory] = useState("");
  const [transmission, setTransmission] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [website, setWebsite] = useState("");

  const { status, errorMessage, submit } = useLeadForm(source);

  useEffect(() => {
    track("price_calculator_open", { source });
  }, []);

  const program = PROGRAMS.find((p) => p.id === category);
  const needsTransmission = category === "b";
  const priceRevealed = program && (!needsTransmission || transmission);

  if (status === "success") {
    return <FormSuccess title="Заявка отправлена" text="Расскажем об условиях оплаты и ближайшем наборе." />;
  }

  const nameError = touched && name.trim().length < 2 ? "Укажите имя" : "";
  const consentError = touched && !consent ? "Нужно согласие на обработку данных" : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (name.trim().length < 2 || !consent || website) return;
    submit({ name, phone, category, transmission, website });
  };

  return (
    <div className="space-y-6">
      <h3 className="font-display uppercase text-xl text-fog">Узнать стоимость обучения</h3>

      <div>
        <span className="block text-fog-dim text-xs uppercase tracking-wide mb-2">Категория</span>
        <div className="grid grid-cols-2 gap-2">
          {PROGRAMS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setCategory(p.id);
                setTransmission("");
                track("category_select", { source, category: p.id });
              }}
              aria-pressed={category === p.id}
              className={`font-mono text-sm px-3 py-2.5 border transition-colors text-left ${
                category === p.id ? "border-line text-line" : "border-asphalt-700 text-fog-dim hover:text-fog"
              }`}
            >
              {p.code}
            </button>
          ))}
        </div>
      </div>

      {needsTransmission && (
        <div>
          <span className="block text-fog-dim text-xs uppercase tracking-wide mb-2">Коробка передач</span>
          <div className="flex gap-2">
            {["МКПП", "АКПП", "Пока не знаю"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setTransmission(g)}
                aria-pressed={transmission === g}
                className={`font-mono text-xs uppercase px-3 py-2 border transition-colors ${
                  transmission === g ? "border-line text-line" : "border-asphalt-700 text-fog-dim hover:text-fog"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      {priceRevealed && (
        <div className="border-t border-asphalt-700 pt-6">
          <div className="font-mono text-4xl text-accent-red">{program.price}</div>
          <p className="mt-1 text-fog-dim text-sm">{program.title} · теория {program.theory} · вождение {program.driving}</p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            <p className="text-fog text-sm">Хотите узнать условия оплаты и ближайший набор?</p>

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
              className={`w-full bg-transparent border ${nameError ? "border-accent-red" : "border-asphalt-700"} focus:border-fog px-4 py-3.5 text-fog placeholder:text-fog-dim outline-none transition-colors`}
            />
            {nameError && <p className="text-accent-red text-xs">{nameError}</p>}

            <PhoneInput value={phone} onChange={setPhone} />

            <ConsentCheckbox checked={consent} onChange={setConsent} error={consentError} id="consent-price" />

            {status === "error" && <p className="text-accent-red text-sm">{errorMessage}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              onClick={() => track("price_calculator_complete", { source, category, transmission })}
              className="w-full font-display uppercase text-sm tracking-wider bg-line text-fog px-6 py-4 hover:bg-blue transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Отправляем…" : "Узнать условия"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
