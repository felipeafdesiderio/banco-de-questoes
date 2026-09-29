import { ArrowRight } from 'lucide-react'

type CareerSelectionCardProps = {
  imageSrc: string
  imageAlt: string
  badge: string
  title: string
  summary: string
  cta: string
  onSelect: () => void
}

export function CareerSelectionCard({
  imageSrc,
  imageAlt,
  badge,
  title,
  summary,
  cta,
  onSelect,
}: CareerSelectionCardProps) {
  return (
    <article className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl border border-slate-800/80 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col gap-3">
        <span className="w-max rounded-full border border-blue-500/30 bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 backdrop-blur-md">
          {badge}
        </span>

        <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>

        <p className="line-clamp-2 text-sm leading-relaxed text-slate-300">{summary}</p>

        <button
          type="button"
          onClick={onSelect}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/30 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/30"
        >
          {cta}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </button>
      </div>
    </article>
  )
}
