import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useQuestionAttempts } from '../../hooks/use-question-attempts'
import { buildAttemptTooltipMessage } from '../../lib/attempt-tooltip-message'
import { btnPrimary, btnSecondary, cardBase } from '../../lib/ui-styles'
import type { Question, QuestionAttempt, QuestionOptionKey } from '../../types/questions'
import { QuestionResolutionPanel } from './question-resolution-panel'

type QuestionSessionProps = {
  questions: Question[]
  initialIndex?: number
  onIndexChange?: (index: number) => void
  onLastQuestionAnswered?: () => void
}

function AttemptHistoryBadge({
  tooltipId,
  tooltip,
  result,
}: {
  tooltipId: string
  tooltip: string
  result: 'correct' | 'wrong'
}) {
  const isCorrect = result === 'correct'

  return (
    <span className="group relative z-30 inline-flex">
      <button
        type="button"
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-slate-800/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        aria-describedby={tooltipId}
      >
        {isCorrect ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden />
        ) : (
          <XCircle className="h-5 w-5 text-rose-500" aria-hidden />
        )}
      </button>
      <span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[min(calc(100vw-2.5rem),17rem)] -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-center text-xs text-slate-200 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {tooltip}
      </span>
    </span>
  )
}

const difficultyBadgeClass: Record<Question['difficulty'], string> = {
  Fácil: 'border-emerald-800/50 bg-emerald-950/40 text-emerald-300',
  Médio: 'border-amber-800/50 bg-amber-950/40 text-amber-300',
  Difícil: 'border-rose-800/50 bg-rose-950/40 text-rose-300',
}

export function QuestionSession({
  questions,
  initialIndex = 0,
  onIndexChange,
  onLastQuestionAnswered,
}: QuestionSessionProps) {
  const { attempts, saveAttempt } = useQuestionAttempts()
  const [index, setIndex] = useState(initialIndex)
  const [selected, setSelected] = useState<QuestionOptionKey | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [showResolution, setShowResolution] = useState(false)
  /** Tentativa já salva ao entrar na questão (antes de confirmar de novo). */
  const [attemptBaseline, setAttemptBaseline] = useState<QuestionAttempt | undefined>()
  /** Resultado da tentativa confirmada nesta visita à questão. */
  const [sessionAttempt, setSessionAttempt] = useState<QuestionAttempt | undefined>()

  useEffect(() => {
    setIndex(Math.min(initialIndex, Math.max(questions.length - 1, 0)))
  }, [initialIndex, questions.length])

  const question = questions[index]
  const total = questions.length
  const storedAttempt = question ? attempts[question.id] : undefined

  useEffect(() => {
    if (!question) {
      setAttemptBaseline(undefined)
      setSessionAttempt(undefined)
      return
    }
    setAttemptBaseline(attempts[question.id])
    setSessionAttempt(undefined)
    setSelected(null)
    setConfirmed(false)
    setShowResolution(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- baseline só ao trocar de questão
  }, [question?.id])

  const badgeAttempt = confirmed && sessionAttempt ? sessionAttempt : storedAttempt
  const tooltipPrevious = confirmed ? attemptBaseline : undefined
  const badgeTooltip =
    badgeAttempt && question
      ? buildAttemptTooltipMessage(badgeAttempt, tooltipPrevious)
      : null

  if (!question) {
    return (
      <div className={`p-8 text-center ${cardBase} dark:border-slate-800 dark:bg-slate-900`}>
        <p className="text-slate-300">Nenhuma questão disponível com os filtros selecionados.</p>
      </div>
    )
  }

  function goTo(nextIndex: number) {
    const safe = Math.min(Math.max(nextIndex, 0), total - 1)
    setIndex(safe)
    onIndexChange?.(safe)
  }

  function handleConfirm() {
    if (!selected || confirmed) {
      return
    }
    const isCorrect = selected === question.correta
    const attempt: QuestionAttempt = {
      result: isCorrect ? 'correct' : 'wrong',
      answeredAt: new Date().toISOString(),
    }
    setSessionAttempt(attempt)
    saveAttempt(question.id, attempt.result)
    setConfirmed(true)
    if (index >= total - 1) {
      onLastQuestionAnswered?.()
    }
  }

  function optionClass(key: QuestionOptionKey) {
    const base =
      'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300'

    if (!confirmed) {
      return `${base} ${
        selected === key
          ? 'border-blue-600 bg-blue-950/40 text-slate-100'
          : 'border-slate-800 bg-slate-950/50 text-slate-200 hover:border-slate-700'
      }`
    }

    if (key === question.correta) {
      return `${base} border-emerald-500 bg-emerald-500/15 text-emerald-100`
    }
    if (selected === key && key !== question.correta) {
      return `${base} border-rose-500 bg-rose-500/15 text-rose-100`
    }
    return `${base} border-slate-800 bg-slate-950/30 text-slate-500 opacity-70`
  }

  return (
    <div className={`overflow-visible ${cardBase} dark:border-slate-800 dark:bg-slate-900`}>
      <div className="relative overflow-visible border-b border-slate-800 px-5 pb-4 pt-8 sm:px-6 sm:pt-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-slate-600 bg-slate-900 px-2.5 py-1 font-mono text-xs font-semibold text-slate-100">
            #{question.code}
          </span>
          <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-300">
            {question.banca}
          </span>
          <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-300">
            {question.ano}
          </span>
          <span
            className={`rounded-full border px-2.5 py-1 text-xs ${difficultyBadgeClass[question.difficulty]}`}
          >
            {question.difficulty}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-slate-400">
            Questão {index + 1} de {total}
          </p>
          {badgeAttempt && badgeTooltip ? (
            <AttemptHistoryBadge
              tooltipId={`attempt-tooltip-${question.id}`}
              tooltip={badgeTooltip}
              result={badgeAttempt.result}
            />
          ) : null}
        </div>
      </div>

      <div className="space-y-5 px-5 py-6 sm:px-6">
        <p className="text-base leading-relaxed text-slate-100">{question.enunciado}</p>

        {question.imageUrl ? (
          <figure className="mx-auto max-w-lg overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <img
              src={question.imageUrl}
              alt=""
              className="mx-auto max-h-64 w-full object-contain"
            />
          </figure>
        ) : null}

        <ul className="space-y-2">
          {question.alternativas.map((alt) => (
            <li key={alt.key}>
              <button
                type="button"
                disabled={confirmed}
                onClick={() => setSelected(alt.key)}
                className={optionClass(alt.key)}
              >
                <span className="font-semibold">{alt.key}.</span>
                <span>{alt.text}</span>
              </button>
            </li>
          ))}
        </ul>

        {!confirmed ? (
          <div className="flex w-full justify-end">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selected}
              className={`${btnPrimary} w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto`}
            >
              Confirmar Resposta
            </button>
          </div>
        ) : null}

        {showResolution ? <QuestionResolutionPanel resolution={question.resolution} /> : null}
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        {index > 0 ? (
          <button type="button" onClick={() => goTo(index - 1)} className={btnSecondary}>
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Questão Anterior
          </button>
        ) : (
          <span className="hidden sm:block" />
        )}

        {confirmed ? (
          <button
            type="button"
            onClick={() => setShowResolution((v) => !v)}
            className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            {showResolution ? 'Ocultar resolução' : 'Ver Resolução'}
          </button>
        ) : (
          <span className="text-sm text-slate-600">Responda para ver a resolução</span>
        )}

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index >= total - 1}
          className={`${btnPrimary} disabled:cursor-not-allowed disabled:opacity-50`}
        >
          Próxima Questão
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}
