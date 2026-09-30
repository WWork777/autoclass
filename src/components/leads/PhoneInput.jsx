"use client";

import { formatPhoneInput } from "@/lib/phone";

export default function PhoneInput({ value, onChange, id = "phone", error, className = "" }) {
  const handleChange = (e) => {
    const next = formatPhoneInput(e.target.value);
    onChange(next);
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text");
    if (pasted) {
      e.preventDefault();
      onChange(formatPhoneInput(pasted));
    }
  };

  return (
    <div>
      <input
        id={id}
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+7 (___) ___-__-__"
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        required
        className={`w-full bg-transparent border ${error ? "border-accent-red" : "border-asphalt-700"} focus:border-fog px-4 py-3.5 font-mono text-fog placeholder:text-fog-dim outline-none transition-colors ${className}`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-accent-red text-xs">{error}</p>
      )}
    </div>
  );
}
