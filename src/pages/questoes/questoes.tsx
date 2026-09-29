import { ArrowLeft } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import {
  QuestionFilterSidebar,
  QuestionFilterToggle,
} from '../../components/questions/question-filter-sidebar'
import { QuestionSession } from '../../components/questions/question-session'
import { TopicCompletionModal } from '../../components/questions/topic-completion-modal'
import { useQuestionAttempts } from '../../hooks/use-question-attempts'
import { useEditalProgress } from '../../hooks/use-edital-progress'
import { findTopicoById, getEditalByCargo } from '../../lib/edital-data'
import { getQuestionsForTopico } from '../../lib/mock-database'
import { applySessionFilters } from '../../lib/session-question-filters'
import { btnBack } from '../../lib/ui-styles'
import { DEFAULT_SESSION_FILTERS, type QuestionSessionFilters } from '../../types/questions'

export function Questoes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { attempts } = useQuestionAttempts()

  const topicoId = searchParams.get('topico') ?? ''
  const indexParam = Number.parseInt(searchParams.get('indice') ?? '0', 10)
  const initialIndex = Number.isFinite(indexParam) && indexParam >= 0 ? indexParam : 0

  const [filters, setFilters] = useState<QuestionSessionFilters>(DEFAULT_SESSION_FILTERS)
  const [filtersOpen, setFiltersOpen] = useState(true)
  const [completionOpen, setCompletionOpen] = useState(false)

  const match = topicoId ? findTopicoById(topicoId) : null
  const cargo = match?.cargo ?? 'soldado'
  const edital = useMemo(() => getEditalByCargo(cargo), [cargo])
  const { markTopicoStudied } = useEditalProgress(cargo, edital.disciplinas)

  const orgaoCargo =
    cargo === 'oficial' ? 'PMESP - Oficial (Barro Branco)' : 'PMESP - Soldado'

  const bank = useMemo(() => {
    if (!match) {
      return []
    }
    return getQuestionsForTopico(
      match.topico.id,
      match.topico.nome,
      match.topico.totalQuestoes,
      orgaoCargo,
    )
  }, [match, orgaoCargo])

  const filteredQuestions = useMemo(
    () => applySessionFilters(bank, attempts, filters),
    [bank, attempts, filters],
  )

  useEffect(() => {
    if (topicoId && match) {
      markTopicoStudied(topicoId)
    }
  }, [topicoId, match, markTopicoStudied])

  useEffect(() => {
    setFilters(DEFAULT_SESSION_FILTERS)
    setCompletionOpen(false)
  }, [topicoId])

  function handleIndexChange(nextIndex: number) {
    const params = new URLSearchParams(searchParams)
    params.set('indice', String(nextIndex))
    setSearchParams(params, { replace: true })
  }

  function handleRetryWrong() {
    setFilters({ status: 'wrong', difficulty: 'all' })
    handleIndexChange(0)
  }

  if (!match) {
    return (
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/estudar" className={btnBack}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Voltar ao edital
        </Link>
        <div className="mt-6 rounded-[1.125rem] border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm text-slate-400">
            Selecione um tópico no{' '}
            <Link to="/estudar" className="font-medium text-blue-400">
              Edital Mapeado
            </Link>
            .
          </p>
        </div>
      </div>
    )
  }

  const gridClass = filtersOpen
    ? 'mt-4 grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]'
    : 'mt-4 grid gap-6 lg:grid-cols-1'

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <Link to="/estudar" className={btnBack}>
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Voltar ao edital
      </Link>

      <QuestionFilterToggle open={filtersOpen} onOpenChange={setFiltersOpen} />

      <div className={gridClass}>
        <QuestionFilterSidebar
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
          filters={filters}
          onChange={(next) => {
            setFilters(next)
            handleIndexChange(0)
          }}
          resultCount={filteredQuestions.length}
        />

        <QuestionSession
          key={`${topicoId}-${JSON.stringify(filters)}`}
          questions={filteredQuestions}
          initialIndex={Math.min(initialIndex, Math.max(filteredQuestions.length - 1, 0))}
          onIndexChange={handleIndexChange}
          onLastQuestionAnswered={() => setCompletionOpen(true)}
        />
      </div>

      <TopicCompletionModal
        open={completionOpen}
        topicoNome={match.topico.nome}
        disciplinaNome={match.disciplina.nome}
        onClose={() => setCompletionOpen(false)}
        onRetryWrong={handleRetryWrong}
      />
    </div>
  )
}
