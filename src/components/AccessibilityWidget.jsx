"use client";

import { useEffect, useState } from "react";

const FS_CLASSES = ["a11y-fs-1", "a11y-fs-2", "a11y-fs-3"];
const STORAGE_KEY = "a11y_settings";

const defaultSettings = {
  fontStep: 0,
  contrast: false,
  grayscale: false,
  underline: false,
};

function applySettings(settings) {
  const html = document.documentElement;
  FS_CLASSES.forEach((c) => html.classList.remove(c));
  if (settings.fontStep === 1) html.classList.add("a11y-fs-2");
  if (settings.fontStep === 2) html.classList.add("a11y-fs-3");
  html.classList.toggle("a11y-contrast", !!settings.contrast);
  html.classList.toggle("a11y-grayscale", !!settings.grayscale);
  html.classList.toggle("a11y-underline", !!settings.underline);
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        applySettings(parsed);
      }
    } catch (e) {}
  }, []);

  const update = (patch) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    applySettings(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {}
  };

  const reset = () => update(defaultSettings);

  return (
    <div className="fixed left-4 bottom-24 sm:bottom-6 z-50">
      {open && (
        <div className="mb-3 w-72 rounded-lg border border-asphalt-700 bg-asphalt-900 p-4 shadow-2xl shadow-black/50 text-sm text-fog">
          <p className="font-display uppercase tracking-wide text-xs text-fog-dim mb-3">
            Версия для слабовидящих
          </p>

          <div className="mb-3">
            <p className="text-xs text-fog-dim mb-1.5">Размер шрифта</p>
            <div className="flex gap-2">
              {["A", "A+", "A++"].map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => update({ fontStep: i })}
                  aria-pressed={settings.fontStep === i}
                  className={`flex-1 rounded border px-2 py-1.5 font-mono transition-colors ${
                    settings.fontStep === i
                      ? "border-line bg-line text-fog"
                      : "border-asphalt-700 text-fog-dim hover:border-line hover:text-line"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Высокий контраст</span>
              <input
                type="checkbox"
                checked={settings.contrast}
                onChange={(e) => update({ contrast: e.target.checked })}
                className="h-4 w-4 accent-line"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Чёрно-белые цвета</span>
              <input
                type="checkbox"
                checked={settings.grayscale}
                onChange={(e) => update({ grayscale: e.target.checked })}
                className="h-4 w-4 accent-line"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Подчёркивать ссылки</span>
              <input
                type="checkbox"
                checked={settings.underline}
                onChange={(e) => update({ underline: e.target.checked })}
                className="h-4 w-4 accent-line"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={reset}
            className="mt-3 w-full rounded border border-asphalt-700 px-2 py-1.5 text-xs text-fog-dim hover:border-line hover:text-line transition-colors"
          >
            Сбросить настройки
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Версия для слабовидящих"
        title="Версия для слабовидящих"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-line text-fog shadow-xl shadow-black/40 hover:bg-blue transition-colors font-display text-lg"
      >
        Аа
      </button>
    </div>
  );
}
