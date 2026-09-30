export default function FormSuccess({
  title = "Заявка отправлена",
  text = "Свяжемся с вами в ближайшее время по указанному номеру.",
}) {
  return (
    <div role="status" className="py-6 text-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-line text-2xl">✓</span>
      <h3 className="mt-4 font-display uppercase text-xl text-fog">{title}</h3>
      <p className="mt-2 text-fog-dim text-sm max-w-xs mx-auto">{text}</p>
    </div>
  );
}
