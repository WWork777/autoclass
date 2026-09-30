"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PROGRAMS, getProgram } from "@/lib/data";
import { useLeadForm } from "@/lib/useLeadForm";
import { track } from "@/lib/analytics";
import PhoneInput from "./PhoneInput";
import ConsentCheckbox from "./ConsentCheckbox";

const TOTAL_STEPS = 5;

const EXPERIENCE_OPTIONS = [
  "Начинаю с нуля",
  "Немного ездил",
  "Уже есть права / хочу восстановить навыки",
];

const START_OPTIONS = [
  "Как можно скорее",
  "В течение месяца",
  "В ближайшие 2–3 месяца",
  "Пока просто узнаю",
];

export default function SmartQuiz({ onClose }) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [transmission, setTransmission] = useState("");
  const [experience, setExperience] = useState("");
  const [desiredStart, setDesiredStart] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [website, setWebsite] = useState("");

  const { status, errorMessage, submit } = useLeadForm("smart_quiz");

  useEffect(() => {
    track("quiz_open");
    track("quiz_start");
  }, []);

  const needsTransmissionStep = category === "b";
  // Реальный видимый порядок шагов зависит от категории (шаг про коробку — только для B)
  const visibleSteps = needsTransmissionStep ? [1, 2, 3, 4, 5] : [1, 3, 4, 5];
  const stepIndex = visibleSteps.indexOf(step) + 1;

  const goNext = (nextStep) => {
    track("form_step_complete", { source: "smart_quiz", step });
    setStep(nextStep);
  };

  const handleCategory = (id) => {
    setCategory(id);
    track("category_select", { source: "smart_quiz", category: id });
    goNext(id === "b" ? 2 : 3);
  };

  const nameError = touched && name.trim().length < 2 ? "Укажите имя" : "";
  const consentError = touched && !consent ? "Нужно согласие на обработку данных" : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (name.trim().length < 2 || !consent || website) return;
    track("quiz_complete", { category, transmission, experience, desiredStart });
    submit({ name, phone, category, transmission, experience, desiredStart, website });
  };

  if (status === "success") {
    const program = getProgram(category);
    return (
      <div className="py-2">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-line text-2xl">✓</span>
        <h3 className="mt-4 font-display uppercase text-2xl text-fog">Ваша программа подобрана</h3>

        {program && (
          <div className="mt-6 border border-asphalt-700 p-6">
            <div className="flex items-baseline justify-between">
              <span className="font-display uppercase text-lg">{program.title}</span>
              <span className="font-mono text-2xl text-accent-red">{program.price}</span>
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-asphalt-700 pt-4">
              <div>
                <dt className="text-fog-dim text-xs uppercase">Теория</dt>
                <dd className="font-mono text-sm mt-1">{program.theory}</dd>
              </div>
              <div>
                <dt className="text-fog-dim text-xs uppercase">Вождение</dt>
                <dd className="font-mono text-sm mt-1">{program.driving}</dd>
              </div>
              <div>
                <dt className="text-fog-dim text-xs uppercase">Срок</dt>
                <dd className="font-mono text-sm mt-1">{program.duration}</dd>
              </div>
            </dl>
          </div>
        )}

        <p className="mt-6 text-fog-dim text-sm">
          Заявка передана менеджеру автошколы «Автокласс» — свяжемся с вами по указанному номеру,
          расскажем об условиях оплаты и ближайших группах.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-8">
        {visibleSteps.map((s, i) => (
          <span
            key={s}
            className={`h-1 flex-1 transition-colors ${i < stepIndex ? "bg-line" : "bg-asphalt-700"}`}
          />
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
          {step === 1 && (
            <fieldset>
              <legend className="font-display uppercase text-xl text-fog mb-6">Какая категория нужна?</legend>
              <div className="grid grid-cols-2 gap-3">
                {PROGRAMS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleCategory(p.id)}
                    className="text-left border border-asphalt-700 hover:border-line px-4 py-4 transition-colors"
                  >
                    <span className="font-mono text-xs text-fog-dim block">{p.code}</span>
                    <span className="font-display uppercase text-base mt-1 block">{p.title}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="font-display uppercase text-xl text-fog mb-6">Механика или автомат?</legend>
              <div className="flex flex-col gap-3">
                {["МКПП", "АКПП", "Пока не знаю"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => { setTransmission(g); goNext(3); }}
                    className="text-left border border-asphalt-700 hover:border-line px-4 py-3.5 font-display uppercase transition-colors"
                  >
                    {g}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset>
              <legend className="font-display uppercase text-xl text-fog mb-6">Ваш опыт вождения?</legend>
              <div className="flex flex-col gap-3">
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setExperience(opt); goNext(4); }}
                    className="text-left border border-asphalt-700 hover:border-line px-4 py-3.5 transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {step === 4 && (
            <fieldset>
              <legend className="font-display uppercase text-xl text-fog mb-6">Когда хотите начать?</legend>
              <div className="flex flex-col gap-3">
                {START_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setDesiredStart(opt); goNext(5); }}
                    className="text-left border border-asphalt-700 hover:border-line px-4 py-3.5 transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {step === 5 && (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="font-display uppercase text-xl text-fog mb-6">Куда прислать подбор?</h3>

              <input
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="absolute -left-[9999px] w-px h-px opacity-0"
                aria-hidden="true"
              />

              <div className="space-y-4">
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

                <ConsentCheckbox checked={consent} onChange={setConsent} error={consentError} id="consent-quiz" />

                {status === "error" && <p className="text-accent-red text-sm">{errorMessage}</p>}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full font-display uppercase text-sm tracking-wider bg-line text-fog px-6 py-4 hover:bg-blue transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Подбираем…" : "Показать результат"}
                </button>
              </div>
            </form>
          )}
      </motion.div>
    </div>
  );
}
