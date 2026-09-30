"use client";

export default function ConsentCheckbox({ checked, onChange, id = "consent", error }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-3 text-xs text-fog-dim leading-relaxed cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          aria-invalid={!!error}
          className="mt-0.5 h-4 w-4 shrink-0 accent-line"
        />
        <span>
          Согласен на{" "}
          <a href="/privacy/" target="_blank" className="text-blue hover:text-line transition-colors underline underline-offset-2">
            обработку персональных данных
          </a>{" "}
          и ознакомлен со{" "}
          <a href="/documents/" target="_blank" className="text-blue hover:text-line transition-colors underline underline-offset-2">
            сведениями об организации
          </a>
        </span>
      </label>
      {error && <p className="mt-1.5 text-accent-red text-xs">{error}</p>}
    </div>
  );
}
