import Reveal from "./Reveal";

export default function PageHeader({ kicker, title, intro }) {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-14 sm:pb-20">
      <Reveal>
        <span className="font-mono text-blue text-sm tracking-[0.3em] uppercase">{kicker}</span>
        <h1 className="font-display uppercase text-4xl sm:text-6xl leading-[0.95] mt-4 max-w-3xl text-balance">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-fog-dim text-lg leading-relaxed">{intro}</p>}
      </Reveal>
    </div>
  );
}
