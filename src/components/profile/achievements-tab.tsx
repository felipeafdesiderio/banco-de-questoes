import { Award, Plus, Trash2, Trophy } from 'lucide-react'
import { useState } from 'react'

import { btnPrimary, cardBase } from '../../lib/ui-styles'
import { buildPlatformBadges } from '../../lib/platform-badges'
import type { CustomApproval, StudyStats } from '../../types/student-profile'

type AchievementsTabProps = {
  stats: StudyStats
  customApprovals: CustomApproval[]
  onAddApproval: (title: string) => void
  onRemoveApproval: (id: string) => void
}

export function AchievementsTab({
  stats,
  customApprovals,
  onAddApproval,
  onRemoveApproval,
}: AchievementsTabProps) {
  const [draft, setDraft] = useState('')
  const badges = buildPlatformBadges(stats)

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    onAddApproval(draft)
    setDraft('')
  }

  return (
    <div className="space-y-8">
      <section className={`p-6 ${cardBase} dark:border-slate-800 dark:bg-slate-900`}>
        <div className="mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-blue-400" aria-hidden />
          <h3 className="text-base font-semibold text-slate-100">Concursos & simulados</h3>
        </div>

        <ul className="space-y-3">
          {customApprovals.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3"
            >
              <p className="text-sm text-slate-200">{item.title}</p>
              <button
                type="button"
                onClick={() => onRemoveApproval(item.id)}
                className="shrink-0 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-rose-400"
                aria-label="Remover registro"
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>
            </li>
          ))}
          {customApprovals.length === 0 ? (
            <li className="text-sm text-slate-500">Nenhum registro ainda. Adicione sua primeira conquista.</li>
          ) : null}
        </ul>

        <form onSubmit={handleAdd} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder='Ex: "Aprovado no Psicológico"'
            className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
          />
          <button type="submit" className={`${btnPrimary} shrink-0`}>
            <Plus className="h-4 w-4" aria-hidden />
            Adicionar Conquista / Registro
          </button>
        </form>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-blue-400" aria-hidden />
          <h3 className="text-base font-semibold text-slate-100">Mural de badges</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {badges.map((badge) => (
            <article
              key={badge.id}
              className={`p-5 ${cardBase} transition-opacity duration-300 dark:border-slate-800 dark:bg-slate-900 ${
                badge.unlocked ? 'opacity-100' : 'opacity-50 grayscale'
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">
                {badge.unlocked ? 'Desbloqueado' : 'Em progresso'}
              </p>
              <h4 className="mt-2 font-semibold text-slate-100">{badge.title}</h4>
              <p className="mt-1 text-sm text-slate-400">{badge.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
