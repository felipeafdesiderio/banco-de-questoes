import { BookOpen, CheckCircle2 } from 'lucide-react'

import type { EditalTopico } from '../../types/edital'

type TopicItemProps = {
  topico: EditalTopico
  studied?: boolean
  onOpenTheory: (topico: EditalTopico) => void
  onOpenPractice: (topico: EditalTopico) => void
}

export function TopicItem({
  topico,
  studied = false,
  onOpenTheory,
  onOpenPractice,
}: TopicItemProps) {
  return (
    <li className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-100">
            {topico.nome}
          </p>
          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{topico.totalQuestoes} questões disponíveis</span>
            {studied ? (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                Tópico iniciado
              </span>
            ) : null}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => onOpenTheory(topico)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors duration-300 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            Teoria Gratuita
          </button>
          <button
            type="button"
            onClick={() => onOpenPractice(topico)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-500"
          >
            Praticar Questões
            <span className="rounded-md bg-blue-500/80 px-1.5 py-0.5 text-xs font-semibold">
              {topico.totalQuestoes}
            </span>
          </button>
        </div>
      </div>
    </li>
  )
}
