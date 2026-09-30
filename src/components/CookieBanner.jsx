"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cookie_consent")) setVisible(true);
    } catch (e) {}
  }, []);

  const accept = () => {
    try {
      localStorage.setItem("cookie_consent", "accepted");
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-asphalt-900 border-t border-asphalt-700 px-5 py-4 sm:px-8">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-xs sm:text-sm text-fog-dim leading-relaxed">
          Мы используем cookie для работы сайта и анализа посещаемости. Продолжая пользоваться сайтом, вы
          соглашаетесь с{" "}
          <a href="/cookies/" className="text-blue hover:text-line underline underline-offset-2">
            политикой использования cookie
          </a>.
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-md bg-line px-5 py-2 text-xs sm:text-sm font-medium text-asphalt-950 hover:opacity-90 transition-opacity"
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
