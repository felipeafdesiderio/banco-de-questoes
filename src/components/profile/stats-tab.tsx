import { BarChart3, CalendarDays, Target, TrendingUp } from 'lucide-react'

import { cardBase } from '../../lib/ui-styles'
import type { StudyStats } from '../../types/student-profile'

type StatsTabProps = {
  stats: StudyStats
}

function KpiCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string
  value: string
  icon: typeof Target
  accent?: string
}) {
  return (
    <div className={`p-5 ${cardBase} dark:border-slate-800 dark:bg-slate-900`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
          <p className={`mt-2 text-2xl font-bold ${accent ?? 'text-slate-50'}`}>{value}</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950/50 ring-1 ring-blue-800/40">
          <Icon className="h-5 w-5 text-blue-400" aria-hidden />
        </span>
      </div>
    </div>
  )
}

function formatDayLabel(isoDate: string) {
  const d = new Date(`${isoDate}T12:00:00`)
  return d.toLocaleDateString('pt-BR', { weekday: 'short' })
}

export function StatsTab({ stats }: StatsTabProps) {
  const maxDay = Math.max(...stats.last7Days.map((d) => d.count), 1)

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Questões respondidas hoje"
          value={`${stats.questionsToday} questões`}
          icon={Target}
        />
        <KpiCard
          label="Média diária de questões"
          value={`${stats.dailyAverage} questões/dia`}
          icon={TrendingUp}
        />
        <KpiCard
          label="Taxa geral de acertos"
          value={`${stats.correctRate}%`}
          icon={BarChart3}
          accent="text-emerald-500"
        />
        <KpiCard
          label="Taxa de erros"
          value={`${stats.errorRate}%`}
          icon={BarChart3}
          accent="text-rose-500"
        />
      </div>

      <div className={`p-6 ${cardBase} dark:border-slate-800 dark:bg-slate-900`}>
        <h3 className="text-sm font-semibold text-slate-200">Acertos vs erros</h3>
        <p className="mt-1 text-xs text-slate-500">Proporção geral do seu desempenho na plataforma</p>
        <div className="mt-5 h-4 overflow-hidden rounded-full bg-slate-800">
          <div className="flex h-full w-full">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${stats.correctRate}%` }}
              title={`Acertos ${stats.correctRate}%`}
            />
            <div
              className="h-full bg-rose-500 transition-all duration-500"
              style={{ width: `${stats.errorRate}%` }}
              title={`Erros ${stats.errorRate}%`}
            />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Acertos {stats.correctRate}%
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            Erros {stats.errorRate}%
          </span>
        </div>
      </div>

      <div className={`p-6 ${cardBase} dark:border-slate-800 dark:bg-slate-900`}>
        <div className="mb-5 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-blue-400" aria-hidden />
          <h3 className="text-sm font-semibold text-slate-200">Histórico — últimos 7 dias</h3>
        </div>
        <ul className="grid grid-cols-7 gap-2 sm:gap-3">
          {stats.last7Days.map((day) => (
            <li key={day.date} className="flex flex-col items-center gap-2">
              <div className="flex h-32 w-full items-end justify-center rounded-lg bg-slate-950/80 px-1 py-2 ring-1 ring-slate-800">
                <div
                  className="w-full max-w-[2rem] rounded-md bg-gradient-to-t from-blue-700 to-blue-500 transition-all duration-500"
                  style={{ height: `${Math.max(12, (day.count / maxDay) * 100)}%` }}
                  title={`${day.count} questões`}
                />
              </div>
              <span className="text-[10px] uppercase text-slate-500 sm:text-xs">
                {formatDayLabel(day.date)}
              </span>
              <span className="text-xs font-medium text-slate-300">{day.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
