"use client";

import { useRef, useState } from "react";
import { submitLead } from "@/lib/submitLead";
import { track } from "@/lib/analytics";

// Общая логика состояний для всех форм заявок: loading / error / success,
// блокировка повторной отправки, сохранение введённых значений при ошибке.
export function useLeadForm(source) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const submittingRef = useRef(false);

  const submit = async (fields) => {
    if (submittingRef.current) return; // защита от двойного клика/сабмита
    submittingRef.current = true;
    setStatus("loading");
    setErrorMessage("");

    try {
      await submitLead({ source, ...fields });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Не удалось отправить заявку");
      track("form_error", { source, message: err.message });
    } finally {
      submittingRef.current = false;
    }
  };

  const reset = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return { status, errorMessage, submit, reset };
}
