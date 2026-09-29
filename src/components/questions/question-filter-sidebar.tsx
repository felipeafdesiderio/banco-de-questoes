import { Filter, PanelLeftClose, PanelLeftOpen } from 'lucide-react'

import { filterChoiceInputClass } from '../../lib/ui-styles'
import type {
  QuestionDifficultyFilter,
  QuestionSessionFilters,
  QuestionStatusFilter,
} from '../../types/questions'

type QuestionFilterSidebarProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: QuestionSessionFilters
  onChange: (filters: QuestionSessionFilters) => void
  resultCount: number
}

const statusOptions: { value: QuestionStatusFilter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'unanswered', label: 'Não respondidas' },
  { value: 'wrong', label: 'Apenas erradas' },
  { value: 'correct', label: 'Apenas acertadas' },
]

const difficultyOptions: { value: QuestionDifficultyFilter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'facil', label: 'Fácil' },
  { value: 'medio', label: 'Médio' },
  { value: 'dificil', label: 'Difícil' },
]

function FilterGroup<T extends string>({
  title,
  name,
  value,
  options,
  onSelect,
}: {
  title: string
  name: string
  value: T
  options: { value: T; label: string }[]
  onSelect: (value: T) => void
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </legend>
      <ul className="space-y-1.5">
        {options.map((option) => {
          const selected = value === option.value
          return (
            <li key={option.value}>
              <label
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-2.5 py-2 text-sm transition-colors duration-200 ${
                  selected
                    ? 'border-blue-500/40 bg-blue-950/25 text-slate-100'
                    : 'border-transparent text-slate-300 hover:border-slate-700/80 hover:bg-slate-950/40'
                }`}
              >
                <input
                  type="radio"
                  name={name}
                  checked={selected}
                  onChange={() => onSelect(option.value)}
                  className={filterChoiceInputClass}
                />
                {option.label}
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

export function QuestionFilterSidebar({
  open,
  onOpenChange,
  filters,
  onChange,
  resultCount,
}: QuestionFilterSidebarProps) {
  const panel = (
    <aside className="rounded-[1.125rem] border border-slate-800 bg-slate-900 p-4">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Filter className="h-4 w-4 text-blue-400" aria-hidden />
          Filtros rápidos
        </div>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
          aria-label="Recolher filtros"
        >
          <PanelLeftClose className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="space-y-5">
        <FilterGroup
          title="Status da questão"
          name="filter-status"
          value={filters.status}
          options={statusOptions}
          onSelect={(status) => onChange({ ...filters, status })}
        />
        <FilterGroup
          title="Dificuldade"
          name="filter-difficulty"
          value={filters.difficulty}
          options={difficultyOptions}
          onSelect={(difficulty) => onChange({ ...filters, difficulty })}
        />
      </div>

      <p className="mt-4 text-xs text-slate-500">{resultCount} questão(ões) na sessão</p>
    </aside>
  )

  if (!open) {
    return null
  }

  return <div className="lg:sticky lg:top-24 lg:self-start">{panel}</div>
}

export function QuestionFilterToggle({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <button
      type="button"
      className="mb-3 inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-blue-700/50 hover:text-slate-100"
      onClick={() => onOpenChange(!open)}
    >
      {open ? (
        <PanelLeftClose className="h-4 w-4" aria-hidden />
      ) : (
        <PanelLeftOpen className="h-4 w-4" aria-hidden />
      )}
      {open ? 'Recolher filtros' : 'Abrir filtros'}
    </button>
  )
}
